"use strict";

const _ = require('lodash');

const poslovnicaAttributes = ['id', 'ime', 'adresa', 'pib', 'matBr', 'ziro', 'telefon', 'email', 'opstina', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Poslovnica.create({
    ime: `naziv${randomNumber}`,
    opstina: randomNumber
  });
};

module.exports = {
  poslovnicaAttributes,
  create
};
