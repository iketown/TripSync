exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/travelsync';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-travelsync';
exports.GOOGKEY = process.env.MAP_KEY;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY;
exports.PORT = process.env.PORT || 8080;