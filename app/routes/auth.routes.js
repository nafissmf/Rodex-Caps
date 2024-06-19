const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    // Example logic for registering user
    // Here you would typically hash the password before saving it to the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // Save the user to the database (example only, replace with your actual database logic)
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(201).send({ message: "User registered successfully!" });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Example logic for logging in user
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (results.length === 0) {
            res.status(404).send({ message: "User not found!" });
            return;
        }

        const user = results[0];

        // Check password validity (example only, replace with your actual password validation logic)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!isMatch) {
                res.status(401).send({ message: "Invalid password!" });
                return;
            }

            // Generate token for authentication
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    });
};
