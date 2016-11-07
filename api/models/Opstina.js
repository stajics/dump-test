"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true
    },

    poslovnice: {
      collection: 'poslovnica',
      via: 'opstina'
    },


    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },

};
