//***********************************************************
//*********models/Vozilo.js
//********************************************************
// Vozilo, vozilo, Vozila, vozila
// Add Vozilo to globals in eslint
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
//*********controllers/VoziloController.js
//********************************************************

import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newVozilo = await Vozilo.create(values);
      res.created({ vozilo: newVozilo });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let vozila = null;
      if (req.params.id) {
        vozila = await Vozilo.findOne({ id: req.params.id });
        res.ok({ vozilo: vozila });
      } else {
        vozila = await Vozilo.find();
        res.ok({ vozilo: vozila });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedVozilo = await Vozilo.update({ id: req.params.id }, values);
      if (isEmpty(updatedVozilo)) {
        return res.notFound('No vozilo with that ID.');
      }
      return res.ok({ vozilo: updatedVozilo[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const voziloForDelete = await Vozilo.destroy({ id: req.params.id });
      if (isEmpty(voziloForDelete)) {
        return res.notFound('No vozilo with that ID.');
      }
      return res.ok({ vozilo: voziloForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};



//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/vozila': 'v1/VoziloController.read',
'GET /v1/vozila/:id': 'v1/VoziloController.read',
'POST /v1/vozila': 'v1/VoziloController.create',
'PUT /v1/vozila/:id': 'v1/VoziloController.update',
'DELETE /v1/vozila/:id': 'v1/VoziloController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
'v1/VoziloController': {
  create: ['isAuthenticated', 'isSuperUser'],
  read: ['isAuthenticated', 'isSuperUser'],
  update: ['isAuthenticated', 'isSuperUser'],
  delete: ['isAuthenticated', 'isSuperUser'],
},

//***********************************************************
//*********test/factories/VoziloFactory.js
//********************************************************
const _ = require('lodash');

const voziloAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Vozilo.create({
    name: `name${randomNumber}`,
  });
};

module.exports = {
  voziloAttributes,
  create,
};

//***********************************************************
//*********test/integration/controllers/VoziloController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const voziloFactory = require('../../factories/VoziloFactory');

describe('controllers:VoziloController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingVozilo = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      voziloFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingVozilo = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new vozilo.', (done) => {
      request.post('v1/vozila').set({
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
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        res.body.data.vozilo.name.should.equal('name');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/vozila')
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
      request.post('v1/vozila').set({
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
      request.post('v1/vozila').set({
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
      request.post('v1/vozila').set({
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
    it('Should list vozila.', (done) => {
      request.get('v1/vozila').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozila');
        res.body.data.vozila.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 vozilo.', (done) => {
      request.get(`v1/vozila/${existingVozilo.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get('v1/vozila').set({
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
      request.get('v1/vozila')
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
    it('Should update vozilo.', (done) => {
      request.put(`v1/vozila/${existingVozilo.id}`).set({
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
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        res.body.data.vozilo.name.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/vozila/${existingVozilo.id}`).set({
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
      request.put(`v1/vozila/${existingUser1.id}`)
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
    it('Should delete vozilo.', (done) => {
      request.delete(`v1/vozila/${existingVozilo.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('vozilo');
        res.body.data.vozilo.should.have.all.keys(voziloFactory.voziloAttributes);
        done();
      });
    });

    it('Should get error. (vozilo does not exist)', (done) => {
      request.delete(`v1/vozila/${existingVozilo.id}`).set({
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

    it('Should get error. (vozilo does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/vozila/string').set({
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
      request.delete(`v1/vozila/${existingUser.id}`).set({
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
      request.delete(`v1/vozila/${existingUser1.id}`)
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
#######VOZILO
  /vozila:
    get:
      security:
        - Bearer: []
      tags:
        - Vozilo
      summary: Get all vozila.
      description: "Requires logged in user to be super_user."
      operationId: getVozila
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All vozila.
          schema:
            $ref: "#/definitions/VoziloResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Vozilo
      summary: Add new vozilo.
      description: "Requires logged in user to be super_user."
      operationId: createVozilo
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Vozilo object that needs to be added to the vozila.
          required: true
          schema:
            $ref: "#/definitions/PostVozilaBody"
      responses:
        "201":
          description: Vozilo created.
          schema:
            $ref: "#/definitions/VozilaResponse"
  /vozila/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Vozilo
      summary: Get vozilo.
      description: "Requires logged in user to be super_user."
      operationId: getVozilo
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the vozilo
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/VozilaResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Vozilo
      summary: Update vozilo.
      description: "Requires logged in user to be super_user."
      operationId: updateVozilo
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the vozilo that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutVozilaBody"
      responses:
        "200":
          description: Vozilo updated.
          schema:
            $ref: "#/definitions/VozilaResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Vozilo
      summary: Delete vozilo.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the vozilo that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Vozilo deleted.
          schema:
            $ref: "#/definitions/VozilaResponse"

//#####################################################
//definitions: models
Vozilo:
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
#Vozilo
PostVozilaBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutVozilaBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Vozilo
  VoziloResponse:
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
          - vozila
        properties:
          vozila:
            type: 'array'
            items:
              $ref: "#/definitions/Vozilo"

  VozilaResponse:
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
          - vozilo
        properties:
          vozilo:
            $ref: "#/definitions/Vozilo"
