const _ = require('lodash');

const opstinaAttributes = ['id', 'ime', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Opstina.create({
    ime: `naziv${randomNumber}`
  });
};

module.exports = {
  opstinaAttributes,
  create
};
