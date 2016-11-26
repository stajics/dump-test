import { omit, isInteger } from 'lodash';

module.exports = {

  create: async (req, res) => {
    let newLice = null;
    let newVozilo = null;
    let newPredmet = null;
    try {
      const values = omit(req.allParams(), ['id']);

      if (!isInteger(values.lice)) {
        const liceValues = omit(values.lice, ['id']);  // create lice
        liceValues.poslovnica = req.user.poslovnica.id;
        newLice = await Lice.create(liceValues);
      }

      if (!isInteger(values.vozilo)) {
        const voziloValues = omit(values.vozilo, ['id']);  // create vozilo
        voziloValues.lice = newLice ? newLice.id : values.lice;
        voziloValues.poslovnica = req.user.poslovnica.id;
        newVozilo = await Vozilo.create(voziloValues);
      }

      values.takse = values.takse || [];
      values.stavkeOsiguranja = values.stavkeOsiguranja || [];
      values.usluge = values.usluge || [];
      const takseObjects = [...values.takse]; // create predmet
      const stavkeOsiguranjaObjects = [...values.stavkeOsiguranja];
      const uslugeObjects = [...values.usluge];
      let cena = 0;
      takseObjects.forEach((taksa) => {
        cena += taksa.cena;
      });
      stavkeOsiguranjaObjects.forEach((stavka) => {
        cena += stavka.cena;
      });
      uslugeObjects.forEach((usluga) => {
        cena += usluga.cena;
      });
      values.lice = newLice ? newLice.id : values.lice;
      values.vozilo = newVozilo ? newVozilo.id : values.vozilo;
      values.poslovnica = req.user.poslovnica.id;
      values.user = req.user.id;
      values.cena = cena;
      values.dug = cena;
      values.takse = values.takse.map(taksa => taksa.id);
      values.stavkeOsiguranja = values.stavkeOsiguranja.map(stavka => stavka.id);
      values.usluge = values.usluge.map(usluga => usluga.id);
      newPredmet = await Predmet.create(values);

      let updateJoinTables = [];
      updateJoinTables = takseObjects.map(taksa => PredmetTaksa.update({ predmet: newPredmet.id, taksa: taksa.id }, { cena: taksa.cena, dug: taksa.cena }));
      updateJoinTables = [...updateJoinTables, ...stavkeOsiguranjaObjects.map(stavka => PredmetStavka.update({ predmet: newPredmet.id, stavkaOsiguranja: stavka.id }, { cena: stavka.cena, dug: stavka.cena }))]; // eslint-disable-line
      updateJoinTables = [...updateJoinTables, ...uslugeObjects.map(usluga => PredmetUsluga.update({ predmet: newPredmet.id, usluga: usluga.id }, { cena: usluga.cena, dug: usluga.cena }))];
      await Promise.all(updateJoinTables);

      res.created({ predmet: newPredmet, vozilo: newVozilo, lice: newLice });
    } catch (err) {
      if (newLice) await Lice.destroy({ id: newLice.id });
      if (newVozilo) await Vozilo.destroy({ id: newVozilo.id });
      if (newPredmet) {
        await PredmetTaksa.destroy({ predmet: newPredmet.id });
        await PredmetStavka.destroy({ predmet: newPredmet.id });
        await PredmetUsluga.destroy({ predmet: newPredmet.id });
        await Predmet.destroy({ id: newPredmet.id });
      }
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let predmeti = null;
      if (req.params.id) {
        predmeti = await Predmet.findOne({ id: req.params.id, poslovnica: req.user.poslovnica.id }).populateAll();
        predmeti.takse = await PredmetTaksa.find({ predmet: predmeti.id }).populateAll();
        predmeti.usluge = await PredmetUsluga.find({ predmet: predmeti.id }).populateAll();
        predmeti.stavkeOsiguranja = await PredmetStavka.find({ predmet: predmeti.id }).populateAll();
        res.ok({ predmet: predmeti });
      } else {
        predmeti = await Predmet.find({ poslovnica: req.user.poslovnica.id }).populateAll();
        let forPopulate = predmeti.map(predmet =>
          Promise.all([
            PredmetTaksa.find({ predmet: predmet.id }).populateAll(),
            PredmetUsluga.find({ predmet: predmet.id }).populateAll(),
            PredmetStavka.find({ predmet: predmet.id }).populateAll(),
          ]),
        );
        forPopulate = await Promise.all(forPopulate);
        forPopulate.forEach((value, index) => {
          predmeti[index].takse = value[0];
          predmeti[index].usluge = value[1];
          predmeti[index].stavkeOsiguranja = value[2];
        });
        res.ok({ predmet: predmeti });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  // update: async (req, res) => {
  //   try {
  //     const values = omit(req.allParams(), ['id']);
  //     const updatedPredmet = await Predmet.update({ id: req.params.id, poslovnica: req.user.poslovnica.id }, values);
  //     if (isEmpty(updatedPredmet)) {
  //       return res.notFound('No predmet with that ID.');
  //     }
  //     return res.ok({ predmet: updatedPredmet[0] });
  //   } catch (err) {
  //     return res.badRequest(err);
  //   }
  // },
  //
  // delete: async (req, res) => {
  //   try {
  //     const predmetForDelete = await Predmet.destroy({ id: req.params.id, poslovnica: req.user.poslovnica.id });
  //     if (isEmpty(predmetForDelete)) {
  //       return res.notFound('No predmet with that ID.');
  //     }
  //     return res.ok({ predmet: predmetForDelete[0] });
  //   } catch (err) {
  //     return res.badRequest(err);
  //   }
  // },

};
