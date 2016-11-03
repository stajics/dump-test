"use strict";

const _ = require('lodash');

const osiguranjeAttributes = ['id', 'naziv', 'telefon', 'email', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Osiguranje.create({
    naziv: `naziv${randomNumber}`,
    stavkeOsiguranja: values.stavkeOsiguranja || [],
    poslovnice: values.poslovnice || [],
    telefon: values.telefon || '124',
    email: values.email || 'email@example.com'
  });
};

module.exports = {
  osiguranjeAttributes,
  create
};
