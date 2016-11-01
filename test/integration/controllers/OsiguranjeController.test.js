"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const osiguranjeFactory = require('../../factories/OsiguranjeFactory');

describe('controllers:OsiguranjeController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  let existingOsiguranje = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      userFactory.create({poslovnica: 1}),
      osiguranjeFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      existingOsiguranje = objects[3];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new osiguranje.', (done) => {
      request.post(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          naziv: `naziv`
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          res.body.data.osiguranje.naziv.should.equal('naziv');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/osiguranja`)
        .send({
          naziv: `naziv`
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
      request.post(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          naziv: `naziv`
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
      request.post(`v1/osiguranja`).set({
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
      request.post(`v1/osiguranja`).set({
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
    it('Should list osiguranja.', (done) => {
      request.get(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.length.should.be.above(0);
          done();
        });
    });

    it('Should list osiguranja.', (done) => {
      request.get(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 osiguranje.', (done) => {
      request.get(`v1/osiguranja/${existingOsiguranje.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user or manager)', (done) => {
      request.get(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser2.id)}`
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
      request.get(`v1/osiguranja`)
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
    it('Should update osiguranje.', (done) => {
      request.put(`v1/osiguranja/${existingOsiguranje.id}`).set({
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
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          res.body.data.osiguranje.naziv.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/osiguranja/${existingOsiguranje.id}`).set({
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
      request.put(`v1/osiguranja/${existingUser1.id}`)
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
    it('Should delete osiguranje.', (done) => {
      request.delete(`v1/osiguranja/${existingOsiguranje.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          done();
        });
    });

    it('Should get error. (osiguranje does not exist)', (done) => {
      request.delete(`v1/osiguranja/${existingOsiguranje.id}`).set({
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

    it('Should get error. (osiguranje does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/osiguranja/string`).set({
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
      request.delete(`v1/osiguranja/${existingUser.id}`).set({
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
      request.delete(`v1/osiguranja/${existingUser1.id}`)
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
