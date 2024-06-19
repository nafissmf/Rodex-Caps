const { validationResult } = require('express-validator');
const storeFirestore = require('../controllers/firestore.controller');

// Controller untuk memulai inspeksi baru
async function startInspection(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name_of_officer, name_of_road, length_of_road, type_of_road_surface, location_start } = req.body;

  try {
    // Simpan data inspeksi ke Firestore atau database lainnya
    await storeFirestore.saveInspection({
      name_of_officer,
      name_of_road,
      length_of_road,
      type_of_road_surface,
      location_start,
    });

    res.status(201).send('New inspection started');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error starting new inspection');
  }
}

// Controller untuk mendeteksi jalan menggunakan model
async function detectRoad(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { image, location } = req.body;

  try {
    // Proses deteksi jalan
    // Simpan hasil deteksi ke Firestore atau database lainnya
    await storeFirestore.saveDetectedRoad({ image, location });

    res.status(200).send('Road detected');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error detecting road');
  }
}

// Controller untuk menyimpan kerusakan
async function saveDamages(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { image, count_damages, count_damages_type_0, count_damages_type_1, count_damages_type_2, count_damages_type_3, location, detected } = req.body;

  try {
    // Simpan data kerusakan ke Firestore atau database lainnya
    await storeFirestore.saveDamages({
      image,
      count_damages,
      count_damages_type_0,
      count_damages_type_1,
      count_damages_type_2,
      count_damages_type_3,
      location,
      detected,
    });

    res.status(200).send('Damages saved');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving damages');
  }
}

// Controller untuk mengakhiri inspeksi
async function endInspection(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location_end } = req.body;

  try {
    // Simpan data lokasi akhir inspeksi ke Firestore atau database lainnya
    await storeFirestore.saveEndLocation({ location_end });

    res.status(200).send('Inspection ended');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error ending inspection');
  }
}

module.exports = {
  startInspection,
  detectRoad,
  saveDamages,
  endInspection,
};
