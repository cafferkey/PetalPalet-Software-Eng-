var should = require('chai').should();
var request = require('supertest');

var host_url = 'http://danu7.it.nuigalway.ie:8634'
var container_url = host_url + '/getComments/';

describe('Integration tests for Comment REST APIs', function() {
    describe('Check comment field', function() {
        container = request(container_url);
        it('MUST contain comment field', function(done) {
            container
                .get('')
                .expect(function(res){
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('comment');
                })
                .expect(200, done);
        });
    });
});
