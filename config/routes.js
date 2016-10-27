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

    //Documentation
    'GET /v1/doc': 'v1/DocumentationController.getDocumentationJson',
  }
};
