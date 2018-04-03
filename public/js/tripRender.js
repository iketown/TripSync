const tripRender = (function(){

	const allTrips = () => {
		html = `
			<h1> My Trips </h1>
			<div id="googleAllTrips"></div>`
		$('.rightSide').html(html)
		mapRender.allTrips()
	}

	const accordion = () => {
		const icons =  {"Flight": 'plane', "Ground": 'car', "Other": 'dot-circle'}
		const dateRange = (trip) => {
			return (trip.timeRange.startMoment !== Infinity) ? 
			`${moment(trip.timeRange.startMoment).format('MMM D')} - ${moment(trip.timeRange.endMoment).format('MMM D')}` 
			: 'no dates yet'
		}
		store.setTimeRanges()

		// list of trip -> LEGS
		const _legs = trip => trip.tripLegs.map( leg => `
			<article class='legListItem' legId=${leg._id}>
				<i class=" legLogo fas fa-${icons[leg.type]}"></i>
				${leg.startLoc.city || leg.startLoc.cityLong || leg.startLoc.state || 'origin' } 
				<i class="fas fa-arrow-right"></i>
				${leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state || 'destination'}
				<small><span class='date font-weight-light'>${moment(leg.startMoment).format('MMM Do')}</span></small>
				<a href='#!' legId="${leg._id}" class='legShow'><i class="fas fa-map-marker-alt show"></i></a>
				<a href="#!" legId="${leg._id}" class='legIdEdit'><i class="far fa-edit edit"></i></a>
			</article>`
			).join('')

		// list of TRIPS
		const _tripSection = store.trips.map( (trip, i) => `
			<section data-accordion>
				<button data-control class='expandTripButton' tripId="${trip._id}">
					 <h5 class='tripName' style="color: ${store.colors[i]}">${trip.name.toUpperCase()}</h5> 
					 <p class='tripDates'>${dateRange(trip)}</p>
				</button>
				<div data-content>
					${_legs(trip)}
					<article class=''>
						<a href='#!' class='addLegToTrip' tripId=${trip._id}><p class="font-weight-bold"><i class="fas fa-plus"></i> Add Leg to <span class='font-weight-light'>(${trip.name})</span> Trip </p></a>
					</article>
				</div>
			</section>  `
		).join('');

		// top level accordion
		const html = `
			<h2> My Trips </h2>
			<section id="tripFullList" data-accordion-group>
					${_tripSection}
			</section>
			<buttton class='btn btn-success addNewTrip'>Create New Trip</button>
		`

		$('.leftSide').html(html)
		$('#tripFullList [data-accordion]').accordion();

		$('.addNewTrip').click( newHandlers.addNewTrip )
		$('.legListItem').click( newHandlers.selectLeg )
		$('.addLegToTrip').click( newHandlers.addLegToTrip )
		$('.expandTripButton').click( newHandlers.selectTrip )
		$('.legListItem').hover( newHandlers.hoverLeg, newHandlers.unhoverLeg )
	} // end accordion

	const viewTrip = () => {
		const trip = store.trips.current
		html = `
			<h2>${ trip.name.toUpperCase() }</h2>
			<div id="googleTripMap"></div>
			<div class='button-group'>
				<button class='btn btn-info renameTrip'>Rename Trip</button>
				<button class='btn btn-danger deleteTrip'>Delete Trip</button>
			</div>
		`
		$('.rightSide').html(html)
			mapRender.trip()
		$('.renameTrip').click(function(){
			tripRender.edit()
		})
		$('.deleteTrip').click(function(){
			handlers.deleteTrip()
		})		
	}

	const edit = () => {
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

		$('.updateTrip').click(newHandlers.updateTrip)
		$('.addTrip').click(newHandlers.addTrip)
	}


	return {
		allTrips,
		accordion,
		viewTrip,
		edit,
	}

})()