"use strict";

const _ = require('lodash');

const stavkaOsiguranjaAttributes = ['id', 'osiguranje', 'popust', 'izuzetak', 'opis', 'vrstaVozila', 'kwOd', 'kwDo', 'nosivostOd', 'nosivostDo', 'ccmOd', 'ccmDo', 'brMestaOd', 'brMestaDo', 'cena', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return StavkaOsiguranja.create({
    osiguranje: randomNumber,
    vrstaVozila: `vrstaVozila${randomNumber}`,
    kwOd: randomNumber,
    kwDo: randomNumber,
    nosivostOd: randomNumber,
    nosivostDo: randomNumber,
    ccmOd: randomNumber,
    ccmDo: randomNumber,
    brMestaOd: randomNumber,
    brMestaDo: randomNumber,
    cena: randomNumber,
    popust: randomNumber,
    izuzetak: 'izuz',
    opis: 'opis'
  });
};

module.exports = {
  stavkaOsiguranjaAttributes,
  create
};
