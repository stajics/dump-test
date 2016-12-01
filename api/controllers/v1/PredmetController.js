import { omit, isObject } from 'lodash';

module.exports = {

  create: async (req, res) => {
    let newLiceKorisnik = null;
    let newLiceVlasnik = null;
    let newVozilo = null;
    let newPredmet = null;
    try {
      const values = omit(req.allParams(), ['id']);

      if (isObject(values.liceKorisnik)) {
        const liceKorisnikValues = omit(values.liceKorisnik, ['id']);  // create liceKorisnik
        liceKorisnikValues.poslovnica = req.user.poslovnica.id;
        newLiceKorisnik = await Lice.create(liceKorisnikValues);
      }

      if (isObject(values.liceVlasnik)) {
        if (values.liceVlasnik.maticniBroj !== values.liceKorisnik.maticniBroj && values.liceVlasnik.licnaKarta !== values.liceKorisnik.licnaKarta) {
          const liceVlasnikValues = omit(values.liceVlasnik, ['id']);  // create liceVlasnik
          liceVlasnikValues.poslovnica = req.user.poslovnica.id;
          newLiceVlasnik = await Lice.create(liceVlasnikValues);
        } else {
          values.liceVlasnik = newLiceKorisnik.id;
        }
      }

      if (isObject(values.vozilo)) {
        const voziloValues = omit(values.vozilo, ['id']);  // create vozilo
        voziloValues.lice = newLiceKorisnik ? newLiceKorisnik.id : values.liceKorisnik;
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
      values.liceKorisnik = newLiceKorisnik ? newLiceKorisnik.id : values.liceKorisnik;
      values.liceVlasnik = newLiceVlasnik ? newLiceVlasnik.id : values.liceVlasnik;
      values.vozilo = newVozilo ? newVozilo.id : values.vozilo;
      values.poslovnica = req.user.poslovnica.id;
      values.user = req.user.id;
      values.cena = cena;
      values.dug = cena;
      values.takse = values.takse.map(taksa => taksa.taksa);
      values.stavkeOsiguranja = values.stavkeOsiguranja.map(stavka => stavka.stavkaOsiguranja);
      values.usluge = values.usluge.map(usluga => usluga.usluga);
      newPredmet = await Predmet.create(values);

      let updateJoinTables = [];
      updateJoinTables = takseObjects.map(taksa => PredmetTaksa.update({ predmet: newPredmet.id, taksa: taksa.taksa }, { cena: taksa.cena, dug: taksa.cena, iznos: taksa.iznos }));
      updateJoinTables = [...updateJoinTables, ...stavkeOsiguranjaObjects.map(stavka => PredmetStavka.update({ predmet: newPredmet.id, stavkaOsiguranja: stavka.stavkaOsiguranja }, { cena: stavka.cena, dug: stavka.cena, iznos: stavka.iznos }))];  // eslint-disable-line
      updateJoinTables = [...updateJoinTables, ...uslugeObjects.map(usluga => PredmetUsluga.update({ predmet: newPredmet.id, usluga: usluga.usluga }, { cena: usluga.cena, dug: usluga.cena, iznos: usluga.iznos }))];  // eslint-disable-line
      await Promise.all(updateJoinTables);

      newPredmet = Object.assign({}, newPredmet);
      newPredmet.takse = await PredmetTaksa.find({ predmet: newPredmet.id }).populateAll(); // populate new predmet correctly
      newPredmet.usluge = await PredmetUsluga.find({ predmet: newPredmet.id }).populateAll();
      newPredmet.stavkeOsiguranja = await PredmetStavka.find({ predmet: newPredmet.id }).populateAll();

      res.created({ predmet: newPredmet, vozilo: newVozilo || values.vozilo, liceKorisnik: newLiceKorisnik || values.liceKorisnik, liceVlasnik: newLiceVlasnik || values.liceVlasnik });
    } catch (err) {
      if (newLiceKorisnik) await Lice.destroy({ id: newLiceKorisnik.id });
      if (newLiceVlasnik) await Lice.destroy({ id: newLiceVlasnik.id });
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


  predmetTakse: async (req, res) => {
    const pt = await PredmetTaksa.findOne({ id: req.params.id });
    res.ok({ predmetTaksa: pt });
  },

  predmetStavke: async (req, res) => {
    const ps = await PredmetStavka.findOne({ id: req.params.id });
    res.ok({ predmetStavka: ps });
  },

  predmetUsluge: async (req, res) => {
    const pu = await PredmetUsluga.findOne({ id: req.params.id });
    res.ok({ predmetUsluga: pu });
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
