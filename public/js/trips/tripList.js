
const tripList = {
	icons: {"Flight": 'plane', "Ground": 'car', "Other": 'dot-circle'},
	dateRange: (trip)=>{
		return (trip.timeRange.startTime !== Infinity) ? `${moment(trip.timeRange.startTime).format('MMM D')} - ${moment(trip.timeRange.endTime).format('MMM D')}` : 'no dates yet'
	},
	render: function(){
			store.setTimeRanges()

		// list of trip -> LEGS
		const _legs = trip => trip.tripLegs.map( leg => `
			<article class='legListItem' legId=${leg._id}>
				<i class=" legLogo fas fa-${this.icons[leg.type]}"></i>
				${leg.startLoc.city || leg.startLoc.cityLong || leg.startLoc.state || 'origin' } 
				<i class="fas fa-arrow-right"></i>
				${leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state || 'destination'}
				<small><span class='date font-weight-light'>${moment(leg.startTime).format('MMM Do')}</span></small>
				<a href='#!' legId="${leg._id}" class='legShow'><i class="fas fa-map-marker-alt show"></i></a>
				<a href="#!" legId="${leg._id}" class='legIdEdit'><i class="far fa-edit edit"></i></a>
			</article>`
			).join('')

		// list of TRIPS
		const _tripSection = store.trips.map( trip => `
			<section data-accordion>
				<button data-control class='expandTripButton' tripId="${trip._id}">
					 <h5 class='tripName'>${trip.name.toUpperCase()}</h5> 
					 <p class='tripDates'>${this.dateRange(trip)}</p>
				</button>
				<div data-content>
					${_legs(trip)}
					<article class='legListItem'>
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
		$('.addNewTrip').click(function(){
			store.trips.current = null
			tripEditor.render()
		})
		// leg edit and show are different views, could be the same view
		$('.legListItem').click(function(){
			let legId = $(this).attr('legId')
			console.log('legid', legId)
			let leg = store.trips.current.tripLegs.find(leg => leg._id === legId)
			store.trips.currentLeg = leg
			$(this).closest('#tripFullList').find('.legListItem').removeClass('selectedLeg')
			$(this).addClass('selectedLeg')
			legEditor.render()
			userHeader.render()
		})
		// $('.legShow').click(function(){
		// 	let legId = $(this).attr('legId')
		// 	let leg = store.trips.current.tripLegs.find(leg => leg._id === legId)
		// 	store.trips.currentLeg = leg
		// 	legView.render()
		// })


		$('.addLegToTrip').click(function(){
			let tripId = $(this).attr('tripId')
			store.trips.currentLeg = {}
			legEditor.render()
		})
		$('.expandTripButton').click(function(){
			store.trips.currentLeg = null
			userHeader.render()
			let tripId = $(this).attr('tripId')
			const trip = store.trips.find(trip=> trip._id === tripId)
			store.trips.current = trip
			tripView.render()
		})

		// rollover hilight the arrow
		$('.legListItem').hover(function(){
		 const legId = $(this).find('.legShow').attr('legId')
			try { const line = store.trips.current.tripLegs.find(leg=> leg._id === legId).line
			 line.setOptions(store.mapArrowOptions.selected)  } catch (e) {  }
		}, function(){
		 const legId = $(this).find('.legShow').attr('legId')
			 try { const line = store.trips.current.tripLegs.find(leg=> leg._id === legId).line
			 line.setOptions(store.mapArrowOptions.unSelected) } catch(e) {  }
		})
	}

}