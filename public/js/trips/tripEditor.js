const tripEditor = (function(){

	const render = ()=>{
		const trip = store.trips.current
		let html = `<h2>${trip ? 'Edit Trip' : 'Add Trip'}</h2>`
		html += `
			<div class='form-group'>
				<label for="tripName">Name</label>
				<input id="tripName" type="text" value="${trip?trip.name:''}" name="tripName" class="form-control" placeholder="'Italy' or 'Northern California' or 'Mexico: ${moment().add(1,'year').format('YYYY')}' etc...">
			</div>
			<div class='button-group'>
				<button class='btn btn-success ${trip?'updateTrip':'addTrip'}'>${trip?'UPDATE' :'ADD to MY TRIPS'}</button>
			</div>
		`

		$('.rightSide').html(html)

		$('.updateTrip').click(function(){
			store.trips.current.name = $('#tripName').val()
			handlers.addUpdateTrip()
		})
		$('.addTrip').click(function(){
			store.trips.current = {}
			store.trips.current.name = $('#tripName').val()
			handlers.addUpdateTrip()
		})
	}



	return {
		render
	}

})()