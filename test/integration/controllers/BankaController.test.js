/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const bankaFactory = require('../../factories/BankaFactory');
const poslovnicaFactory = require('../../factories/PoslovnicaFactory');

describe('controllers:BankaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  let existingBanka = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      userFactory.create({ poslovnica: 1 }),
      bankaFactory.create({ poslovnica: 1 }),
      poslovnicaFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      existingBanka = objects[3];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new banka.', (done) => {
      request.post('v1/banke').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        naziv: 'naziv',
        provizija: 1.1,
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.banka.should.have.all.keys(bankaFactory.bankaAttributes);
        res.body.data.banka.naziv.should.equal('naziv');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/banke')
        .send({
          naziv: 'naziv',
          provizija: 2,
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not manager).', (done) => {
      request.post('v1/banke').set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
      .send({
        naziv: 'naziv',
        provizija: 1.1,
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
      request.post('v1/banke').set({
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
      request.post('v1/banke').set({
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
    it('Should list banke.', (done) => {
      request.get('v1/banke').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('banke');
        res.body.data.banke.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 banka.', (done) => {
      request.get(`v1/banke/${existingBanka.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('banka');
        res.body.data.banka.should.have.all.keys(bankaFactory.bankaAttributes);
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/banke')
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
    it('Should update banka.', (done) => {
      request.put(`v1/banke/${existingBanka.id}`).set({
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
        res.body.data.should.have.all.keys('banka');
        res.body.data.banka.should.have.all.keys(bankaFactory.bankaAttributes);
        res.body.data.banka.naziv.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not a manager)', (done) => {
      request.put(`v1/banke/${existingBanka.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
      })
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

    it('Should get error. (no token)', (done) => {
      request.put(`v1/banke/${existingUser1.id}`)
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
    it('Should delete banka.', (done) => {
      request.delete(`v1/banke/${existingBanka.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('banka');
        res.body.data.banka.should.have.all.keys(bankaFactory.bankaAttributes);
        done();
      });
    });

    it('Should get error. (banka does not exist)', (done) => {
      request.delete(`v1/banke/${existingBanka.id}`).set({
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

    it('Should get error. (banka does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/banke/string').set({
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

    it('Should get error. (not a manager)', (done) => {
      request.delete(`v1/banke/${existingUser.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser2.id)}`,
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
      request.delete(`v1/banke/${existingUser1.id}`)
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
