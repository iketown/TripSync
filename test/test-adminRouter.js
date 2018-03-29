const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {app} = require('../server')

const cookie = ''

describe('admin router', function(){
	// before, create admin user
	// move cookie to a more global scope.

	// after, destroy database



})