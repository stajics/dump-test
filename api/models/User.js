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
      required: true
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    rola: {
      type: 'string',
      enum: ['super_user', 'menadzer', 'korisnik'],
      defaultsTo: 'korisnik'
    },

    poslovnica: {
      model: 'poslovnica',
      required: false
    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },

  beforeCreate(values, next) {
    if (!values.hasOwnProperty('password')) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    next();
  },

  beforeUpdate(values, next) {
    if (!values.hasOwnProperty('password')) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    next();
  }
};
