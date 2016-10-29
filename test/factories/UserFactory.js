"use strict";

const _ = require('lodash');

const userAttributes = ['id', 'username', 'ime', 'poslovnica', 'rola', 'email', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,100000);
  return User.create({
    username: `username${randomNumber}`,
    poslovnica: values.poslovnica || randomNumber,
    ime: `ime${randomNumber}`,
    password: 'password',
    email: `email${randomNumber}@email.com`
  });
};

const createSuperUser = (values = {}) => {
  let randomNumber = _.random(1,100000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    poslovnica: values.poslovnica || randomNumber,
    password: 'password',
    rola: 'super_user',
    email: `email${randomNumber}@email.com`
  });
};

const createManager = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    poslovnica: values.poslovnica || randomNumber,
    password: 'password',
    rola: 'menadzer',
    email: `email${randomNumber}@email.com`
  });
};

const getToken = (id) => {
  return CipherService.jwt.encodeSync({id});
};

module.exports = {
  userAttributes,
  create,
  createSuperUser,
  createManager,
  getToken
};
