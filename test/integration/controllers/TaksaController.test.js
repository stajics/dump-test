"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const taksaFactory = require('../../factories/TaksaFactory');

describe('controllers:TaksaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingTaksa = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      taksaFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingTaksa = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new taksa.', (done) => {
      request.post(`v1/takse`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          usluga: `usluga`,
          opstina: 1,
          vrstaVozila: 'putnicko',
          godisteOd: 123,
          godisteDo: 124,
          zapreminaOd: 125,
          zapreminaDo: 125,
          snagaOd: 124,
          snagaDo: 12154,
          starostOd: 123,
          starostDo: 12343,
          brSedistaOd: 124,
          brSedistaDo: 15451,
          nosivostOd: 1  ,
          nosivostDo: 12,
          cena: 1255
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          res.body.data.taksa.usluga.should.equal('usluga');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/takse`)
        .send({
          usluga: 'usluga'
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
      request.post(`v1/takse`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          name: 'name'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
    // 
    //
    // it('Should get error (missing parameter).', (done) => {
    //   request.post(`v1/takse`).set({
    //       'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
    //     })
    //     .send({})
    //     .expect(400)
    //     .end(function(err, res) {
    //       if (err) throw err;
    //       res.body.should.have.all.keys('status', 'data');
    //       res.body.status.should.equal('fail');
    //       done();
    //     });
    // });
    //
    // it('Should get error (missing body).', (done) => {
    //   request.post(`v1/takse`).set({
    //       'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
    //     })
    //     .send()
    //     .expect(400)
    //     .end(function(err, res) {
    //       if (err) throw err;
    //       res.body.should.have.all.keys('status', 'data');
    //       res.body.status.should.equal('fail');
    //       done();
    //     });
    // });
  });

  describe(':read', () => {
    it('Should list takse.', (done) => {
      request.get(`v1/takse`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 taksa.', (done) => {
      request.get(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/takse`).set({
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
      request.get(`v1/takse`)
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
    it('Should update taksa.', (done) => {
      request.put(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          usluga: "uslugaUpdate"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          res.body.data.taksa.usluga.should.equal('uslugaUpdate');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          name: "updatedIme"
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
      request.put(`v1/takse/${existingUser1.id}`)
        .send({
          name: "updatedIme"
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
    it('Should delete taksa.', (done) => {
      request.delete(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          done();
        });
    });

    it('Should get error. (taksa does not exist)', (done) => {
      request.delete(`v1/takse/${existingTaksa.id}`).set({
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

    it('Should get error. (taksa does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/takse/string`).set({
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
      request.delete(`v1/takse/${existingUser.id}`).set({
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
      request.delete(`v1/takse/${existingUser1.id}`)
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
