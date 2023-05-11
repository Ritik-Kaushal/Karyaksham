const jwt = require("jsonwebtoken");

const generateLoginToken = (id, username) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    _id: id,
    username : username
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '20m' });

  return token;
};

module.exports = { generateLoginToken }
