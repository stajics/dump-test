//***********************************************************
//*********models/Taksa.js
//********************************************************
//Taksa, taksa, Takse, takse
"use strict";

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true,
      alphanumericdashed: true
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  }

};

//***********************************************************
//*********controllers/TaksaController.js
//********************************************************

"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newTaksa = await Taksa.create(values);
      res.created({taksa: newTaksa});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let takse = null;
      if( req.params.id ){
        takse = await Taksa.findOne({id: req.params.id});
        res.ok({ taksa: takse });
        } else {
        takse = await Taksa.find();
        res.ok({ takse });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedTaksa = await Taksa.update({ id: req.params.id }, values);
      if( isEmpty(updatedTaksa) ) {
        return res.notFound("No taksa with that ID.");
      }
      res.ok({taksa: updatedTaksa[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let taksaForDelete = await Taksa.destroy({ id: req.params.id });
        if( isEmpty(taksaForDelete) ) {
          return res.notFound("No taksa with that ID.");
        }
        res.ok({taksa: taksaForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};


//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/takse': 'v1/TaksaController.read',
'GET /v1/takse/:id': 'v1/TaksaController.read',
'POST /v1/takse': 'v1/TaksaController.create',
'PUT /v1/takse/:id': 'v1/TaksaController.update',
'DELETE /v1/takse/:id': 'v1/TaksaController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
"v1/TaksaController": {
  create: ["isAuthenticated", "isSuperUser" ],
  read: ["isAuthenticated", "isSuperUser"],
  update: ["isAuthenticated", "isSuperUser" ],
  delete: ["isAuthenticated", "isSuperUser" ]
},

//***********************************************************
//*********test/factories/TaksaFactory.js
//********************************************************
const _ = require('lodash');

const taksaAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Taksa.create({
    name: `name${randomNumber}`
  });
};

module.exports = {
  taksaAttributes,
  create
};

//***********************************************************
//*********test/integration/controllers/TaksaController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const taksaFactory = require('../../factories/TaksaFactory');

describe('controllers:TaksaController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingTaksa = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      taksaFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingTaksa = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new taksa.', (done) => {
      request.post(`v1/takse`).set({
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
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          res.body.data.taksa.name.should.equal('name');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/takse`)
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
      request.post(`v1/takse`).set({
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
      request.post(`v1/takse`).set({
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
      request.post(`v1/takse`).set({
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
    it('Should list takse.', (done) => {
      request.get(`v1/takse`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('takse');
          res.body.data.takse.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 taksa.', (done) => {
      request.get(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/takse`).set({
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
      request.get(`v1/takse`)
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
    it('Should update taksa.', (done) => {
      request.put(`v1/takse/${existingTaksa.id}`).set({
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
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          res.body.data.taksa.name.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/takse/${existingTaksa.id}`).set({
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
      request.put(`v1/takse/${existingUser1.id}`)
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
    it('Should delete taksa.', (done) => {
      request.delete(`v1/takse/${existingTaksa.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('taksa');
          res.body.data.taksa.should.have.all.keys(taksaFactory.taksaAttributes);
          done();
        });
    });

    it('Should get error. (taksa does not exist)', (done) => {
      request.delete(`v1/takse/${existingTaksa.id}`).set({
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

    it('Should get error. (taksa does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/takse/string`).set({
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
      request.delete(`v1/takse/${existingUser.id}`).set({
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
      request.delete(`v1/takse/${existingUser1.id}`)
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
#######TAKSE
  /takse:
    get:
      security:
        - Bearer: []
      tags:
        - Taksa
      summary: Get all takse.
      description: "Requires logged in user to be super_user."
      operationId: getTakse
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All takse.
          schema:
            $ref: "#/definitions/TaksaResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Taksa
      summary: Add new taksa.
      description: "Requires logged in user to be super_user."
      operationId: createTaksa
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Taksa object that needs to be added to the takse.
          required: true
          schema:
            $ref: "#/definitions/PostTakseBody"
      responses:
        "201":
          description: Taksa created.
          schema:
            $ref: "#/definitions/TakseResponse"
  /takse/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Taksa
      summary: Get taksa.
      description: "Requires logged in user to be super_user."
      operationId: getTaksa
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the taksa
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/TakseResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Taksa
      summary: Update taksa.
      description: "Requires logged in user to be super_user."
      operationId: updateTaksa
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the taksa that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutTakseBody"
      responses:
        "200":
          description: Taksa updated.
          schema:
            $ref: "#/definitions/TakseResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Taksa
      summary: Delete taksa.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the taksa that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Taksa deleted.
          schema:
            $ref: "#/definitions/TakseResponse"

//#####################################################
//definitions: models
Taksa:
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
#Taksa
PostTakseBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutTakseBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Taksa
  TaksaResponse:
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
          - takse
        properties:
          takse:
            type: 'array'
            items:
              $ref: "#/definitions/Taksa"

  TakseResponse:
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
          - taksa
        properties:
          taksa:
            $ref: "#/definitions/Taksa"
