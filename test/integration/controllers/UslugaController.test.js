/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const uslugaFactory = require('../../factories/UslugaFactory');

describe('controllers:UslugaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUsluga = null;
  let existingUsluga1 = null;
  before((done) => {
    Promise.all([
      userFactory.createManager({ poslovnica: 1 }),
      userFactory.create({ poslovnica: 1 }),
      uslugaFactory.create({ poslovnica: 1 }),
      uslugaFactory.create({ poslovnica: 2 }),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUsluga = objects[2];
      existingUsluga1 = objects[3];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new usluga.', (done) => {
      request.post('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'name',
        poslovnica: 1,
        cena: '1245',
        opis: 'opes',
        vrstaVozila: 'vrstaVozila',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.usluga.should.have.all.keys(uslugaFactory.uslugaAttributes);
        res.body.data.usluga.naziv.should.equal('name');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/usluge')
        .send({
          naziv: 'name',
          poslovnica: 1,
          cena: '1245',
          opis: 'opes',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not super_user).', (done) => {
      request.post('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        naziv: 'name',
        poslovnica: 1,
        cena: '1245',
        opis: 'opes',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });


    it('Should get error (missing parameter).', (done) => {
      request.post('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing body).', (done) => {
      request.post('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });
  });

  describe(':read', () => {
    it('Should list usluge. (menadzer)', (done) => {
      request.get('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 usluga. (superuser)', (done) => {
      request.get(`v1/usluge/${existingUsluga.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.should.have.all.keys(uslugaFactory.uslugaAttributes);
        done();
      });
    });

    it('Should list usluge. (korisnik)', (done) => {
      request.get('v1/usluge').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 usluga. (korisnik)', (done) => {
      request.get(`v1/usluge/${existingUsluga.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.should.have.all.keys(uslugaFactory.uslugaAttributes);
        done();
      });
    });


    it('Should get error. (no token)', (done) => {
      request.get('v1/usluge')
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
    it('Should update usluga.', (done) => {
      request.put(`v1/usluge/${existingUsluga.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'updatedIme',
        poslovnica: 1,
        cena: '1245',
        opis: 'opes',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.should.have.all.keys(uslugaFactory.uslugaAttributes);
        res.body.data.usluga.naziv.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not from same poslovnica)', (done) => {
      request.put(`v1/usluge/${existingUsluga1.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'updatedIme',
        poslovnica: 1,
        cena: '1245',
        opis: 'opes',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/usluge/${existingUsluga.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        naziv: 'updatedIme',
        poslovnica: 1,
        cena: '1245',
        opis: 'opes',
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
      request.put(`v1/usluge/${existingUser1.id}`)
        .send({
          naziv: 'updatedIme',
          poslovnica: 1,
          cena: '1245',
          opis: 'opes',
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
    it('Should delete usluga.', (done) => {
      request.delete(`v1/usluge/${existingUsluga.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('usluga');
        res.body.data.usluga.should.have.all.keys(uslugaFactory.uslugaAttributes);
        done();
      });
    });

    it('Should get error. (usluga from other poslovnica)', (done) => {
      request.delete(`v1/usluge/${existingUsluga1.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
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

    it('Should get error. (usluga does not exist)', (done) => {
      request.delete(`v1/usluge/${existingUsluga.id}`).set({
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

    it('Should get error. (usluga does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/usluge/string').set({
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
      request.delete(`v1/usluge/${existingUser.id}`).set({
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
      request.delete(`v1/usluge/${existingUser1.id}`)
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
