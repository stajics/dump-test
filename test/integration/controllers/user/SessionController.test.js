"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../../factories/UserFactory');
const poslovnicaFactory = require('../../../factories/PoslovnicaFactory');

describe('controllers:SessionController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  before(done => {
    Promise.all([
      userFactory.createManager({poslovnica: 1}),
      userFactory.create({poslovnica: 1}),
      userFactory.create({poslovnica: 1})
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      done();
    });
  });

  describe(':create', () => {
    it('Should signin.', (done) => {
      request.post(`v1/users/signin`)
        .send({
          username: existingUser.username,
          password: 'password'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user', 'token');
          res.body.data.user.should.have.all.keys(userFactory.userAttributes);
          done();
        });
    });

    it('Should get error (bad password).', (done) => {
      request.post(`v1/users/signin`)
        .send({
          username: existingUser.username,
          password: 'badPassword'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (bad username)', (done) => {
      request.post(`v1/users/signin`)
        .send({
          username: 'notexisting',
          password: 'password'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (missing parameter)', (done) => {
      request.post(`v1/users/signin`)
        .send({
          password: 'password'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data', 'message');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (missing body)', (done) => {
      request.post(`v1/users/signin`)
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data', 'message');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':refreshToken', () => {
    it('Should refresh token.', (done) => {
      request.get(`v1/users/refresh_token`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user', 'token');
          res.body.data.user.should.have.all.keys(userFactory.userAttributes);
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.get(`v1/users/refresh_token`)
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });
});
