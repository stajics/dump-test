"use strict";

const _ = require('lodash');

const poslovnicaAttributes = ['id', 'naziv', 'adresa', 'pib', 'matBr', 'ziro', 'telefon', 'email', 'osiguranja','isActive', 'users', 'usluge', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Poslovnica.create({
    naziv: `naziv${randomNumber}`,
    opstina: values.opstina || randomNumber,
    isActive: values.isActive || 1
  });
};

module.exports = {
  poslovnicaAttributes,
  create
};
