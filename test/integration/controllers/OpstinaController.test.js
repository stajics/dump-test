"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const opstinaFactory = require('../../factories/OpstinaFactory');

describe('controllers:OpstinaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingOpstina = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      opstinaFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingOpstina = objects[2];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new opstina.', (done) => {
      request.post(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          ime: 'imeOpstine',
          opstina: 1
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.opstina.should.have.all.keys(opstinaFactory.opstinaAttributes);
          res.body.data.opstina.ime.should.equal('imeOpstine');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/opstine`)
        .send({
          ime: `ime`,
          opstina: 1
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not super_user).', (done) => {
      request.post(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          ime: 'ime',
          opstina: 1
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });


    it('Should get error (missing parameter).', (done) => {
      request.post(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({})
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (missing body).', (done) => {
      request.post(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });

  describe(':read', () => {
    it('Should list opstine.', (done) => {
      request.get(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('opstine');
          res.body.data.opstine.length.should.be.above(0);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/opstine`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.get(`v1/opstine`)
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


  describe(':update', () => {
    it('Should update opstina.', (done) => {
      request.put(`v1/opstine/${existingOpstina.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          ime: "updatedIme"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('opstina');
          res.body.data.opstina.should.have.all.keys(opstinaFactory.opstinaAttributes);
          res.body.data.opstina.ime.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/opstine/${existingOpstina.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          ime: "updatedIme",
          opstina: 1
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/opstine/${existingUser1.id}`)
        .send({
          ime: "updatedIme",
          opstina: 1
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':delete', () => {
    it('Should delete opstina.', (done) => {
      request.delete(`v1/opstine/${existingOpstina.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('opstina');
          res.body.data.opstina.should.have.all.keys(opstinaFactory.opstinaAttributes);
          done();
        });
    });

    it('Should get error. (opstina does not exist)', (done) => {
      request.delete(`v1/opstine/${existingOpstina.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(404)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (user does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/opstine/string`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.delete(`v1/opstine/${existingUser.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/opstine/${existingUser1.id}`)
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
