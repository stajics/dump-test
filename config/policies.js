

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. 'authenticated')
 */

module.exports = {
  policies: {
    'v1/UserController': {
      read: ['isAuthenticated', 'isManager'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isManager'],
    },

    'v1/PoslovnicaController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/OpstinaController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/UslugaController': {
      create: ['isAuthenticated', 'isManager'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isManager'],
    },

    'v1/OsiguranjeController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/StavkaOsiguranjaController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/TaksaController': {
      create: ['isAuthenticated'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/NazivTakseController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated', 'isSuperUser'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/BankaController': {
      create: ['isAuthenticated', 'isManager'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isManager'],
    },

    'v1/LiceController': {
      create: ['isAuthenticated'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated'],
      delete: ['isAuthenticated'],
    },

    'v1/VoziloController': {
      create: ['isAuthenticated', 'isSuperUser'],
      read: ['isAuthenticated', 'isSuperUser'],
      update: ['isAuthenticated', 'isSuperUser'],
      delete: ['isAuthenticated', 'isSuperUser'],
    },

    'v1/TipPredmetaController': {
      create: ['isAuthenticated', 'isManager'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isManager'],
    },

    'v1/PredmetController': {
      create: ['isAuthenticated'],
      read: ['isAuthenticated'],
      update: ['isAuthenticated', 'isManager'],
      delete: ['isAuthenticated', 'isManager'],
    },

    'v1/CalculatorController': {
      filterTakse: ['isAuthenticated'],
    },

    'v1/user/RegistrationController': {
      create: ['isAuthenticated', 'isManager'],
    },

    'v1/user/SessionController': {
      refreshToken: ['isAuthenticated'],
    },
  },
};
