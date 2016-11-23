/* eslint max-len: 'off', no-throw-literal: "off" */
export const constructFilterTakseQuery = (params) => {
  if (params.vrstaVozila) {
    const opstinaTakseQuery = {
      opstina: params.opstina,
      vrstaVozila: params.vrstaVozila,
      godisteOd: null,
      godisteDo: null,
      zapreminaOd: null,
      zapreminaDo: null,
      snagaOd: null,
      snagaDo: null,
      brSedistaOd: null,
      brSedistaDo: null,
      nosivostOd: null,
      nosivostDo: null,
      izuzetak: params.izuzetak || null,
      isDefault: true,
    };
    const republickeTakseQuery = {
      opstina: null,
      vrstaVozila: params.vrstaVozila,
      godisteOd: null,
      godisteDo: null,
      zapreminaOd: null,
      zapreminaDo: null,
      snagaOd: null,
      snagaDo: null,
      brSedistaOd: null,
      brSedistaDo: null,
      nosivostOd: null,
      nosivostDo: null,
      izuzetak: params.izuzetak || null,
      isDefault: true,
    };

    const opstinaTakseQueryArray = [];
    const republickeTakseQueryArray = [republickeTakseQuery];

    if (params.godiste) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }));
    }
    if (params.zapremina) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }));
    }
    if (params.snaga) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
    }
    if (params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.godiste && params.zapremina) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }));
    }
    if (params.godiste && params.snaga) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
    }
    if (params.godiste && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.godiste && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.zapremina && params.snaga) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
    }
    if (params.zapremina && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.zapremina && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.snaga && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.snaga && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.godiste && params.zapremina && params.snaga) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }));
    }
    if (params.godiste && params.zapremina && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.godiste && params.zapremina && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.godiste && params.snaga && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.godiste && params.snaga && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.godiste && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.zapremina && params.snaga && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.zapremina && params.snaga && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.zapremina && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.snaga && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.godiste && params.zapremina && params.snaga && params.brSedista) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }));
    }
    if (params.godiste && params.zapremina && params.snaga && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.godiste && params.snaga && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.godiste && params.zapremina && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.godiste && params.zapremina && params.snaga && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.zapremina && params.snaga && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.godiste && params.zapremina && params.snaga && params.brSedista && params.nosivost) {
      opstinaTakseQueryArray.push(Object.assign({}, opstinaTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
      republickeTakseQueryArray.push(Object.assign({}, republickeTakseQuery, { godisteOd: { '<=': params.godiste }, godisteDo: { '>': params.godiste } }, { zapreminaOd: { '<=': params.zapremina }, zapreminaDo: { '>': params.zapremina } }, { snagaOd: { '<=': params.snaga }, snagaDo: { '>': params.snaga } }, { brSedistaOd: { '<=': params.brSedista }, brSedistaDo: { '>': params.brSedista } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    return [...opstinaTakseQueryArray, ...republickeTakseQueryArray, Object.assign({}, republickeTakseQuery, { vrstaVozila: null })];
  }
  throw 'vrstaVozila required as querry param.';
};

export const constructFilterStavkeOsiguranjaQuery = (params) => {
  if (params.vrstaVozila && params.osiguranje) {
    const stavkeOsiguranjaQuery = {
      osiguranje: params.osiguranje,
      vrstaVozila: params.vrstaVozila,
      kwOd: null,
      kwDo: null,
      ccmOd: null,
      ccmDo: null,
      brMestaOd: null,
      brMestaDo: null,
      nosivostOd: null,
      nosivostDo: null,
      popust: null,
      izuzetak: params.izuzetak || null,
    };

    const stavkeOsiguranjaQueryArray = [];

    if (params.kw) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }));
    }
    if (params.ccm) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }));
    }
    if (params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }));
    }
    if (params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.kw && params.ccm) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }));
    }
    if (params.kw && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }));
    }
    if (params.kw && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.ccm && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }));
    }
    if (params.ccm && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.kw && params.ccm && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }));
    }
    if (params.kw && params.ccm && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.kw && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }

    if (params.kw && params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    if (params.kw && params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>': params.kw } }, { ccmOd: { '<=': params.ccm }, ccmDo: { '>': params.ccm } }, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>': params.brMesta } }, { nosivostOd: { '<=': params.nosivost }, nosivostDo: { '>': params.nosivost } }));
    }
    return stavkeOsiguranjaQueryArray;
  }
  throw 'vrstaVozila and osiguranje required as querry param.';
};
