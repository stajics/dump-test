const _ = require('lodash');

const nazivTakseAttributes = ['id', 'naziv', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return NazivTakse.create({
    naziv: `name${randomNumber}`,
  });
};

module.exports = {
  nazivTakseAttributes,
  create,
};
