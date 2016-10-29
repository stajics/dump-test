"use strict";

const _ = require('lodash');

const osiguranjeAttributes = ['id', 'naziv', 'vrstaVozila', 'kwOd', 'kwDo', 'nosivost', 'ccm', 'brMesta', 'cena', 'cena5', 'cena10', 'cena15', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Osiguranje.create({
    naziv: `naziv${randomNumber}`,
    vrstaVozila: 'vrstaVozila',
    kwOd: '23',
    kwDo: '45',
    nosivost: '213',
    ccm: '213',
    brMesta: '4',
    cena: '12',
    cena5: '214',
    cena10: '124',
    cena15: '35',
    poslovnice: values.poslovnice || []
  });
};

module.exports = {
  osiguranjeAttributes,
  create
};
