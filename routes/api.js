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
  name : String,
  age : Number,
  favoriteFoods : [String]
});

var Person = mongoose.model('Person', schema);

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
      console.log('sT: ' + statusText);
      var createAndSavePerson = function(done) {
        const person = new Person({name: "dave", age: "30", favoriteFoods: ["Burgers"]});
        person.save((err, data) => (err ? done(err) : done(null, data)));
        //done(null /*, data*/);
      };
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
