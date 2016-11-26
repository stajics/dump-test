/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const voziloFactory = require('../../factories/VoziloFactory');

describe('controllers:VoziloController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingVozilo = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      voziloFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingVozilo = objects[2];
      done();
    })
    .catch(done);
  });


  describe(':create', () => {
    it('Should create new vozilo.', (done) => {
      const randomNumber = 123;
      request.post('v1/vozila').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        registarskiBr: 'registarskiBr',
        vrstaVozila: `vrstaVozila${randomNumber}`,
        marka: `marka${randomNumber}`,
        tip: `tip${randomNumber}`,
        model: `model${randomNumber}`,
        godiste: randomNumber,
        snagaKw: randomNumber,
        zapremina: randomNumber,
        nosivost: randomNumber,
        masa: randomNumber,
        maxMasa: randomNumber,
        gorivo: 'gorivo',
        boja: 'boja',
        brSasije: 'brSasije',
        brMotora: 'brMotora',
        brOsovina: 'brOsovina',
        homoOznaka: 'homoOznaka',
        prvaReg: 'prvaReg',
        mestaSedenje: randomNumber,
        mestaStajanje: randomNumber,
        istekReg: 'mestaSedenje',
        sestomesecni: true,
        lice: 1,
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        res.body.data.vozilo.registarskiBr.should.equal('registarskiBr');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/vozila')
        .send({
          registarskiBr: 'registarskiBr',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    // it('Should get error (user is not super_user).', (done) => {
    //   request.post('v1/vozila').set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     registarskiBr: 'registarskiBr',
    //   })
    //   .expect(401)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     res.body.should.have.all.keys('status', 'data');
    //     res.body.status.should.equal('fail');
    //     done();
    //   });
    // });


    it('Should get error (missing parameter).', (done) => {
      request.post('v1/vozila').set({
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
      request.post('v1/vozila').set({
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
    it('Should list vozila.', (done) => {
      request.get('v1/vozila').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 vozilo.', (done) => {
      request.get(`v1/vozila/${existingVozilo.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        done();
      });
    });

    // it('Should get error. (not a super_user)', (done) => {
    //   request.get('v1/vozila').set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send()
    //   .expect(401)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     res.body.should.have.keys('status', 'data');
    //     res.body.status.should.equal('fail');
    //     done();
    //   });
    // });

    it('Should get error. (no token)', (done) => {
      request.get('v1/vozila')
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
    it('Should update vozilo.', (done) => {
      request.put(`v1/vozila/${existingVozilo.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        registarskiBr: 'updatedIme',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        res.body.data.vozilo.registarskiBr.should.equal('updatedIme');
        done();
      });
    });

    // it('Should get error. (not a super_admin)', (done) => {
    //   request.put(`v1/vozila/${existingVozilo.id}`).set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     registarskiBr: 'updatedIme',
    //   })
    //   .expect(401)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     res.body.should.have.keys('status', 'data');
    //     res.body.status.should.equal('fail');
    //     done();
    //   });
    // });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/vozila/${existingUser1.id}`)
        .send({
          registarskiBr: 'updatedIme',
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
    it('Should delete vozilo.', (done) => {
      request.delete(`v1/vozila/${existingVozilo.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        done();
      });
    });

    it('Should get error. (vozilo does not exist)', (done) => {
      request.delete(`v1/vozila/${existingVozilo.id}`).set({
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

    it('Should get error. (vozilo does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/vozila/string').set({
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

    // it('Should get error. (not a super_user)', (done) => {
    //   request.delete(`v1/vozila/${existingUser.id}`).set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send()
    //   .expect(401)
    //   .end((err, res) => {
    //     if (err) throw err;
    //     res.body.should.have.keys('status', 'data');
    //     res.body.status.should.equal('fail');
    //     done();
    //   });
    // });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/vozila/${existingUser1.id}`)
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
