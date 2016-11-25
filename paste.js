//***********************************************************
//*********models/Predmet.js
//********************************************************
// Predmet, predmet, Predmeti, predmeti
// Add Predmet to globals in eslint
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
//*********controllers/PredmetController.js
//********************************************************

import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newPredmet = await Predmet.create(values);
      res.created({ predmet: newPredmet });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let predmeti = null;
      if (req.params.id) {
        predmeti = await Predmet.findOne({ id: req.params.id });
        res.ok({ predmet: predmeti });
      } else {
        predmeti = await Predmet.find();
        res.ok({ predmet: predmeti });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedPredmet = await Predmet.update({ id: req.params.id }, values);
      if (isEmpty(updatedPredmet)) {
        return res.notFound('No predmet with that ID.');
      }
      return res.ok({ predmet: updatedPredmet[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const predmetForDelete = await Predmet.destroy({ id: req.params.id });
      if (isEmpty(predmetForDelete)) {
        return res.notFound('No predmet with that ID.');
      }
      return res.ok({ predmet: predmetForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};



//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/predmeti': 'v1/PredmetController.read',
'GET /v1/predmeti/:id': 'v1/PredmetController.read',
'POST /v1/predmeti': 'v1/PredmetController.create',
'PUT /v1/predmeti/:id': 'v1/PredmetController.update',
'DELETE /v1/predmeti/:id': 'v1/PredmetController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
'v1/PredmetController': {
  create: ['isAuthenticated', 'isSuperUser'],
  read: ['isAuthenticated', 'isSuperUser'],
  update: ['isAuthenticated', 'isSuperUser'],
  delete: ['isAuthenticated', 'isSuperUser'],
},

//***********************************************************
//*********test/factories/PredmetFactory.js
//********************************************************
const _ = require('lodash');

const predmetAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Predmet.create({
    name: `name${randomNumber}`,
  });
};

module.exports = {
  predmetAttributes,
  create,
};

//***********************************************************
//*********test/integration/controllers/PredmetController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const predmetFactory = require('../../factories/PredmetFactory');

describe('controllers:PredmetController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingPredmet = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      predmetFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingPredmet = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new predmet.', (done) => {
      request.post('v1/predmeti').set({
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
        res.body.data.predmet.should.have.all.keys(predmetFactory.predmetAttributes);
        res.body.data.predmet.name.should.equal('name');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/predmeti')
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
      request.post('v1/predmeti').set({
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
      request.post('v1/predmeti').set({
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
      request.post('v1/predmeti').set({
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
    it('Should list predmeti.', (done) => {
      request.get('v1/predmeti').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('predmeti');
        res.body.data.predmeti.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 predmet.', (done) => {
      request.get(`v1/predmeti/${existingPredmet.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('predmet');
        res.body.data.predmet.should.have.all.keys(predmetFactory.predmetAttributes);
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get('v1/predmeti').set({
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
      request.get('v1/predmeti')
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
    it('Should update predmet.', (done) => {
      request.put(`v1/predmeti/${existingPredmet.id}`).set({
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
        res.body.data.should.have.all.keys('predmet');
        res.body.data.predmet.should.have.all.keys(predmetFactory.predmetAttributes);
        res.body.data.predmet.name.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/predmeti/${existingPredmet.id}`).set({
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
      request.put(`v1/predmeti/${existingUser1.id}`)
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
    it('Should delete predmet.', (done) => {
      request.delete(`v1/predmeti/${existingPredmet.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('predmet');
        res.body.data.predmet.should.have.all.keys(predmetFactory.predmetAttributes);
        done();
      });
    });

    it('Should get error. (predmet does not exist)', (done) => {
      request.delete(`v1/predmeti/${existingPredmet.id}`).set({
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

    it('Should get error. (predmet does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/predmeti/string').set({
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
      request.delete(`v1/predmeti/${existingUser.id}`).set({
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
      request.delete(`v1/predmeti/${existingUser1.id}`)
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
#######PREDMET
  /predmeti:
    get:
      security:
        - Bearer: []
      tags:
        - Predmet
      summary: Get all predmeti.
      description: "Requires logged in user to be super_user."
      operationId: getPredmeti
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All predmeti.
          schema:
            $ref: "#/definitions/PredmetResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Predmet
      summary: Add new predmet.
      description: "Requires logged in user to be super_user."
      operationId: createPredmet
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Predmet object that needs to be added to the predmeti.
          required: true
          schema:
            $ref: "#/definitions/PostPredmetiBody"
      responses:
        "201":
          description: Predmet created.
          schema:
            $ref: "#/definitions/PredmetiResponse"
  /predmeti/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Predmet
      summary: Get predmet.
      description: "Requires logged in user to be super_user."
      operationId: getPredmet
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the predmet
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/PredmetiResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Predmet
      summary: Update predmet.
      description: "Requires logged in user to be super_user."
      operationId: updatePredmet
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the predmet that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutPredmetiBody"
      responses:
        "200":
          description: Predmet updated.
          schema:
            $ref: "#/definitions/PredmetiResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Predmet
      summary: Delete predmet.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the predmet that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Predmet deleted.
          schema:
            $ref: "#/definitions/PredmetiResponse"

//#####################################################
//definitions: models
Predmet:
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
#Predmet
PostPredmetiBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutPredmetiBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Predmet
  PredmetResponse:
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
          - predmeti
        properties:
          predmeti:
            type: 'array'
            items:
              $ref: "#/definitions/Predmet"

  PredmetiResponse:
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
          - predmet
        properties:
          predmet:
            $ref: "#/definitions/Predmet"
