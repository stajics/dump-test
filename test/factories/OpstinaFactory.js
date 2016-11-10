const _ = require('lodash');

const opstinaAttributes = ['id', 'naziv', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 1000);
  return Opstina.create({
    naziv: `naziv${randomNumber}`,
  });
};

module.exports = {
  opstinaAttributes,
  create,
};
