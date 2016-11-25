/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const tipPredmetaFactory = require('../../factories/TipPredmetaFactory');
const taksaFactory = require('../../factories/TaksaFactory');

describe('controllers:TipPredmetaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingTipPredmeta = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      tipPredmetaFactory.create(),
      taksaFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingTipPredmeta = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new tipPredmeta.', (done) => {
      request.post('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'naziv',
        takse: [3],
        usluge: [],
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        // res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        res.body.data.tipPredmeta.naziv.should.equal('naziv');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/tipoviPredmeta')
        .send({
          naziv: 'naziv',
          poslovnica: 1,
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
    //   request.post('v1/tipoviPredmeta').set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     naziv: 'naziv',
    //     poslovnica: 1,
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
      request.post('v1/tipoviPredmeta').set({
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
      request.post('v1/tipoviPredmeta').set({
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
    it('Should list tipoviPredmeta.', (done) => {
      request.get('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        res.body.data.tipPredmeta.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 tipPredmeta.', (done) => {
      request.get(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        done();
      });
    });

    // it('Should get error. (not a super_user)', (done) => {
    //   request.get('v1/tipoviPredmeta').set({
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
      request.get('v1/tipoviPredmeta')
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
    it('Should update tipPredmeta.', (done) => {
      request.put(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'updatedIme',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        // res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        res.body.data.tipPredmeta.naziv.should.equal('updatedIme');
        done();
      });
    });

    // it('Should get error. (not a super_admin)', (done) => {
    //   request.put(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
    //     authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
    //   })
    //   .send({
    //     naziv: 'updatedIme',
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
      request.put(`v1/tipoviPredmeta/${existingUser1.id}`)
        .send({
          naziv: 'updatedIme',
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
    it('Should delete tipPredmeta.', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        // res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        done();
      });
    });

    it('Should get error. (tipPredmeta does not exist)', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
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

    it('Should get error. (tipPredmeta does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/tipoviPredmeta/string').set({
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
    //   request.delete(`v1/tipoviPredmeta/${existingUser.id}`).set({
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
      request.delete(`v1/tipoviPredmeta/${existingUser1.id}`)
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
