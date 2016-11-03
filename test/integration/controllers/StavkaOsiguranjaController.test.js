"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const stavkaOsiguranjaFactory = require('../../factories/StavkaOsiguranjaFactory');

describe('controllers:StavkaOsiguranjaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingStavkaOsiguranja = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      stavkaOsiguranjaFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingStavkaOsiguranja = objects[2];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new stavkaOsiguranja.', (done) => {
      request.post(`v1/stavkeOsiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          osiguranje: 1,
          vrstaVozila: `vrstaVozila123`,
          kwOd: 123,
          kwDo: 123,
          nosivostOd: 124,
          nosivostDo: 125,
          ccmOd: 124,
          ccmDo: 124,
          brMestaOd: 124,
          brMestaDo: 124,
          cena: 123,
          popust: 123
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.stavkaOsiguranja.should.have.all.keys(stavkaOsiguranjaFactory.stavkaOsiguranjaAttributes);
          res.body.data.stavkaOsiguranja.vrstaVozila.should.equal('vrstaVozila123');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/stavkeOsiguranja`)
        .send({
          osiguranje: 1,
          vrstaVozila: `vrstaVozila123`,
          kwOd: 123,
          kwDo: 123,
          nosivostOd: 124,
          nosivostDo: 125,
          ccmOd: 124,
          ccmDo: 124,
          brMestaOd: 124,
          brMestaDo: 124,
          cena: 123,
          popust: 123
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
      request.post(`v1/stavkeOsiguranja`).set({
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
      request.post(`v1/stavkeOsiguranja`).set({
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
      request.post(`v1/stavkeOsiguranja`).set({
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
    it('Should list stavkeOsiguranja.', (done) => {
      request.get(`v1/stavkeOsiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('stavkaOsiguranja');
          res.body.data.stavkaOsiguranja.length.should.be.above(0);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/stavkeOsiguranja`).set({
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
      request.get(`v1/stavkeOsiguranja`)
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
    it('Should update stavkaOsiguranja.', (done) => {
      request.put(`v1/stavkeOsiguranja/${existingStavkaOsiguranja.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          vrstaVozila: "vrstaVozila1234"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('stavkaOsiguranja');
          res.body.data.stavkaOsiguranja.should.have.all.keys(stavkaOsiguranjaFactory.stavkaOsiguranjaAttributes);
          res.body.data.stavkaOsiguranja.vrstaVozila.should.equal('vrstaVozila1234');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/stavkeOsiguranja/${existingStavkaOsiguranja.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: "updatednaziv"
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
      request.put(`v1/stavkeOsiguranja/${existingUser1.id}`)
        .send({
          naziv: "updatednaziv"
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
    it('Should delete stavkaOsiguranja.', (done) => {
      request.delete(`v1/stavkeOsiguranja/${existingStavkaOsiguranja.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('stavkaOsiguranja');
          res.body.data.stavkaOsiguranja.should.have.all.keys(stavkaOsiguranjaFactory.stavkaOsiguranjaAttributes);
          done();
        });
    });

    it('Should get error. (stavkaOsiguranja does not exist)', (done) => {
      request.delete(`v1/stavkeOsiguranja/${existingStavkaOsiguranja.id}`).set({
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
      request.delete(`v1/stavkeOsiguranja/string`).set({
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
      request.delete(`v1/stavkeOsiguranja/${existingUser.id}`).set({
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
      request.delete(`v1/stavkeOsiguranja/${existingUser1.id}`)
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
