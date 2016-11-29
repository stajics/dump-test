const _ = require('lodash');
// eslint-disable-next-line
const voziloAttributes = ['id', 'vrstaVozila', 'poslovnica', 'lice', 'registarskiBr', 'marka', 'tip', 'model', 'godiste', 'snagaKw', 'zapremina', 'nosivost', 'masa', 'maxMasa', 'gorivo', 'boja', 'brSasije', 'brMotora', 'brOsovina', 'homoOznaka', 'prvaReg', 'mestaSedenje', 'mestaStajanje', 'istekReg', 'sestomesecni', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Vozilo.create({
    vrstaVozila: `vrstaVozila${randomNumber}`,
    registarskiBr: `registarskiBr${randomNumber}`,
    marka: `marka${randomNumber}`,
    tip: `tip${randomNumber}`,
    model: `model${randomNumber}`,
    godiste: randomNumber,
    snagaKw: randomNumber,
    zapremina: randomNumber,
    nosivost: randomNumber,
    masa: randomNumber,
    maxMasa: randomNumber,
    gorivo: 'gorivo',
    boja: 'boja',
    brSasije: 'brSasije',
    brMotora: 'brMotora',
    brOsovina: 'brOsovina',
    homoOznaka: 'homoOznaka',
    prvaReg: 'prvaReg',
    mestaSedenje: randomNumber,
    mestaStajanje: randomNumber,
    istekReg: 'mestaSedenje',
    sestomesecni: 'true',
    poslovnica: 1,
    lice: 1,
  });
};

module.exports = {
  voziloAttributes,
  create,
};
