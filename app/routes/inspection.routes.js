const inspectionController = require("../controllers/inspektion.controller");
const { validationResult } = require('express-validator');
const storeFirestore = require('../controllers/firestore.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Route untuk memulai inspeksi baru
    app.post("/inspection/new", inspectionController.startInspection);

    // Route untuk deteksi jalan menggunakan model
    app.post("/inspection/detect", inspectionController.detectRoad);

    // Route untuk menyimpan kerusakan
    app.post("/inspection/detected", inspectionController.saveDamages);

    // Route untuk mengakhiri inspeksi
    app.post("/inspection/end", inspectionController.endInspection);
};
