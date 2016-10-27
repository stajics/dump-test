"use strict";

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports = {
  policies: {
    "v1/UserController": {
      read: ["isAuthenticated", "isManager"],
      update: ["isAuthenticated", "isManager" ],
      delete: ["isAuthenticated", "isManager" ]
    },

    "v1/PoslovnicaController": {
      create: ["isAuthenticated", "isSuperAdmin" ],
      read: ["isAuthenticated", "isSuperAdmin"],
      update: ["isAuthenticated", "isSuperAdmin" ],
      delete: ["isAuthenticated", "isSuperAdmin" ]
    },

    "v1/user/RegistrationController": {
      create: ["isAuthenticated", "isManager" ]
    },

    "v1/user/SessionController": {
      refreshToken: ["isAuthenticated"]
    }
  }
};
