export const constructFilterStavkeOsiguranjaQuery = (params) => {
  if(params.vrstaVozila && params.osiguranje) {
    let stavkeOsiguranjaQuery = {
      osiguranje: params.osiguranje,
      vrstaVozila: params.vrstaVozila,
      kwOd: null,
      kwDo: null,
      ccmOd: null,
      ccmDo: null,
      brMestaOd: null,
      brMestaDo: null,
      brSedistaDo: null,
      nosivostOd: null,
      nosivostDo: null
    };

    let stavkeOsiguranjaQueryArray = [];

    if(params.kw) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}));
    }
    if(params.ccm) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}));
    }
    if(params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}));
    }
    if(params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }

    if(params.kw && params.ccm) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}));
    }
    if(params.kw && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}));
    }
    if(params.kw && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    if(params.ccm && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>=': params.ccm }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}));
    }
    if(params.ccm && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>=': params.ccm }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    if(params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { brMestaOd: { '<=': params.brMesta }, brMestaDo: { '>=': params.brMesta }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }

    if(params.kw && params.ccm && params.brMesta) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}));
    }
    if(params.kw && params.ccm && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    if(params.kw && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    if(params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { ccmOd: { '<=': params.ccm }, ccmDo: { '>=': params.ccm }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }

    if(params.kw && params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    if(params.kw && params.ccm && params.brMesta && params.nosivost) {
      stavkeOsiguranjaQueryArray.push(Object.assign({}, stavkeOsiguranjaQuery, { kwOd: { '<=': params.kw }, kwDo: { '>=': params.kw }}, {ccmOd: { '<=': params.ccm },ccmDo: { '>=': params.ccm }}, {brMestaOd: { '<=': params.brMesta },brMestaDo: { '>=': params.brMesta }}, {nosivostOd: { '<=': params.nosivost },nosivostDo: { '>=': params.nosivost }}));
    }
    return stavkeOsiguranjaQueryArray;
  } else {
    throw "vrstaVozila and osiguranje required as querry param.";
  }
};
