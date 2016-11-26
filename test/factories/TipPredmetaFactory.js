const _ = require('lodash');

const tipPredmetaAttributes = ['id', 'naziv', 'predmeti', 'poslovnica', 'takse', 'usluge', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return TipPredmeta.create({
    naziv: `naziv${randomNumber}`,
    poslovnica: values.poslovnica || 1,
  });
};

module.exports = {
  tipPredmetaAttributes,
  create,
};
