module.exports = {
  schema: true,

  attributes: {
    takse: {
      collection: 'taksa',
      via: 'nazivTakse',
    },

    naziv: {
      type: 'string',
      required: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};
