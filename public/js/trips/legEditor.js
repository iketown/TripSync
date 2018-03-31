const legEditor = (function(){

	const initMap = ()=>{
		if (store.trips.currentLeg && store.trips.currentLeg._id){
			let startLat = store.trips.currentLeg.startLoc.lat 
			let startLng = store.trips.currentLeg.startLoc.lng 
			let endLat = store.trips.currentLeg.endLoc.lat 
			let endLng = store.trips.currentLeg.endLoc.lng 
			const start = new google.maps.LatLng(startLat, startLng)
			const end = new google.maps.LatLng(endLat, endLng)
		 	const bounds = new google.maps.LatLngBounds
		 	bounds.extend(start)
		 	bounds.extend(end)
		 	map = new google.maps.Map(document.getElementById('googleLegMap'), {
		 		center: start,
		 		zoom: 8,
		 		styles: store.mapStyle,
		 		disableDefaultUI: true
			 	})
			const tripLine = new google.maps.Polyline({
				path: [start, end],
				strokeWeight: 1,
				geodesic: true,
				icons: [{
	                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2,strokeColor: 'red' },
	                offset: '100%',
	                
	            }] 
			}).setMap(map)
		 	const startMarker = new google.maps.Marker({
		 		position: start,
		 		icon: {
			      path: google.maps.SymbolPath.CIRCLE,
			      scale: 4,
			      strokeColor: 'green'
			    },
		 		map: map
		 	})
		 	map.fitBounds(bounds, {top: 5, bottom: 5, left: 5, right: 5})
		}
	}
	const render = ()=>{
		const leg = store.trips.currentLeg
		store.startLocTemp = null
		store.endLocTemp = null

		const _airlines = store.airlines.map(airline=> {
			return `<option value="${airline.name}" ${leg && leg.company === airline.name ? 'selected' : ''}>${airline.name}</option>`
		})
		const _legTypes = store.legTypes.map(opt=>{
        	return `<option value='${opt}' ${leg && leg.type === opt ? 'selected' : ''}> ${opt} </option>`
        })
        if (leg && leg.startLoc){
			leg.startName = leg.startLoc.city || leg.startLoc.cityLong || leg.startLoc.state || 'origin'
			leg.endName = leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state || 'arrival'
		}

		let html = `
			<div class="mapHeader">
				<div id="googleLegMap"></div>
				<div class="legHeader">
					<div class='fromto'>FROM</div>
					<h3 class='cityHeader start'>${leg && leg.startName || '? ? ?'}</h3>
					<div class='fromto'>TO</div>
					<h3 class='cityHeader end'>${leg && leg.endName || '? ? ?'}</h3>
				</div>
			</div>


			<form action="#" method="POST" id="addLegForm">
			    <div class="row">
			        <div class="col-8">
			            <div class="form-group">
			                <label for="type">Type</label>
			                <select class="form-control" id="type" name="type">
			                	${_legTypes}
							</select>
			            </div>
			        </div>
			        <div class="col-4">
			            <div class="typeIcon"></div>
			        </div>
			    </div>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="company">Company</label>
			                <select class="form-control" id="company" name="company">
								${_airlines}
			                </select>
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="flightNum">Number</label>
			                <input class="form-control" type="text" id="flightNum" name="flightNum" value="${leg && leg.flightNum || ''}">
			            </div>
			        </div>
			    </div>
			    <hr>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="startDate">Departure Date</label>
			                <input class="form-control" type="date" id="startDate" name="startDate" value=${leg && leg.startTime? moment(leg.startTime).format('YYYY-MM-DD')  : ''} >
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="startTime">Departure Time</label>
			                <input class="form-control" type="time" id="startTime" name="startTime" value=${leg && leg.startTime? moment(leg.startTime).format('HH:MM')  : ''} >
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="startLoc">Departure Location</label>
					<input id="startLoc" type='text'>
				</div>



	                `
	                
		
		html += `</div></div>
			    <hr>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="endDate">Arrival Date</label>
			                <input class="form-control" type="date" id="endDate" name="endDate" value=${leg && leg.startTime? moment(leg.endTime).format('YYYY-MM-DD') :  ''}>
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="endTime">Arrival Time</label>
			                <input class="form-control" type="time" id="endTime" name="endTime" value=${leg && leg.startTime? moment(leg.endTime).format('HH:MM') :  ''}>
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="endLoc">Arrival Location</label>
					<input id="endLoc" type='text'>
				</div>`
        

		html += `<input type="submit" class="btn btn-success" id="saveLeg" tripId="${store.trips.current._id}" value="SAVE">
				</form>`
		$('.rightSide').html(html)



		$('#saveLeg').click(function(e){
			e.preventDefault()
			const $form = $(this).closest('form')
			const tripId = $(this).attr('tripId')
			if(!store.trips.currentLeg) store.trips.currentLeg = {}
			store.trips.currentLeg.type = $form.find('#type').val()
			store.trips.currentLeg.company = $form.find('#company').val()
			store.trips.currentLeg.flightNum = $form.find('#flightNum').val()
			store.trips.currentLeg.startDate = $form.find('#startDate').val()
			store.trips.currentLeg.endDate = $form.find('#endDate').val()
			store.trips.currentLeg.startTime = $form.find('#startTime').val()
			store.trips.currentLeg.endTime = $form.find('#endTime').val()
			store.trips.currentLeg.startLoc = parseLocation(store.startLocTemp) || ''
			store.trips.currentLeg.endLoc = parseLocation(store.endLocTemp) || ''
			if (store.trips.currentLeg._id) {
				handlers.updateLeg()
			} else {
				handlers.addLegToTrip()
			} 
		})

		initMap()
		googleAuto() 
	}

	const parseLocation = (goog)=>{
		if(!goog) return null;
		obj = {};
		 try { obj.city = goog.address_components.find(a=>a.types.includes('locality')).long_name } catch(e) { console.log('no city') }
		 try {obj.cityLong = goog.address_components.find(a=>a.types.includes('administrative_area_level_3')).long_name } catch(e) { console.log('no admin3')}
		try {obj.state = goog.address_components.find(a=>a.types.includes('administrative_area_level_1')).long_name } catch(e) {console.log('no admin1')}
		obj.lat = goog.geometry.location.lat()
		obj.lng = goog.geometry.location.lng()
		obj.name = goog.name
		obj.place_id = goog.place_id
		obj.utcOffset = goog.utc_offset
		obj.address = goog.formatted_address
		obj.phone = goog.formatted_phone_number
		console.log('parseLocation', obj)
		return obj;
	}

	const googleAuto = ()=>{
			// google places autocomplete
			const startInput = document.getElementById("startLoc")
			const endInput = document.getElementById("endLoc") 
			const startAutoComplete = new google.maps.places.Autocomplete(startInput)
			const endAutoComplete = new google.maps.places.Autocomplete(endInput)
	
			startAutoComplete.addListener('place_changed', startACHandler);
			endAutoComplete.addListener('place_changed', endACHandler);
	
			function startACHandler(){
				const place = startAutoComplete.getPlace();
				store.startLocTemp = place; // temporary container
				updateHeaderLocations()
			}
			function endACHandler(){
				const place = endAutoComplete.getPlace();
				store.endLocTemp = place // temporary container
				updateHeaderLocations()
			}
		}
	const updateHeaderLocations = ()=>{
		const start = store.startLocTemp && parseLocation(store.startLocTemp)
		const end = store.endLocTemp && parseLocation(store.endLocTemp)
		if (start) $('.cityHeader.start').text(start.city || start.cityLong || start.state)
		if (end) $('.cityHeader.end').text(end.city || end.cityLong || end.state)
	}





	return {
		render,
	}
})()