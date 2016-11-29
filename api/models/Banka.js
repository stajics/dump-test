module.exports = {
  schema: true,

  attributes: {
    naziv: {
      type: 'string',
      required: true,
    },

    provizija: {
      type: 'float',
      required: true,
    },

    poslovnica: {
      model: 'poslovnica',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
