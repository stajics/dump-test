const _ = require('lodash');

const bankaAttributes = ['id', 'naziv', 'provizija', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Banka.create({
    naziv: `naziv${randomNumber}`,
    provizija: randomNumber,
  });
};

module.exports = {
  bankaAttributes,
  create,
};
