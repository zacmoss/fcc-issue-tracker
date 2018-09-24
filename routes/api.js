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

var Issue = mongoose.model('Issue', schema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      console.log(project);
      //console.log(req.body);
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        if (db.collection(project)) {
          console.log('collection exists');
          db.createCollection(project);
          //console.log(db.collection(project));
        } else {
          db.createCollection(project);
          //var Issue = mongoose.model('Issue', schema);
        }
      });
      
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
          //done(null /*, data*/);
          }
        });
      }
      createAndSaveIssue();
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
