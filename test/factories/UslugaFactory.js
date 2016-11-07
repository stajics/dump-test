"use strict";

const _ = require('lodash');

const uslugaAttributes = ['id', 'naziv', 'opis', 'cena', 'poslovnica', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Usluga.create({
    naziv:  values.naziv || `naziv${randomNumber}`,
    opis:  values.opis || 'opis',
    cena:  values.cena || `${randomNumber}`,
    poslovnica: values.poslovnica || randomNumber
  });
};

module.exports = {
  uslugaAttributes,
  create
};
