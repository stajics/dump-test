/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const poslovnicaFactory = require('../../factories/PoslovnicaFactory');
const osiguranjeFactory = require('../../factories/OsiguranjeFactory');

describe('controllers:PoslovnicaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  let existingPoslovnica = null;
  let existingOsiguranje = null;
  let existingOsiguranje1 = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      userFactory.create({ poslovnica: 1 }),
      poslovnicaFactory.create(),
      osiguranjeFactory.create(),
      osiguranjeFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      existingPoslovnica = objects[3];
      existingOsiguranje = objects[4];
      existingOsiguranje1 = objects[5];
      done();
    }).catch(done);
  });

  describe(':create', () => {
    it('Should create new poslovnica.', (done) => {
      request.post('v1/poslovnice').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'nazivPoslovnice',
        opstina: 1,
        adresa: 'adresa 5',
        pib: '1241245',
        matBr: '124245',
        ziro: '124',
        isActive: true,
        telefon: '2134',
        email: 'email@e.com',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.poslovnica.should.contain.all.keys(['matBr', 'naziv', 'opstina', 'updatedAt', 'ziro']);
        res.body.data.poslovnica.naziv.should.equal('nazivPoslovnice');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/poslovnice')
        .send({
          naziv: 'naziv',
          opstina: 1,
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
      request.post('v1/poslovnice').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        naziv: 'naziv',
        opstina: 1,
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
      request.post('v1/poslovnice').set({
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
      request.post('v1/poslovnice').set({
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
    it('Should list poslovnice. (super_user)', (done) => {
      request.get('v1/poslovnice').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.length.should.be.above(0);
        done();
      });
    });

    it('Should list poslovnica. (menadzer)', (done) => {
      request.get('v1/poslovnice').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.should.not.be.empty; // eslint-disable-line
        done();
      });
    });

    it('Should list poslovnice. (korisnik)', (done) => {
      request.get('v1/poslovnice').set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.should.not.be.empty; // eslint-disable-line
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/poslovnice')
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
    it('Should update poslovnica.', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'updatednaziv',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.should.contain.all.keys(poslovnicaFactory.poslovnicaAttributes);
        res.body.data.poslovnica.naziv.should.equal('updatednaziv');
        done();
      });
    });

    it('Should update poslovnica. (manager)', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        naziv: 'updatednaziv',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.should.contain.all.keys(poslovnicaFactory.poslovnicaAttributes);
        res.body.data.poslovnica.naziv.should.equal('updatednaziv');
        done();
      });
    });

    it('Should select osiguranja for poslovnica.', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        osiguranja: [`${existingOsiguranje.id}`, `${existingOsiguranje1.id}`],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('poslovnica');
        res.body.data.poslovnica.should.contain.all.keys(poslovnicaFactory.poslovnicaAttributes);
        res.body.data.poslovnica.naziv.should.equal('updatednaziv');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/poslovnice/${existingPoslovnica.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
      .send({
        naziv: 'updatednaziv',
        opstina: 1,
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
      request.put(`v1/poslovnice/${existingUser1.id}`)
        .send({
          naziv: 'updatednaziv',
          opstina: 1,
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
    it('Should delete poslovnica.', (done) => {
      request.delete(`v1/poslovnice/${existingPoslovnica.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.contain.all.keys('poslovnica');
        res.body.data.poslovnica.should.contain.all.keys(['matBr', 'naziv', 'opstina', 'updatedAt', 'ziro']);
        done();
      });
    });

    it('Should get error. (poslovnica does not exist)', (done) => {
      request.delete(`v1/poslovnice/${existingPoslovnica.id}`).set({
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

    it('Should get error. (user does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/poslovnice/string').set({
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
      request.delete(`v1/poslovnice/${existingUser.id}`).set({
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
      request.delete(`v1/poslovnice/${existingUser1.id}`)
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
