

const handlers = (()=>{

	const fillOutForm = ()=>{
		const $form = $('#addLegForm')
		 $form.find('#type').val(store.legTypes[Math.floor(Math.random()*3)])
		 $form.find('#company').val(store.airlines[Math.floor(Math.random() * store.airlines.length)].name)
		 $form.find('#flightNum').val( Math.floor(Math.random() * 10000) )
		 $form.find('#startDate').val(moment(faker.date.future()).format('YYYY-MM-DD'))
		 $form.find('#endDate').val(moment(faker.date.future()).format('YYYY-MM-DD'))
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
				store.trips.current = updatedTrip.data
				render.trips()
				
			})
			.catch(err=> console.error(err))
	}
	const getTrips = ()=>{
		axios.get('/admin/trips')
			.then(response=> store.trips = response.data)
	}


	return {
		addLegToTrip,
		getTrips,
		fillOutForm
	}
})()