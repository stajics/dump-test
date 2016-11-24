const _ = require('lodash');
// eslint-disable-next-line
const liceAttributes = ['id', 'tip', 'nazivFirme', 'ime', 'prezime', 'adresa', 'maticniBroj', 'licnaKarta', 'pib', 'ziroRacun', 'telFiksni', 'telMobilni', 'kontakt', 'email', 'poslovnica', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Lice.create({
    tip: 'tip',
    nazivFirme: 'nazivFirme',
    ime: `ime${randomNumber}`,
    prezime: 'prezime',
    adresa: 'adresa',
    maticniBroj: 'maticniBroj',
    licnaKarta: 'licnaKarta',
    pib: 'pib',
    ziroRacun: 'ziroRacun',
    telFiksni: 'telFiksni',
    telMobilni: 'telMobilni',
    kontakt: 'kontakt',
    email: 'email',
    poslovnica: values.poslovnica || 1,
  });
};

module.exports = {
  liceAttributes,
  create,
};
