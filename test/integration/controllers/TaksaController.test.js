/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const taksaFactory = require('../../factories/TaksaFactory');
const poslovnicaFactory = require('../../factories/PoslovnicaFactory');

describe('controllers:TaksaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  let existingTaksa = null;
  let existingTaksa1 = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 3 }),
      userFactory.createManager({ poslovnica: 3 }),
      userFactory.create({ poslovnica: 3 }),
      taksaFactory.create({ opstina: 2 }),
      taksaFactory.create({ opstina: 1 }),
      taksaFactory.create({ opstina: 0 }),
      taksaFactory.create({ opstina: 2 }),
      taksaFactory.create({ opstina: 0 }),
      taksaFactory.create({ opstina: 1 }),
      poslovnicaFactory.create({ opstina: 1 }),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      existingTaksa = objects[3];
      existingTaksa1 = objects[4];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new taksa.', (done) => {
      request.post('v1/takse').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        usluga: 'usluga',
        opstina: 1,
        vrstaVozila: 'putnicko',
        godisteOd: 123,
        godisteDo: 124,
        zapreminaOd: 125,
        zapreminaDo: 125,
        snagaOd: 124,
        snagaDo: 12154,
        brSedistaOd: 124,
        brSedistaDo: 15451,
        nosivostOd: 1,
        nosivostDo: 12,
        cena: 1255,
        komentar: 'koment',
        izuzetak: 'izuzetak',
        isDefault: true,
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
        res.body.data.taksa.usluga.should.equal('usluga');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/takse')
        .send({
          usluga: 'usluga',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    // it('Should get error (user is not super_user or manager).', (done) => {
    //   request.post('v1/takse').set({
    //       authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
    //     })
    //     .send({
    //       name: 'name'
    //     })
    //     .expect(401)
    //     .end((err, res) => {
    //       if (err) throw err;
    //       res.body.should.have.all.keys('status', 'data');
    //       res.body.status.should.equal('fail');
    //       done();
    //     });
    // });
  });

  describe(':read', () => {
    it('Should list takse. (super_user)', (done) => {
      request.get('v1/takse').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('taksa');
        res.body.data.taksa.length.should.be.above(0);
        done();
      });
    });

    it('Should list takse. (manager)', (done) => {
      request.get('v1/takse').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('taksa');
        res.body.data.taksa.length.should.be.above(2);
        done();
      });
    });

    it('Should list takse. (korisnik)', (done) => {
      request.get('v1/takse').set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('taksa');
        res.body.data.taksa.length.should.be.above(2);
        done();
      });
    });

    it('Should list 1 taksa. (super_user)', (done) => {
      request.get(`v1/takse/${existingTaksa.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('taksa');
        res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
        done();
      });
    });

    it('Should list 1 taksa. (korisnik)', (done) => {
      request.get(`v1/takse/${existingTaksa1.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('taksa');
        res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
        done();
      });
    });

    it('Should list 0 taksa. (menadzer)(taksa not from users poslovnica opstina)', (done) => {
      request.get(`v1/takse/${existingTaksa.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.be.empty; // eslint-disable-line
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/takse')
        .send()
        .expect(401)
        .end((err, res) => {
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
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        usluga: 'uslugaUpdate',
      })
      .expect(200)
      .end((err, res) => {
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
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        name: 'updatedIme',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/takse/${existingUser1.id}`)
        .send({
          name: 'updatedIme',
        })
        .expect(401)
        .end((err, res) => {
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
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
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
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (taksa does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/takse/string').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.delete(`v1/takse/${existingUser.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
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
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });
});
