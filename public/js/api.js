// const axios = require('axios');

const userActions = (()=>{

	const url = window.location.origin + '/admin/users'

	const addUser = user => 
		 axios.post('http://localhost:8080/admin/users', user)
			.then(res => res.data)
			.catch(err=> console.error(err))

	return {
		addUser,

	}			
})()