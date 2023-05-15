const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const verifyEmail = (email) => EMAIL_REGEX.test(email);

module.exports = verifyEmail;