

const handlers = (()=>{

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

	const addLegToTrip = (obj, tripId)=>{
		console.log('tripId', tripId)
		axios.post(`/admin/legs/addLegToTrip/${tripId}`, obj)
			.then(updatedTrip=> {
				console.log('updated trip.data', updatedTrip.data)
				for(let i=0; i < store.trips.length; i++){
					if (store.trips[i]._id === updatedTrip.data._id) store.trips[i] = updatedTrip.data
				}
				toastr.info('Leg Added')
				store.trips.current = updatedTrip.data
				render.trips()
				render.showTrip(store.trips.current)
				
			})
			.catch(err=> console.error(err))
	}
	const getTrips = ()=>{
		axios.get('/admin/trips')
			.then(response=> store.trips = response.data)
	}
	const addNewUser = ()=>{
		axios.post('/admin/users/', store.newUser)
			.then( response => {
				console.log('response', response.data)
				store.users.push(response.data)
				userHeader.render()
			} )
			.catch(e=> console.log(e))
	}
	const updateUser = ()=>{
		const{firstName, lastName, email, avatar, _id} = store.currentUser
		const updateObj = {firstName, lastName, email, avatar}
		axios.post(`/admin/users/${_id}`, updateObj )
			.then( response=> {
				toastr.success(`${firstName} was updated.`)
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


	return {
		updateLegUsers,
		getTrips,
		fillOutForm,
		addNewUser,
		updateUser,
		addLegToTrip
	}
})()