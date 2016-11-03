"use strict";

const _ = require('lodash');

const osiguranjeAttributes = ['id', 'naziv', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Osiguranje.create({
    naziv: `naziv${randomNumber}`,
    stavkeOsiguranja: values.stavkeOsiguranja || [],
    poslovnice: values.poslovnice || []
  });
};

module.exports = {
  osiguranjeAttributes,
  create
};
