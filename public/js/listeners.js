const attachListeners = ( ()=> ()=> {
	console.log('attaching listeners')
	$('#addEditUser').submit(handlers.addUserHandler)
})()

