"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const poslovnicaFactory = require('../../factories/poslovnicaFactory');

describe('controllers:PoslovnicaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingPoslovnica = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      poslovnicaFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingPoslovnica = objects[2];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new poslovnica.', (done) => {
      request.post(`v1/poslovnice`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          naziv: 'nazivPoslovnice',
          opstina: 1,
          adresa: 'adresa 5',
          pib: '1241245',
          matBr: '124245',
          ziro: '124',
          telefon: '2134',
          email: 'email@e.com'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.poslovnica.should.have.all.keys(poslovnicaFactory.poslovnicaAttributes);
          res.body.data.poslovnica.naziv.should.equal('nazivPoslovnice');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/poslovnice`)
        .send({
          naziv: `naziv`,
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
      request.post(`v1/poslovnice`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: 'naziv',
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
      request.post(`v1/poslovnice`).set({
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
      request.post(`v1/poslovnice`).set({
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
    it('Should list poslovnice.', (done) => {
      request.get(`v1/poslovnice`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('poslovnice');
          res.body.data.poslovnice.length.should.be.above(0);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/poslovnice`).set({
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
      request.get(`v1/poslovnice`)
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
    it('Should update poslovnica.', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          naziv: "updatednaziv"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('poslovnica');
          res.body.data.poslovnica.should.have.all.keys(poslovnicaFactory.poslovnicaAttributes);
          res.body.data.poslovnica.naziv.should.equal('updatednaziv');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: "updatednaziv",
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
      request.put(`v1/poslovnice/${existingUser1.id}`)
        .send({
          naziv: "updatednaziv",
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
    it('Should delete poslovnica.', (done) => {
      request.delete(`v1/poslovnice/${existingPoslovnica.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('poslovnica');
          res.body.data.poslovnica.should.have.all.keys(poslovnicaFactory.poslovnicaAttributes);
          done();
        });
    });

    it('Should get error. (poslovnica does not exist)', (done) => {
      request.delete(`v1/poslovnice/${existingPoslovnica.id}`).set({
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
      request.delete(`v1/poslovnice/string`).set({
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
      request.delete(`v1/poslovnice/${existingUser.id}`).set({
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
      request.delete(`v1/poslovnice/${existingUser1.id}`)
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
