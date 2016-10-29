"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
    // User
    'GET /v1/users': 'v1/UserController.read',
    'GET /v1/users/refresh_token': 'v1/user/SessionController.refreshToken',
    'POST /v1/users/signup': 'v1/user/RegistrationController.create',
    'POST /v1/users/signin': 'v1/user/SessionController.create',
    'GET /v1/users/:id': 'v1/UserController.read',
    'PUT /v1/users/:id': 'v1/UserController.update',
    'DELETE /v1/users/:id': 'v1/UserController.delete',

    // Poslovnica
    'GET /v1/poslovnice': 'v1/PoslovnicaController.read',
    'GET /v1/poslovnice/:id': 'v1/PoslovnicaController.read',
    'POST /v1/poslovnice': 'v1/PoslovnicaController.create',
    'PUT /v1/poslovnice/:id': 'v1/PoslovnicaController.update',
    'DELETE /v1/poslovnice/:id': 'v1/PoslovnicaController.delete',

    // Opstina
    'GET /v1/opstine': 'v1/OpstinaController.read',
    'GET /v1/opstine/:id': 'v1/OpstinaController.read',
    'POST /v1/opstine': 'v1/OpstinaController.create',
    'PUT /v1/opstine/:id': 'v1/OpstinaController.update',
    'DELETE /v1/opstine/:id': 'v1/OpstinaController.delete',

    // Box
    'GET /v1/boxes': 'v1/BoxController.read',
    'GET /v1/boxes/:id': 'v1/BoxController.read',
    'POST /v1/boxes': 'v1/BoxController.create',
    'PUT /v1/boxes/:id': 'v1/BoxController.update',
    'DELETE /v1/boxes/:id': 'v1/BoxController.delete',

    // Usluge
    'GET /v1/usluge': 'v1/UslugaController.read',
    'GET /v1/usluge/:id': 'v1/UslugaController.read',
    'POST /v1/usluge': 'v1/UslugaController.create',
    'PUT /v1/usluge/:id': 'v1/UslugaController.update',
    'DELETE /v1/usluge/:id': 'v1/UslugaController.delete',

    //Osiguranje
    'GET /v1/osiguranja': 'v1/OsiguranjeController.read',
    'GET /v1/osiguranja/:id': 'v1/OsiguranjeController.read',
    'POST /v1/osiguranja': 'v1/OsiguranjeController.create',
    'PUT /v1/osiguranja/:id': 'v1/OsiguranjeController.update',
    'DELETE /v1/osiguranja/:id': 'v1/OsiguranjeController.delete',

    //takse
    'GET /v1/takse': 'v1/TaksaController.read',
    'GET /v1/takse/:id': 'v1/TaksaController.read',
    'POST /v1/takse': 'v1/TaksaController.create',
    'PUT /v1/takse/:id': 'v1/TaksaController.update',
    'DELETE /v1/takse/:id': 'v1/TaksaController.delete',

    //Documentation
    'GET /v1/doc': 'v1/DocumentationController.getDocumentationJson',
  }
};
