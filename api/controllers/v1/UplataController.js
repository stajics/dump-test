import { omit, find } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);

      values.predmetTakse = values.predmetTakse || [];
      values.predmetStavkeOsiguranja = values.predmetStavkeOsiguranja || [];
      values.predmetUsluge = values.predmetUsluge || [];
      const predmetTakseObjects = [...values.predmetTakse]; // create predmet
      const predmetStavkeOsiguranjaObjects = [...values.predmetStavkeOsiguranja];
      const predmetUslugeObjects = [...values.predmetUsluge];
      let iznos = 0;
      predmetTakseObjects.forEach((predmetTaksa) => {
        iznos += predmetTaksa.iznos;
      });
      predmetStavkeOsiguranjaObjects.forEach((predmetStavka) => {
        iznos += predmetStavka.iznos;
      });
      predmetUslugeObjects.forEach((predmetUsluga) => {
        iznos += predmetUsluga.iznos;
      });
      values.predmetTakse = values.predmetTakse.map(predmetTaksa => predmetTaksa.id);
      values.predmetStavkeOsiguranja = values.predmetStavkeOsiguranja.map(predmetStavka => predmetStavka.id);
      values.predmetUsluge = values.predmetUsluge.map(predmetUsluga => predmetUsluga.id);
      values.poslovnica = req.user.poslovnica.id;
      values.user = req.user.id;
      values.iznos = iznos;
      const newUplata = await Uplata.create(values);

      let updateUplataJoinTables = []; // update Uplata join tables
      updateUplataJoinTables = predmetTakseObjects.map(predmetTaksa => UplataPredmetTaksa.update({ uplata: newUplata.id, predmetTaksa: predmetTaksa.id }, { iznos: predmetTaksa.iznos }));
      updateUplataJoinTables = [...updateUplataJoinTables, ...predmetStavkeOsiguranjaObjects.map(predmetStavkaOsiguranja => UplataPredmetStavka.update({ uplata: newUplata.id, predmetStavkaOsiguranja: predmetStavkaOsiguranja.id }, { iznos: predmetStavkaOsiguranja.iznos }))]; // eslint-disable-line
      updateUplataJoinTables = [...updateUplataJoinTables, ...predmetUslugeObjects.map(predmetUsluga => UplataPredmetUsluga.update({ uplata: newUplata.id, predmetUsluga: predmetUsluga.id }, { cena: predmetUsluga.cena }))]; // eslint-disable-line
      await Promise.all(updateUplataJoinTables);

      const predmetTakse = await PredmetTaksa.find({ id: values.predmetTakse }); // update Predmet join tables
      const predmetStavke = await PredmetStavka.find({ id: values.predmetStavkeOsiguranja });
      const predmetUsluge = await PredmetUsluga.find({ id: values.predmetUsluge });
      let updateJoinTables = [];
      updateJoinTables = predmetTakseObjects.map(predmetTaksa => PredmetTaksa.update({ id: predmetTaksa.id }, { dug: find(predmetTakse, pt => pt.id === predmetTaksa.id).dug - predmetTaksa.iznos }));
      updateJoinTables = [...updateJoinTables, ...predmetStavkeOsiguranjaObjects.map(predmetStavka => PredmetStavka.update({ id: predmetStavka.id }, { dug: find(predmetStavke, ps => ps.id === predmetStavka.id).dug - predmetStavka.iznos }))]; // eslint-disable-line
      updateJoinTables = [...updateJoinTables, ...predmetUslugeObjects.map(predmentUsluga => PredmetUsluga.update({ id: predmentUsluga.id }, { dug: find(predmetUsluge, pu => pu.id === predmentUsluga.id).dug - predmentUsluga.iznos }))]; // eslint-disable-line
      await Promise.all(updateJoinTables);

      const predmet = await Predmet.findOne({ id: values.predmet });
      await Predmet.update({ id: values.predmet }, { dug: predmet.dug - iznos });


      res.created({ uplata: newUplata });
    } catch (err) {
      res.badRequest(err);
    }
  },

};
