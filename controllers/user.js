const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const token = jwt.sign({ id: 1, email: "test@example.com" }, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 600),
    });
    res.send("Cookie envoyé");
};

exports.login = login;