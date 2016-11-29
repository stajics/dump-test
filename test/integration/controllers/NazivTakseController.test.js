"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const nazivTakseFactory = require('../../factories/NazivTakseFactory');
const poslovnicaFactory = require('../../factories/PoslovnicaFactory');

describe('controllers:NazivTakseController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingNazivTakse = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      nazivTakseFactory.create(),
      poslovnicaFactory.create(),
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingNazivTakse = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new nazivTakse.', (done) => {
      request.post(`v1/naziviTaksa`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          naziv: 'naziv'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.nazivTakse.should.have.all.keys(nazivTakseFactory.nazivTakseAttributes);
          res.body.data.nazivTakse.naziv.should.equal('naziv');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/naziviTaksa`)
        .send({
          naziv: 'naziv'
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
      request.post(`v1/naziviTaksa`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: 'naziv'
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
      request.post(`v1/naziviTaksa`).set({
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
      request.post(`v1/naziviTaksa`).set({
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
    it('Should list naziviTaksa.', (done) => {
      request.get(`v1/naziviTaksa`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('nazivTakse');
          res.body.data.nazivTakse.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 nazivTakse.', (done) => {
      request.get(`v1/naziviTaksa/${existingNazivTakse.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('nazivTakse');
          res.body.data.nazivTakse.should.have.all.keys(nazivTakseFactory.nazivTakseAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/naziviTaksa`).set({
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
      request.get(`v1/naziviTaksa`)
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
    it('Should update nazivTakse.', (done) => {
      request.put(`v1/naziviTaksa/${existingNazivTakse.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          naziv: "updatedIme"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('nazivTakse');
          res.body.data.nazivTakse.should.have.all.keys(nazivTakseFactory.nazivTakseAttributes);
          res.body.data.nazivTakse.naziv.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/naziviTaksa/${existingNazivTakse.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: "updatedIme"
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
      request.put(`v1/naziviTaksa/${existingUser1.id}`)
        .send({
          naziv: "updatedIme"
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
    it('Should delete nazivTakse.', (done) => {
      request.delete(`v1/naziviTaksa/${existingNazivTakse.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('nazivTakse');
          res.body.data.nazivTakse.should.have.all.keys(nazivTakseFactory.nazivTakseAttributes);
          done();
        });
    });

    it('Should get error. (nazivTakse does not exist)', (done) => {
      request.delete(`v1/naziviTaksa/${existingNazivTakse.id}`).set({
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

    it('Should get error. (nazivTakse does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/naziviTaksa/string`).set({
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
      request.delete(`v1/naziviTaksa/${existingUser.id}`).set({
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
      request.delete(`v1/naziviTaksa/${existingUser1.id}`)
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
