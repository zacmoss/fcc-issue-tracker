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
      
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
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
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        // works
        // returned json is weird, but info correctly saved in db
        if (!db.collection(project)) dbo.createCollection(project);
        let collection = db.collection(project);
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
      
      /*
      let id;
      let title = req.body.issue_title;
      let text = req.body.issue_text;
      let by = req.body.created_by;
      let assignedTo = req.body.assigned_to;
      let statusText = req.body.status_text;
      let createdOn = 1;
      let updatedOn = 1;
      let open = true;
      const createAndSaveIssue = function(done) {
        const test = new Issue({issue_title: title,
                                 issue_text: text,
                                 created_by: by,
                                 assigned_to: assignedTo,
                                 status_text: statusText,
                                 created_on: createdOn,
                                 updated_on: updatedOn,
                                 open: open
                                });
        //issue.save();
        //issue.save((err, data) => (err ? done(err) : done(null, data)));
        test.save(function(err, data) {
          if (err) {
            done(err);
          } else {
            id = data._id;
            res.json({data_saved: data});
          
          }
        });
      }
      createAndSaveIssue();
      */
    })
    
    .put(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
      // issue_title issue_text created_by assigned_to status_text open
      let open = req.body.open; // if checked, will return false, if not checked will be undefined
    
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        dbo.collection(project).findOneAndUpdate(
          {_id: '5ba93371f65f59006acf15e2'},
          //{title: "test77"},
          {created_by: 'tommy'},
          {new: true},
          function(err, data) {
            res.json(data);
        });

      });
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
