const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const { app } = require('../server')

describe('Home page', function(){

	it('should go to home page', function(){
		return chai.request(app)
			.get('/')
			.then(function(res){
				expect(res).to.have.status(200)
				expect(res).to.be.html;
			})
	})

})