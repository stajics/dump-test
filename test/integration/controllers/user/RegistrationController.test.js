/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../../factories/UserFactory');

describe('controllers:RegistrationController', () => {
  let existingUser = null;
  let existingUser1 = null;
  before((done) => {
    Promise.all([
      userFactory.createManager({ poslovnica: 1 }),
      userFactory.create({ poslovnica: 1 }),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new user.', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        username: 'username',
        ime: 'ime',
        poslovnica: 1,
        password: 'password',
        email: 'email@email.com',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('user', 'token');
        res.body.data.user.should.have.all.keys(userFactory.userAttributes);
        res.body.data.user.username.should.equal('username');
        done();
      });
    });

    it('Should get error (cant create usr from another poslovnica).', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        username: 'username_unique',
        ime: 'ime',
        poslovnica: 2,
        password: 'password',
        email: 'otherEmail@email.com',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (username in use).', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        username: `${existingUser.username}`,
        ime: 'ime',
        poslovnica: 1,
        password: 'password',
        email: 'email1@email.com',
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/users/signup')
        .send({
          username: 'someUsername',
          ime: 'ime',
          poslovnica: 1,
          password: 'password',
          email: 'email12@email.com',
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
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        username: 'someUsername',
        ime: 'ime',
        poslovnica: 1,
        password: 'password',
        email: 'email12@email.com',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (email in use).', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        username: 'username1',
        ime: 'ime',
        poslovnica: 1,
        password: 'password',
        email: `${existingUser.email}`,
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing parameter).', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        ime: 'ime',
        poslovnica: 1,
        password: 'password',
        email: `${existingUser.email}`,
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing body).', (done) => {
      request.post('v1/users/signup').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });
  });
});
