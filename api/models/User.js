module.exports = {
  schema: true,

  attributes: {
    ime: {
      type: 'string',
      required: true,
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'email',
      unique: true,
    },

    telefon: {
      type: 'string',
    },

    rola: {
      type: 'string',
      enum: ['super_user', 'menadzer', 'korisnik'],
      defaultsTo: 'korisnik',
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    predmeti: {
      collection: 'predmet',
      via: 'user',
    },

    toJSON() {
      const obj = this.toObject();

      delete obj.password;

      return obj;
    },
  },

  /* eslint no-param-reassign: 'off'*/
  beforeCreate(values, next) {
    if (!values.password) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    return next();
  },

  beforeUpdate(values, next) {
    if (!values.password) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    return next();
  },
};
