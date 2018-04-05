

const handlers = (()=>{

	const signUp = (me)=>{
		axios.post('/auth/signup', me)
			.then(response=>{
				store.me = response.data
				return api.getEventsOnLoad();
			})
			.then( () => {
					tripRender.accordion()
					userHeader.render()
					tripRender.allTrips()
					homeRender.nav()			
			})
			.catch(err=>{
				toastr.error(err.response.data.error)
				homeRender.signInForm()
			  console.log('signup error', err.response) })
	}
	const signIn = (me)=>{
		axios.post('/auth/signin', me)
			.then( () => {
				return api.getEventsOnLoad()
			})
			.then( () => {
					tripRender.accordion()
					userHeader.render()
					tripRender.allTrips()
					homeRender.nav()			
			})
			.catch(err=> {
				toastr.error('Email / Password not recognized')
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
				tripRender.accordion()
				legRender.edit()
			})
			.catch(err=> console.error(err))
	}
	const updateLeg = ()=>{
		let leg = store.trips.currentLeg
		let legId = store.trips.currentLeg._id
		leg.line = null // otherwise JSON circular reference
		axios.post(`/admin/legs/${legId}`, leg)
			.then(response =>{
				const newTrip = response.data
				for (var i = store.trips.length - 1; i >= 0; i--) {
					if (store.trips[i]._id === newTrip._id) store.trips[i] = newTrip
				}
				tripRender.accordion()
				tripRender.allTrips()
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
				tripRender.allTrips()
			})
			.catch(err=> console.log(err))
	}
	const updateLegUsers = ()=>{
		let leg = store.trips.currentLeg
		let userIds = leg.travelers.map(t => t._id)
		
		axios.post(`/admin/legs/updateUsers/${leg._id}`, userIds)
			.then( response => {
				userHeader.render()
				$('.legTravelerList').hide().html(legRender.travelerList()).fadeIn()
			} )
			.catch( err => console.log(err) )
	}
	const deleteLeg = () => {
		let leg = store.trips.currentLeg
		axios.delete(`/admin/legs/${leg._id}`)
			.then(res=> {
				store.removeLeg()
				tripRender.viewTrip()
				tripRender.accordion()
			})
	}
	const addUpdateTrip = ()=>{
		const tripName = store.trips.current.name
		const tripId = store.trips.current._id || ''
		axios.post(`/admin/trips/${tripId}`, {tripName})
			.then( myTrips => {
				console.log('myTrips', myTrips.data)
				store.trips = myTrips.data
				tripRender.accordion()
				tripRender.viewTrip()
			}) 
			.catch(err => console.error(err))
	}
	const deleteTrip = ()=>{
		const tripId = store.trips.current._id
		axios.delete(`/admin/trips/${tripId}`)
			.then(response=> {
				console.log('response from delete trip', response.data)
				store.trips = response.data
				tripRender.accordion()
				tripRender.allTrips()
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
		deleteTrip,
		deleteLeg,
	}
})()