//***********************************************************
//*********models/Lice.js
//********************************************************
// Lice, lice, Lica, lica
// Add Lice to globals in eslint
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
//*********controllers/LiceController.js
//********************************************************

import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newLice = await Lice.create(values);
      res.created({ lice: newLice });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let lica = null;
      if (req.params.id) {
        lica = await Lice.findOne({ id: req.params.id });
        res.ok({ lice: lica });
      } else {
        lica = await Lice.find();
        res.ok({ lice: lica });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedLice = await Lice.update({ id: req.params.id }, values);
      if (isEmpty(updatedLice)) {
        return res.notFound('No lice with that ID.');
      }
      return res.ok({ lice: updatedLice[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const liceForDelete = await Lice.destroy({ id: req.params.id });
      if (isEmpty(liceForDelete)) {
        return res.notFound('No lice with that ID.');
      }
      return res.ok({ lice: liceForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};



//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/lica': 'v1/LiceController.read',
'GET /v1/lica/:id': 'v1/LiceController.read',
'POST /v1/lica': 'v1/LiceController.create',
'PUT /v1/lica/:id': 'v1/LiceController.update',
'DELETE /v1/lica/:id': 'v1/LiceController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
'v1/LiceController': {
  create: ['isAuthenticated', 'isSuperUser'],
  read: ['isAuthenticated', 'isSuperUser'],
  update: ['isAuthenticated', 'isSuperUser'],
  delete: ['isAuthenticated', 'isSuperUser'],
},

//***********************************************************
//*********test/factories/LiceFactory.js
//********************************************************
const _ = require('lodash');

const liceAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Lice.create({
    name: `name${randomNumber}`,
  });
};

module.exports = {
  liceAttributes,
  create,
};

//***********************************************************
//*********test/integration/controllers/LiceController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const liceFactory = require('../../factories/LiceFactory');

describe('controllers:LiceController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingLice = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      liceFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingLice = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new lice.', (done) => {
      request.post(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          name: 'name'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
          res.body.data.lice.name.should.equal('name');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/lica`)
        .send({
          name: 'name'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not super_user).', (done) => {
      request.post(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          name: 'name'
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });


    it('Should get error (missing parameter).', (done) => {
      request.post(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({})
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (missing body).', (done) => {
      request.post(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });

  describe(':read', () => {
    it('Should list lica.', (done) => {
      request.get(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('lica');
          res.body.data.lica.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 lice.', (done) => {
      request.get(`v1/lica/${existingLice.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('lice');
          res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/lica`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.get(`v1/lica`)
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':update', () => {
    it('Should update lice.', (done) => {
      request.put(`v1/lica/${existingLice.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          name: "updatedIme"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('lice');
          res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
          res.body.data.lice.name.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/lica/${existingLice.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send({
          name: "updatedIme"
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/lica/${existingUser1.id}`)
        .send({
          name: "updatedIme"
        })
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':delete', () => {
    it('Should delete lice.', (done) => {
      request.delete(`v1/lica/${existingLice.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('lice');
          res.body.data.lice.should.have.all.keys(liceFactory.liceAttributes);
          done();
        });
    });

    it('Should get error. (lice does not exist)', (done) => {
      request.delete(`v1/lica/${existingLice.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(404)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (lice does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/lica/string`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.delete(`v1/lica/${existingUser.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/lica/${existingUser1.id}`)
        .send()
        .expect(401)
        .end(function(err, res) {
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
#######LICE
  /lica:
    get:
      security:
        - Bearer: []
      tags:
        - Lice
      summary: Get all lica.
      description: "Requires logged in user to be super_user."
      operationId: getLica
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All lica.
          schema:
            $ref: "#/definitions/LiceResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Lice
      summary: Add new lice.
      description: "Requires logged in user to be super_user."
      operationId: createLice
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Lice object that needs to be added to the lica.
          required: true
          schema:
            $ref: "#/definitions/PostLicaBody"
      responses:
        "201":
          description: Lice created.
          schema:
            $ref: "#/definitions/LicaResponse"
  /lica/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Lice
      summary: Get lice.
      description: "Requires logged in user to be super_user."
      operationId: getLice
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the lice
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/LicaResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Lice
      summary: Update lice.
      description: "Requires logged in user to be super_user."
      operationId: updateLice
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the lice that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutLicaBody"
      responses:
        "200":
          description: Lice updated.
          schema:
            $ref: "#/definitions/LicaResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Lice
      summary: Delete lice.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the lice that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Lice deleted.
          schema:
            $ref: "#/definitions/LicaResponse"

//#####################################################
//definitions: models
Lice:
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
#Lice
PostLicaBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutLicaBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Lice
  LiceResponse:
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
          - lica
        properties:
          lica:
            type: 'array'
            items:
              $ref: "#/definitions/Lice"

  LicaResponse:
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
          - lice
        properties:
          lice:
            $ref: "#/definitions/Lice"
