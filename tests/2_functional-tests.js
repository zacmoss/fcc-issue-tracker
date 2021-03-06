/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          //console.log(res.text);
          //console.log(res);
          done();
        });
        
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: '',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Please provide title, text, and created by.');
          //console.log(res);
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5baa629c6af9520c82823c43',
          issue_title: '',
          issue_text: '',
          created_by: '',
          assigned_to: '',
          status_text: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'No updated field sent');
          //console.log(res.text);
          done();
        });
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5baaa40c499ab23375a6fda6',
          issue_title: 'Update Title',
          issue_text: '',
          created_by: '',
          assigned_to: '',
          status_text: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Successfully updated');
          //console.log(res.text);
          done();
        });
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5baaa40c499ab23375a6fda6',
          issue_title: 'Update Title',
          issue_text: 'Multiply fields updated',
          created_by: '',
          assigned_to: '',
          status_text: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Successfully updated');
          //console.log(res.text);
          done();
        });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          //console.log(res.body);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          //console.log(res.body);
          assert.isArray(res.body);
          assert.isAbove(res.body.length, 0, 'More than zero items in results');

          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({
          issue_title: 'Title',
          issue_text: 'text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          //console.log(res.body);
          assert.isArray(res.body);
          assert.isAbove(res.body.length, 0, 'More than zero items in results');

          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          //console.log(res.body);
          assert.equal(res.text, 'Must input id')
          done();
        });
      });
      
      test('Valid _id', function(done) {
        let id = '5baaa72481e0bb44938f9642';
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: '5baaa72481e0bb44938f9642'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          //console.log(res.body);
          assert.equal(res.text, 'Issue ' + id + 'deleted')
          done();
        });
      });
      
    });

});
