//***********************************************************
//*********models/Osiguranje.js
//********************************************************
//Osiguranje, osiguranje, Osiguranja, osiguranja
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
//*********controllers/OsiguranjeController.js
//********************************************************

"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {

  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let newOsiguranje = await Osiguranje.create(values);
      res.created({osiguranje: newOsiguranje});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let osiguranja = null;
      if( req.params.id ){
        osiguranja = await Osiguranje.findOne({id: req.params.id});
        res.ok({ osiguranje: osiguranja });
        } else {
        osiguranja = await Osiguranje.find();
        res.ok({ osiguranja });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      let updatedOsiguranje = await Osiguranje.update({ id: req.params.id }, values);
      if( isEmpty(updatedOsiguranje) ) {
        return res.notFound("No osiguranje with that ID.");
      }
      res.ok({osiguranje: updatedOsiguranje[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let osiguranjeForDelete = await Osiguranje.destroy({ id: req.params.id });
        if( isEmpty(osiguranjeForDelete) ) {
          return res.notFound("No osiguranje with that ID.");
        }
        res.ok({osiguranje: osiguranjeForDelete[0]});
    } catch (err) {
      res.badRequest(err);
    };
  }

};


//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/osiguranja': 'v1/OsiguranjeController.read',
'GET /v1/osiguranja/:id': 'v1/OsiguranjeController.read',
'POST /v1/osiguranja': 'v1/OsiguranjeController.create',
'PUT /v1/osiguranja/:id': 'v1/OsiguranjeController.update',
'DELETE /v1/osiguranja/:id': 'v1/OsiguranjeController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
"v1/OsiguranjeController": {
  create: ["isAuthenticated", "isSuperUser" ],
  read: ["isAuthenticated", "isSuperUser"],
  update: ["isAuthenticated", "isSuperUser" ],
  delete: ["isAuthenticated", "isSuperUser" ]
},

//***********************************************************
//*********test/factories/OsiguranjeFactory.js
//********************************************************
const _ = require('lodash');

const osiguranjeAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  let randomNumber = _.random(1,1000);
  return Osiguranje.create({
    name: `name${randomNumber}`
  });
};

module.exports = {
  osiguranjeAttributes,
  create
};

//***********************************************************
//*********test/integration/controllers/OsiguranjeController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');
const osiguranjeFactory = require('../../factories/OsiguranjeFactory');

describe('controllers:OsiguranjeController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingOsiguranje = null;
  before(done => {
    Promise.all([
      userFactory.createSuperUser({poslovnica: 1}),
      userFactory.createManager({poslovnica: 1}),
      osiguranjeFactory.create()
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingOsiguranje = objects[2];
      done();
    });
  });

  describe(':create', () => {
    it('Should create new osiguranje.', (done) => {
      request.post(`v1/osiguranja`).set({
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
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          res.body.data.osiguranje.name.should.equal('nameOpstine');
          done();
        });
    });

    it('Should get error (missing token).', (done) => {
      request.post(`v1/osiguranja`)
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
      request.post(`v1/osiguranja`).set({
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
      request.post(`v1/osiguranja`).set({
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
      request.post(`v1/osiguranja`).set({
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
    it('Should list osiguranja.', (done) => {
      request.get(`v1/osiguranja`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranja');
          res.body.data.osiguranja.length.should.be.above(0);
          done();
        });
    });

    it('Should list 1 osiguranje.', (done) => {
      request.get(`v1/osiguranja/${existingOsiguranje.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          console.log(res.body);
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          done();
        });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get(`v1/osiguranja`).set({
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
      request.get(`v1/osiguranja`)
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
    it('Should update osiguranje.', (done) => {
      request.put(`v1/osiguranja/${existingOsiguranje.id}`).set({
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
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          res.body.data.osiguranje.name.should.equal('updatedIme');
          done();
        });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/osiguranja/${existingOsiguranje.id}`).set({
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
      request.put(`v1/osiguranja/${existingUser1.id}`)
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
    it('Should delete osiguranje.', (done) => {
      request.delete(`v1/osiguranja/${existingOsiguranje.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('osiguranje');
          res.body.data.osiguranje.should.have.all.keys(osiguranjeFactory.osiguranjeAttributes);
          done();
        });
    });

    it('Should get error. (osiguranje does not exist)', (done) => {
      request.delete(`v1/osiguranja/${existingOsiguranje.id}`).set({
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

    it('Should get error. (osiguranje does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/osiguranja/string`).set({
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
      request.delete(`v1/osiguranja/${existingUser.id}`).set({
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
      request.delete(`v1/osiguranja/${existingUser1.id}`)
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
#######BOX
  /osiguranja:
    get:
      security:
        - Bearer: []
      tags:
        - Osiguranje
      summary: Get all osiguranja.
      description: "Requires logged in user to be super_user."
      operationId: getOsiguranjees
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All osiguranja.
          schema:
            $ref: "#/definitions/OsiguranjeResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Osiguranje
      summary: Add new osiguranje.
      description: "Requires logged in user to be super_user."
      operationId: createOsiguranje
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Osiguranje object that needs to be added to the osiguranja.
          required: true
          schema:
            $ref: "#/definitions/PostOsiguranjeesBody"
      responses:
        "201":
          description: Osiguranje created.
          schema:
            $ref: "#/definitions/OsiguranjeesResponse"
  /osiguranja/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Osiguranje
      summary: Get osiguranje.
      description: "Requires logged in user to be super_user."
      operationId: getOsiguranje
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the osiguranje
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/OsiguranjeesResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Osiguranje
      summary: Update osiguranje.
      description: "Requires logged in user to be super_user."
      operationId: updateOsiguranje
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the osiguranje that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutOsiguranjeesBody"
      responses:
        "200":
          description: Osiguranje updated.
          schema:
            $ref: "#/definitions/OsiguranjeesResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Osiguranje
      summary: Delete osiguranje.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the osiguranje that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Osiguranje deleted.
          schema:
            $ref: "#/definitions/OsiguranjeesResponse"

//#####################################################
//definitions: models
Osiguranje:
  type: object
  required:
    - id
    - naziv
    - vrstaVozila
    - kwOd
    - kwDo
    - nosivost
    - ccm
    - brMesta
    - cena
    - cena5
    - cena10
    - cena15
    - poslovnice
    - createdAt
    - updatedAt
  properties:
    id:
      type: string
    naziv:
      type: string
    vrstaVozila:
      type: string
    kwOd:
      type: string
    kwDo:
      type: string
    nosivost:
      type: string
    ccm:
      type: string
    brMesta:
      type: string
    cena:
      type: string
    cena5:
      type: string
    cena10:
      type: string
    cena15:
      type: string
    poslovnice:
      type: string
    createdAt:
      type: string
    updatedAt:
      type: string

//#############################################################
//definitions: responses

###############
#Osiguranje
PostOsiguranjeesBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutOsiguranjeesBody:
  type: object
  properties:
    name:
      type: string

###################
#Osiguranje
  OsiguranjeResponse:
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
          - osiguranja
        properties:
          osiguranja:
            type: 'array'
            items:
              $ref: "#/definitions/Osiguranje"

  OsiguranjeesResponse:
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
          - osiguranje
        properties:
          osiguranje:
            $ref: "#/definitions/Osiguranje"
