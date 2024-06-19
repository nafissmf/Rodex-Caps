const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../config/db");
const storeFirestore = require("../controllers/firestore.controller");

// Fungsi untuk hashing password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Fungsi untuk membandingkan password yang dimasukkan dengan password yang di-hash
async function comparePasswords(inputPassword, hashedPassword) {
  return bcrypt.compare(inputPassword, hashedPassword);
}

// Fungsi untuk membuat token JWT
function generateToken(user) {
  const payload = {
    username: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// Controller untuk registrasi user
async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Cek apakah user sudah terdaftar berdasarkan email
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Simpan user baru ke database
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    await storeFirestore.saveUser(newUser);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
}

// Controller untuk login user
async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username dari database
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Bandingkan password yang dimasukkan dengan password yang di-hash
    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token untuk user yang berhasil login
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
}

module.exports = {
  register,
  login,
};
