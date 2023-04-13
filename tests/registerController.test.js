const assert = require('assert');
const registerController = require('./registerController');

describe('registerController', function() {
  it('should register a new user', function() {
    // Call the registerController function with test data
    const req = { body: { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', password: 'password123' } };
    const res = {};
    registerController(req, res);

    // Assert that the response status code is 200
    assert.equal(res.status, 200);

    // Assert that the response body is the expected result
    assert.deepEqual(res.body, { message: 'User successfully registered' });
  });
});
