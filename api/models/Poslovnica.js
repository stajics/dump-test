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

    users: {
      collection: 'user',
      via: 'poslovnica'
    },

    //TODO opstina

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },

};
