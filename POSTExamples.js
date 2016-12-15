/* eslint-disable */
const POSTPredmeti = {
  "tipPredmeta": 1,
  "provizija": 1,
  "vozilo": {
    "vrstaVozila": "putnicko",
    "registarskiBr": "123ad",
    "brMotora": "123"
  },
  "liceKorisnik": {
    "ime": "ime",
     "prezime": "prezime",
     "adresa": "adresa",
     "maticniBroj": "111123222344",
     "licnaKarta": "5213132342",
     "tip": "tip"
   },
"liceVlasnik": {
    "ime": "ime",
     "prezime": "prezime",
     "adresa": "adresa",
     "maticniBroj": "11112322222344",
     "licnaKarta": "52131322342",
     "tip": "tip"
   },
   "takse": [{"taksa": 1, "cena": 100}],
   "usluge": [{"usluga": 1, "cena": 100}],
   "stavkeOsiguranja": [{"stavkaOsiguranja": 1, "cena":100}]
};

const POSTUplate = {
 "predmet": 6,
 "iznos": 100,
};

const POSTUslugeUplate = {
 "usluga": 6,
 "iznos": 100,
};

// const POSTUplate = {
//  "predmet": 6,
//  "predmetTakse": [
//   {
//    "id": 1,
//    "iznos": 10
//   }
//  ],
//  "predmetStavkeOsiguranja": [
//   {
//    "id": 1,
//    "iznos": 10
//   }
//  ],
//  "predmetUsluge": [
//   {
//    "id": 1,
//    "iznos": 20
//   }
//  ]
// };
