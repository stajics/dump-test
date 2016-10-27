const _ = require('lodash');

const poslovnicaAttributes = ['id', 'ime', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Poslovnica.create({
    ime: `naziv${randomNumber}`
  });
};

module.exports = {
  poslovnicaAttributes,
  create
};
