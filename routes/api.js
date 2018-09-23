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
      console.log(req.body);
      let title = req.body.issue_title;
      let text = req.body.issue_text;
      let by = req.body.created_by;
      let assignedTo = req.body.assigned_to;
      let statusText = req.body.status_text;
      let createdOn = 1;
      let updatedOn = 1;
      let open = true;
      console.log('sT: ' + statusText);
      var createAndSaveIssue = function(done) {
        const issue = new Issue({issue_title: title,
                                 issue_text: text,
                                 created_by: by,
                                 assigned_to: assignedTo,
                                 status_text: statusText,
                                 created_on: createdOn,
                                 updated_on: updatedOn,
                                 open: open
                                });
        issue.save();
        //issue.save((err, data) => (err ? done(err) : done(null, data)));
        //done(null /*, data*/);
      };
      createAndSaveIssue();
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
