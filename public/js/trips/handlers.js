

const handlers = (()=>{

	const signUp = (me)=>{
		axios.post('/auth/signup', me)
			.then(response=>{

				store.me = response.data
				api.getEventsOnLoad();
			})
			.catch(err=>{
				toastr.error(err.response.data.error)
				signInOut.renderSignInForm()
			  console.log('signup error', err.response) })
	}
	const signIn = (me)=>{
		axios.post('/auth/signin', me)
			.then( () => {
				return api.getEventsOnLoad()
			})
			.then( () => {
				console.log('made it back from getevents on load')
					tripList.render()
					userHeader.render()
					allTripView.render()
					signInOut.renderNav()			
			})
			.catch(err=> {
				console.log('error from signin handler', err.response)
			})
			// need catch
	}


	const fillOutForm = ()=>{
		const $form = $('#addLegForm')
		 $form.find('#type').val(store.legTypes[Math.floor(Math.random()*3)])
		 $form.find('#company').val(store.airlines[Math.floor(Math.random() * store.airlines.length)].name)
		 $form.find('#flightNum').val( Math.floor(Math.random() * 10000) )
		 const startDate = moment(faker.date.future())
		 $form.find('#startDate').val(startDate.format('YYYY-MM-DD'))
		 $form.find('#endDate').val(startDate.add(7,'days').format('YYYY-MM-DD'))
		 $form.find('#startTime').val(moment(faker.date.future()).format('HH:MM'))
		 $form.find('#endTime').val(moment(faker.date.future()).format('HH:MM'))
		return 'ok'
	}

	const addLegToTrip = ()=>{
		const tripId = store.trips.current._id
		console.log('tripId', tripId)
		let leg = store.trips.currentLeg
		leg.line = null
		axios.post(`/admin/legs/addLegToTrip/${tripId}`, leg)
			.then(updatedTrip => {
				console.log('updated trip.data', updatedTrip.data)
				for(let i=0;i<store.trips.length;i++){
					if (store.trips[i]._id === updatedTrip.data._id) store.trips[i] = store.trips.current = updatedTrip.data
				}
				tripList.render()
				
			})
			.catch(err=> console.error(err))
	}
	const updateLeg = ()=>{
		// it only 'updates' if it already has an id.  otherwise 'addLegToTrip' is called
		let leg = store.trips.currentLeg
		let legId = store.trips.currentLeg._id
		leg.line = null // otherwise JSON circular reference
		axios.post(`/admin/legs/${legId}`, leg)
			.then(response =>{
				const newTrip = response.data
				for (var i = store.trips.length - 1; i >= 0; i--) {
					if (store.trips[i]._id === newTrip._id) store.trips[i] = newTrip
				}
				tripList.render()
				// set store.trips.currentLeg ?
				legEditor.render()
			})
			.catch(err=>console.error(err))
	}

	const getTrips = ()=>{
		axios.get('/admin/trips')
			.then(response=> store.trips = response.data)
	}
	const addNewUser = ()=>{
		axios.post('/admin/users/', store.currentUser)
			.then( response => {
				if (response.data.errmsg){
					toastr.error(`${store.currentUser.email} is already registered.  Please try again`)
					store.currentUser = {}
					userEditor.render()
				} else {
				console.log('response from new user', response.data)
				store.users = response.data.travelers
				userHeader.render()
					
				}
			} )
			.catch(e=> console.log(e))
	}
	const updateUser = ()=>{
		const{firstName, lastName, email, avatar, _id} = store.currentUser
		const updateObj = {firstName, lastName, email, avatar}
		axios.post(`/admin/users/${_id}`, updateObj )
			.then( response=> {
				toastr.success(`${firstName} was updated.`)
				console.log('response from update user', response.data)
				userHeader.render()

			})
			.catch(err=> console.log(err))
	}
	const updateLegUsers = ()=>{
		let leg = store.trips.currentLeg
		let userIds = leg.travelers.map(t => t._id)
		axios.post(`/admin/legs/updateUsers/${leg._id}`, userIds)
			.then( response => {
				console.log('response from api', response.data)
				// store.trips.currentLeg = response.data
				userHeader.render()
			} )
			.catch( err => console.log(err) )
	}
	const addUpdateTrip = ()=>{
		const tripName = store.trips.current.name
		const tripId = store.trips.current._id || ''
		axios.post(`/admin/trips/${tripId}`, {tripName})
			.then( myTrips => {
				console.log('myTrips', myTrips.data)
				store.trips = myTrips.data
				tripList.render()
				tripView.render()
			}) 
			.catch(err => console.error(err))
	}
	const deleteTrip = ()=>{
		const tripId = store.trips.current._id
		axios.delete(`/admin/trips/${tripId}`)
			.then(response=> {
				console.log('response from delete trip', response.data)
				store.trips = response.data
				tripList.render()
			})
	}




	return {
		signUp,
		signIn,
		updateLegUsers,
		getTrips,
		fillOutForm,
		addNewUser,
		updateUser,
		addLegToTrip,
		updateLeg,
		addUpdateTrip,
		deleteTrip
	}
})()