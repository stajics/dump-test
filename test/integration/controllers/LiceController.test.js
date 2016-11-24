/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const liceFactory = require('../../factories/LiceFactory');

describe('controllers:LiceController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingLice = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      liceFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingLice = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new lice.', (done) => {
      request.post('v1/lica').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        tip: 'tip',
        nazivFirme: 'nazivFirme',
        ime: 'ime',
        prezime: 'prezime',
        adresa: 'adresa',
        maticniBroj: '123',
        licnaKarta: '124',
        pib: 'pib',
        ziroRacun: 'ziroRacun',
        telFiksni: 'telFiksni',
        telMobilni: 'telMobilni',
        kontakt: 'kontakt',
        email: 'email@a.com',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
        res.body.data.lice.ime.should.equal('ime');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/lica')
        .send({
          ime: 'ime',
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
    //   request.post('v1/lica').set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     ime: 'ime',
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
      request.post('v1/lica').set({
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
      request.post('v1/lica').set({
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
    it('Should list lica.', (done) => {
      request.get('v1/lica').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('lice');
        res.body.data.lice.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 lice.', (done) => {
      request.get(`v1/lica/${existingLice.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('lice');
        res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
        done();
      });
    });

    // it('Should get error. (not a super_user)', (done) => {
    //   request.get('v1/lica').set({
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
      request.get('v1/lica')
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
    it('Should update lice.', (done) => {
      request.put(`v1/lica/${existingLice.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        ime: 'updatedIme',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('lice');
        res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
        res.body.data.lice.ime.should.equal('updatedIme');
        done();
      });
    });

    // it('Should get error. (not a super_admin)', (done) => {
    //   request.put(`v1/lica/${existingLice.id}`).set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     ime: 'updatedIme',
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
      request.put(`v1/lica/${existingUser1.id}`)
        .send({
          ime: 'updatedIme',
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
    it('Should delete lice.', (done) => {
      request.delete(`v1/lica/${existingLice.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('lice');
        res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
        done();
      });
    });

    it('Should get error. (lice does not exist)', (done) => {
      request.delete(`v1/lica/${existingLice.id}`).set({
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

    it('Should get error. (lice does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/lica/string').set({
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
    //   request.delete(`v1/lica/${existingUser.id}`).set({
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
      request.delete(`v1/lica/${existingUser1.id}`)
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
