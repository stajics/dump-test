//***********************************************************
//*********models/TipPredmeta.js
//********************************************************
// TipPredmeta, tipPredmeta, TipoviPredmeta, tipoviPredmeta
// Add TipPredmeta to globals in eslint
module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true,
      alphanumericdashed: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};

//***********************************************************
//*********controllers/TipPredmetaController.js
//********************************************************

import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newTipPredmeta = await TipPredmeta.create(values);
      res.created({ tipPredmeta: newTipPredmeta });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let tipoviPredmeta = null;
      if (req.params.id) {
        tipoviPredmeta = await TipPredmeta.findOne({ id: req.params.id });
        res.ok({ tipPredmeta: tipoviPredmeta });
      } else {
        tipoviPredmeta = await TipPredmeta.find();
        res.ok({ tipPredmeta: tipoviPredmeta });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedTipPredmeta = await TipPredmeta.update({ id: req.params.id }, values);
      if (isEmpty(updatedTipPredmeta)) {
        return res.notFound('No tipPredmeta with that ID.');
      }
      return res.ok({ tipPredmeta: updatedTipPredmeta[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const tipPredmetaForDelete = await TipPredmeta.destroy({ id: req.params.id });
      if (isEmpty(tipPredmetaForDelete)) {
        return res.notFound('No tipPredmeta with that ID.');
      }
      return res.ok({ tipPredmeta: tipPredmetaForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};



//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/tipoviPredmeta': 'v1/TipPredmetaController.read',
'GET /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.read',
'POST /v1/tipoviPredmeta': 'v1/TipPredmetaController.create',
'PUT /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.update',
'DELETE /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
'v1/TipPredmetaController': {
  create: ['isAuthenticated', 'isSuperUser'],
  read: ['isAuthenticated', 'isSuperUser'],
  update: ['isAuthenticated', 'isSuperUser'],
  delete: ['isAuthenticated', 'isSuperUser'],
},

//***********************************************************
//*********test/factories/TipPredmetaFactory.js
//********************************************************
const _ = require('lodash');

const tipPredmetaAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return TipPredmeta.create({
    name: `name${randomNumber}`,
  });
};

module.exports = {
  tipPredmetaAttributes,
  create,
};

//***********************************************************
//*********test/integration/controllers/TipPredmetaController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const tipPredmetaFactory = require('../../factories/TipPredmetaFactory');

describe('controllers:TipPredmetaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingTipPredmeta = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      tipPredmetaFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingTipPredmeta = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new tipPredmeta.', (done) => {
      request.post('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        name: 'name',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        res.body.data.tipPredmeta.name.should.equal('name');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/tipoviPredmeta')
        .send({
          name: 'name',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not super_user).', (done) => {
      request.post('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        name: 'name',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });


    it('Should get error (missing parameter).', (done) => {
      request.post('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing body).', (done) => {
      request.post('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });
  });

  describe(':read', () => {
    it('Should list tipoviPredmeta.', (done) => {
      request.get('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipoviPredmeta');
        res.body.data.tipoviPredmeta.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 tipPredmeta.', (done) => {
      request.get(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get('v1/tipoviPredmeta').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/tipoviPredmeta')
        .send()
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':update', () => {
    it('Should update tipPredmeta.', (done) => {
      request.put(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        name: 'updatedIme',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        res.body.data.tipPredmeta.name.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        name: 'updatedIme',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/tipoviPredmeta/${existingUser1.id}`)
        .send({
          name: 'updatedIme',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':delete', () => {
    it('Should delete tipPredmeta.', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('tipPredmeta');
        res.body.data.tipPredmeta.should.have.all.keys(tipPredmetaFactory.tipPredmetaAttributes);
        done();
      });
    });

    it('Should get error. (tipPredmeta does not exist)', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingTipPredmeta.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (tipPredmeta does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/tipoviPredmeta/string').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingUser.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/tipoviPredmeta/${existingUser1.id}`)
        .send()
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });
});

//#######################################################
//Documentation
//#######################################################
//paths
########################################
#######TIP PREDMETA
  /tipoviPredmeta:
    get:
      security:
        - Bearer: []
      tags:
        - TipPredmeta
      summary: Get all tipoviPredmeta.
      description: "Requires logged in user to be super_user."
      operationId: getTipoviPredmeta
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All tipoviPredmeta.
          schema:
            $ref: "#/definitions/TipPredmetaResponse"
    post:
      security:
        - Bearer: []
      tags:
        - TipPredmeta
      summary: Add new tipPredmeta.
      description: "Requires logged in user to be super_user."
      operationId: createTipPredmeta
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: TipPredmeta object that needs to be added to the tipoviPredmeta.
          required: true
          schema:
            $ref: "#/definitions/PostTipoviPredmetaBody"
      responses:
        "201":
          description: TipPredmeta created.
          schema:
            $ref: "#/definitions/TipoviPredmetaResponse"
  /tipoviPredmeta/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - TipPredmeta
      summary: Get tipPredmeta.
      description: "Requires logged in user to be super_user."
      operationId: getTipPredmeta
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the tipPredmeta
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/TipoviPredmetaResponse"
    put:
      security:
        - Bearer: []
      tags:
        - TipPredmeta
      summary: Update tipPredmeta.
      description: "Requires logged in user to be super_user."
      operationId: updateTipPredmeta
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the tipPredmeta that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutTipoviPredmetaBody"
      responses:
        "200":
          description: TipPredmeta updated.
          schema:
            $ref: "#/definitions/TipoviPredmetaResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - TipPredmeta
      summary: Delete tipPredmeta.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the tipPredmeta that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: TipPredmeta deleted.
          schema:
            $ref: "#/definitions/TipoviPredmetaResponse"

//#####################################################
//definitions: models
TipPredmeta:
  type: object
  required:
    - id
    - name
    - createdAt
    - updatedAt
  properties:
    id:
      type: string
    name:
      type: string
    createdAt:
      type: string
    updatedAt:
      type: string

//#############################################################
//definitions: params

###############
#TipPredmeta
PostTipoviPredmetaBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutTipoviPredmetaBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#TipPredmeta
  TipPredmetaResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - tipoviPredmeta
        properties:
          tipoviPredmeta:
            type: 'array'
            items:
              $ref: "#/definitions/TipPredmeta"

  TipoviPredmetaResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - tipPredmeta
        properties:
          tipPredmeta:
            $ref: "#/definitions/TipPredmeta"
