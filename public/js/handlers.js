

const handlers = (()=>{

	const addUserHandler = function(event){
		event.preventDefault()
		const fields = ['firstName', 'lastName', 'userName', 'email', 'phone', 'homeAirport'];
		const user = {}
		fields.forEach(field=>{
			user[field] = $(event.currentTarget).find(`#${field}`).val().trim();
		})
		userActions.addUser(user)
			.then(newUser => {
				console.log('newUser', newUser)
				toastr.success('hello')
				renderUsers()
			})
			.catch( e => console.log(e))
	}

	return {
		addUserHandler,
	}
})()