/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect(CONNECTION_STRING);

/*
var schema = new Schema({
  issue_title : String,
  issue_text : String,
  created_by : String,
  assigned_to : String,
  status_text : String,
  created_on : Number,
  updated_on : Number,
  open : Boolean
});
*/

//var Issue = mongoose.model('Issue', schema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project; // /api/issues/<project>
      let query = req.query // /api/issues/apitest?<query>
      
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        // works
        //dbo.collection(project).find({created_by: 'zac'}).toArray(function(err,result){res.json(result)});
        // shows all
        dbo.collection(project).find().toArray(function(err,result){res.json(result)});

      });
      
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      let query = req.query;
      console.log(project);
      //console.log(req.body);
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        // works
        // returned json is weird, but info correctly saved in db
        if (!dbo.collection(project)) dbo.createCollection(project);
        let collection = dbo.collection(project);
        let issue = {
          title: req.body.issue_title,
          text: req.body.issue_text,
          created_by: req.body.created_by,
          assignedTo: req.body.assigned_to,
          statusText: req.body.status_text,
          createdOn: 1,
          updatedOn: 1,
          open: true
        }
        collection.insertOne(issue, function(err, doc) {
          //res.json(doc);
        })
      });
    })
    
    .put(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
      // issue_title issue_text created_by assigned_to status_text open
      let open = req.body.open; // if checked, will return false, if not checked will be undefined
    
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        //works
        //dbo.collection(project).findOne({title: "test99"}, function(err, result){res.json(result)});
        
        // WORKS ObjectId(id)!!!!!
        dbo.collection(project).findOneAndUpdate(
            //{ title: "test99" },
            {_id: ObjectId(id)},
            { $set: {created_by: 'last'} }
            //upsert: true
        );
        
        
      });
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
    
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        dbo.collection(project).deleteOne({_id: ObjectId(id)});
        
      });
    
    });
    
};
