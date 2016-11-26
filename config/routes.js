

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

    // Osiguranje
    'GET /v1/osiguranja': 'v1/OsiguranjeController.read',
    'GET /v1/osiguranja/:id': 'v1/OsiguranjeController.read',
    'POST /v1/osiguranja': 'v1/OsiguranjeController.create',
    'PUT /v1/osiguranja/:id': 'v1/OsiguranjeController.update',
    'DELETE /v1/osiguranja/:id': 'v1/OsiguranjeController.delete',

    // StavkaOsiguranja
    'GET /v1/stavkeOsiguranja': 'v1/StavkaOsiguranjaController.read',
    'GET /v1/stavkeOsiguranja/:id': 'v1/StavkaOsiguranjaController.read',
    'POST /v1/stavkeOsiguranja': 'v1/StavkaOsiguranjaController.create',
    'PUT /v1/stavkeOsiguranja/:id': 'v1/StavkaOsiguranjaController.update',
    'DELETE /v1/stavkeOsiguranja/:id': 'v1/StavkaOsiguranjaController.delete',

    // Takse
    'GET /v1/takse': 'v1/TaksaController.read',
    'GET /v1/takse/:id': 'v1/TaksaController.read',
    'POST /v1/takse': 'v1/TaksaController.create',
    'PUT /v1/takse/:id': 'v1/TaksaController.update',
    'DELETE /v1/takse/:id': 'v1/TaksaController.delete',

    // Naziv takse
    'GET /v1/naziviTaksa': 'v1/NazivTakseController.read',
    'GET /v1/naziviTaksa/:id': 'v1/NazivTakseController.read',
    'POST /v1/naziviTaksa': 'v1/NazivTakseController.create',
    'PUT /v1/naziviTaksa/:id': 'v1/NazivTakseController.update',
    'DELETE /v1/naziviTaksa/:id': 'v1/NazivTakseController.delete',

    // Banka
    'GET /v1/banke': 'v1/BankaController.read',
    'GET /v1/banke/:id': 'v1/BankaController.read',
    'POST /v1/banke': 'v1/BankaController.create',
    'PUT /v1/banke/:id': 'v1/BankaController.update',
    'DELETE /v1/banke/:id': 'v1/BankaController.delete',

    // Lice
    'GET /v1/lica': 'v1/LiceController.read',
    'GET /v1/lica/:id': 'v1/LiceController.read',
    'POST /v1/lica': 'v1/LiceController.create',
    'PUT /v1/lica/:id': 'v1/LiceController.update',
    'DELETE /v1/lica/:id': 'v1/LiceController.delete',

    // Vozilo
    'GET /v1/vozila': 'v1/VoziloController.read',
    'GET /v1/vozila/:id': 'v1/VoziloController.read',
    'POST /v1/vozila': 'v1/VoziloController.create',
    'PUT /v1/vozila/:id': 'v1/VoziloController.update',
    'DELETE /v1/vozila/:id': 'v1/VoziloController.delete',

    // TipPredmeta
    'GET /v1/tipoviPredmeta': 'v1/TipPredmetaController.read',
    'GET /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.read',
    'POST /v1/tipoviPredmeta': 'v1/TipPredmetaController.create',
    'PUT /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.update',
    'DELETE /v1/tipoviPredmeta/:id': 'v1/TipPredmetaController.delete',

    // Predmet
    'GET /v1/predmeti': 'v1/PredmetController.read',
    'GET /v1/predmeti/:id': 'v1/PredmetController.read',
    'POST /v1/predmeti': 'v1/PredmetController.create',
    // 'PUT /v1/predmeti/:id': 'v1/PredmetController.update',
    // 'DELETE /v1/predmeti/:id': 'v1/PredmetController.delete',

    // Uplata
    'POST /v1/uplate': 'v1/UplataController.create',

    // Calculator
    'GET /v1/calculator/takse': 'v1/CalculatorController.filterTakse',
    'GET /v1/calculator/stavkeOsiguranja': 'v1/CalculatorController.filterStavkeOsiguranja',

    // Documentation
    'GET /v1/doc': 'v1/DocumentationController.getDocumentationJson',
  },
};
