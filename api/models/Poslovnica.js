"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    ime: {
      type: 'string',
      required: true,
      alphanumericdashed: true
    },
    
    adresa: {
      type: 'string'
    },

    pib: {
      type: 'string'
    },

    matBr: {
      type: 'string'
    },

    ziro: {
      type: 'string'
    },

    telefon: {
      type: 'string'
    },

    email: {
      type: 'email'
    },

    users: {
      collection: 'user',
      via: 'poslovnica'
    },

    opstina: {
      model: 'opstina',
      required: true
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },

};
