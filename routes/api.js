/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

// to select oid in database use ObjectId in id query as seen below

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
      let queryObject = {};
    
      // query is <query>       //object variable must match database variable
      if (req.query.id) queryObject._id = req.query._id;
      if (req.query.title) queryObject.title = req.query.title;
      if (req.query.text) queryObject.text = req.query.text;
      if (req.query.created_by) queryObject.created_by = req.query.created_by;
      if (req.query.assigned_to) queryObject.assigned_to = req.query.assigned_to;
      if (req.query.status_text) queryObject.status_text = req.query.status_text;
      if (req.query.created_on) queryObject.created_on = req.query.created_on;
      if (req.query.updated_on) queryObject.updated_on = req.query.updated_on;
      if (req.query.open) queryObject.open = req.query.open;
      
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        // works
        //dbo.collection(project).find({created_by: 'zac'}).toArray(function(err,result){res.json(result)});
        
        // shows all
        //dbo.collection(project).find().toArray(function(err,result){res.json(result)});
        
        // works
        dbo.collection(project).find(queryObject).toArray(function(err, result) {
          res.json(result);
        });
        
        /* no reason for this
        try {
          dbo.collection(project).find(queryObject).toArray(function(err, result) {
            res.json(result);
          });
        } catch (e) {
          console.log(e);
          res.send('Error with query');
        }
        */
        
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
          assigned_to: req.body.assigned_to,
          status_text: req.body.status_text,
          created_on: 1,
          updated_on: 1,
          open: true
        }
        /* works old
        collection.insertOne(issue, function(err, doc) {
          //res.json(doc);
        })
        */
        try {
          collection.insertOne(issue, function(err, doc) {
            res.send(issue);
          });
        } catch (e) {
          console.log(e);
          res.send('Error with input. Issue not added.');
        }
      });
    })
    
    .put(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
      // issue_title issue_text created_by assigned_to status_text open
      //let open = req.body.open; // if checked, will return false, if not checked will be undefined
      let open;
      if (req.body.open === 'false') {
        open = false;
      } else {
        open = true;
      }
    
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("fcc-cert6-project2");
        
        
        // gets open boolean
        //let open;
        //dbo.collection(project).findOne({_id: ObjectId(id)}, function(err, result){open = result.open});
        //let open = true;
        
        
        //works
        //dbo.collection(project).findOne({title: "test99"}, function(err, result){res.json(result)});
        
        // WORKS ObjectId(id)!!!!!
        /*
        dbo.collection(project).findOneAndUpdate(
            //{ title: "test99" },
            {_id: ObjectId(id)},
            { $set: {
              title: req.body.issue_title,
              text: req.body.issue_text,
              created_by: req.body.created_by,
              assignedTo: req.body.assigned_to,
              statusText: req.body.status_text,
              //createdOn: new Date(),
              updatedOn: new Date(),
              open: open
            } }
            //upsert: true
        );
        */
        try {
          // WORKS ObjectId(id)!!!!!
          dbo.collection(project).findOneAndUpdate(
              {_id: ObjectId(id)},
              { $set: {
                title: req.body.issue_title,
                text: req.body.issue_text,
                created_by: req.body.created_by,
                assignedTo: req.body.assigned_to,
                statusText: req.body.status_text,
                //createdOn: new Date(),
                updatedOn: new Date(),
                open: open
              } }
          );
          res.send('Successfully updated');
        } catch (e) {
          console.log(e);
          res.send('Error. Issue not updated.');
        }
        
        
      });
      
    })
    
    // works
    .delete(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
    
      MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        //if (err) throw err;
        if (err) console.log(err);
        var dbo = db.db("fcc-cert6-project2");
        
        /*
        dbo.collection(project).deleteOne({_id: ObjectId(id)}, function(err, result) {
          if (err) {
            res.send('Issue ' + id + 'not deleted.');
          } else {
            res.send('Issue ' + id + 'deleted');
          }
        });
        */
        try {
          dbo.collection(project).deleteOne({_id: ObjectId(id)});
          res.send('Issue ' + id + 'deleted');
        } catch (e) {
          console.log(e);
          res.send('Issue ' + id + 'not deleted.');
        }
      });
    });
    
};
