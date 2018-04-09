const legRender = (function(){

	const travelerList = ()=>{
		if (store.currentLeg){
			return store.currentLeg.travelers.map(t=>{
				return `<li><div class="legTraveler">${t.firstName} ${t.lastName}</div></li>`
			}).join('')
		} else {
			return ''
		}
	}
	const edit = () => {
		const leg = store.currentLeg
		// boolean of if its new or update
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
		let html = ()=>{
			return `
			<div class="mapHeader">
				<div id="googleLegMap"></div>
				<div class="legHeader">
					<ul class='legTravelerList'>
						${travelerList()}
					</ul>
					
					<div class='fromto'>traveling from</div>
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
			                <input class="form-control" type="date" id="startDate" name="startDate" value=${leg && leg.startMoment? moment(leg.startMoment).format('YYYY-MM-DD')  : ''} >
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="startTime">Departure Time</label>
			                <input class="form-control" type="time" id="startTime" name="startTime" value=${leg && leg.startMoment? moment(leg.startMoment).format('HH:MM')  : ''} >
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="startLoc">Departure Location (auto lookup)</label>
					<input class='form-control' id="startLoc" type='text' value="${leg && leg.startLoc?leg.startLoc.address:''}">
				</div>
			    <hr>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="endDate">Arrival Date</label>
			                <input class="form-control" type="date" id="endDate" name="endDate" value=${leg && leg.startMoment? moment(leg.endMoment).format('YYYY-MM-DD') :  ''}>
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="endTime">Arrival Time</label>
			                <input class="form-control" type="time" id="endTime" name="endTime" value=${leg && leg.startMoment? moment(leg.endMoment).format('HH:MM') :  ''}>
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="endLoc">Arrival Location</label>
					<input class="form-control" id="endLoc" type='text' value="${leg && leg.endLoc?leg.endLoc.address:''}">
				</div>
				<hr>
				<div class="button-group">
					<input type="submit" class="btn btn-success" id="saveLeg" tripId="${store.current._id}" value="${leg?'UPDATE':'SAVE'}">
					<input type="submit" class="btn btn-danger" id="deleteLeg" tripId="${store.current._id}" value="DELETE" ${leg?'':'hidden'}>
				</div>
			</form>`
		}

			$('.rightSide').html( html() );



			$('#addLegForm').submit(function(e){
				e.preventDefault()
				const $form = $(this).closest('form')
				const tripId = $(this).attr('tripId')
				if(!store.currentLeg) store.currentLeg = {} // if it doesn't exist make it an empty object
				store.currentLeg.type = $form.find('#type').val()
				store.currentLeg.company = $form.find('#company').val()
				store.currentLeg.flightNum = $form.find('#flightNum').val()
				const startDate = $form.find('#startDate').val()
				const endDate = $form.find('#endDate').val()
				const startTime = $form.find('#startTime').val()
				const endTime = $form.find('#endTime').val()
				store.currentLeg.startMoment = moment(startDate+"-"+startTime, "YYYY-MM-DD-HH:mm")
				store.currentLeg.endMoment = moment(endDate+"-"+endTime, "YYYY-MM-DD-HH:mm")
				if (store.startLocTemp) store.currentLeg.startLoc = parseLocation(store.startLocTemp)
				if (store.endLocTemp) store.currentLeg.endLoc = parseLocation(store.endLocTemp)
				if (store.currentLeg._id) {
					console.log('update leg was called')
					handlers.updateLeg()
				} else {
					handlers.addLegToTrip()
				} 
			})

			$('#deleteLeg').click(function(e){
				e.preventDefault()
				handlers.deleteLeg()
			})

		const parseLocation = (goog)=>{
			if(!goog) return null;
			obj = {};
			obj.address = goog.formatted_address
			 try { obj.city = goog.address_components.find(a=>a.types.includes('locality')).long_name } catch(e) { console.log('no city') }
			 try {obj.cityLong = goog.address_components.find(a=>a.types.includes('administrative_area_level_3')).long_name } catch(e) { console.log('no admin3')}
			try {obj.state = goog.address_components.find(a=>a.types.includes('administrative_area_level_1')).long_name } catch(e) {console.log('no admin1')}
			obj.name = obj.city || obj.cityLong || obj.state || 'no name'
			obj.lat = goog.geometry.location.lat()
			obj.lng = goog.geometry.location.lng()
			obj.place_id = goog.place_id
			obj.utcOffset = goog.utc_offset
			console.log('parsed Location:', obj)
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
		const updateHeaderLocations = ()=>{ // so it fills in under the pic while you type your name
			const start = store.startLocTemp && parseLocation(store.startLocTemp)
			const end = store.endLocTemp && parseLocation(store.endLocTemp)
			if (start) $('.cityHeader.start').text(start.city || start.cityLong || start.state)
			if (end) $('.cityHeader.end').text(end.city || end.cityLong || end.state)
		}



		mapRender.leg() 
		googleAuto() 
			
	}
	return {
		edit,
		travelerList,

	}	
})()