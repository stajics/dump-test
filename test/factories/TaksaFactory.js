const _ = require('lodash');
/* eslint max-len: 'off' */
const taksaAttributes = ['id', 'nazivTakse', 'opstina', 'komentar', 'isDefault', 'izuzetak', 'vrstaVozila', 'godisteOd', 'godisteDo', 'zapreminaOd', 'zapreminaDo', 'snagaOd', 'snagaDo', 'brSedistaOd', 'brSedistaDo', 'nosivostOd', 'nosivostDo', 'cena', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 1000);
  return Taksa.create({
    nazivTakse: 3,
    opstina: (values.opstina === 0) || values.opstina ? values.opstina : randomNumber,
    vrstaVozila: 'putnicko',
    godisteOd: 123,
    godisteDo: 124,
    zapreminaOd: 125,
    zapreminaDo: 125,
    snagaOd: 124,
    snagaDo: 12154,
    brSedistaOd: 124,
    brSedistaDo: 15451,
    nosivostOd: 1,
    nosivostDo: 12,
    cena: 1255,
    komentar: 'koment',
    izuzetak: 'izuzetak',
    isDefault: true,
  });
};

module.exports = {
  taksaAttributes,
  create,
};
