const render = (function(){


	function displayTrip(trip){
		if (trip) {  console.log('trip is' , trip) 
			let html =  `<div class="card" style="max-width: 18rem;">
									<h5 class="card-title card-header">
										 <a href="#!"><div class="viewTrip" tripId="${trip._id}">${trip.name}</div></a>
									</h5>
									<div class="card-body">
										<h6 class="card-subtitle mb-2 text-muted">`
			if(trip.timeRange.startTime < Infinity && trip.timeRange.endTime > -Infinity ) {
				html += `${moment(trip.timeRange.startTime).format('MMM Do')} - ${moment(trip.timeRange.endTime).format('MMM Do')}</h6>`
			}  
										html += `
										<div class="list">`
								if (!trip.tripLegs.length){html+= `<span class="list-inline-item"> no dates yet </span>` }
								trip.tripLegs.forEach((leg, i)=> {
									html +=	`<span class="list-inline-item">${leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state }</span>`
									if (i < trip.tripLegs.length - 1) html += `<span class="list-inline-item">	・</span>`
								})
								html +=	`</div>
									</div>
								</div>`
								return html;
							}
		else displayTripForm();
	}
	function displayTripForm(){
		return `<div class="card" style="max-width: 18rem;">
					<div class="card-title card-header"> 
						<input class="form-control" type="text" id="tripName" name="name" placeholder="New Trip Name" >
					</div>
					<div class="card-body">
						<button class="btn btn-success" id="newTripButton" type="submit">Create New Trip</button>
					</div>
				</div> `
	}
	const locToggle = (leg , side)=>{
		// side is either 'start' or 'end'
		// if you pass in a leg, it assumes you want to keep it as is.  if no leg, then you get the google box.
		if (Object.keys(leg).length) {
			return `<p> <strong>${side==='start' ? leg.startLoc.name : leg.endLoc.name }</strong> -
			 ${side === 'start' ? leg.startLoc.address : leg.endLoc.address} 
			 <a href="#!" class='btn btn-sm btn-success changeLoc ${side}'>Change</a></p>`
		}
		else return `<input class="form-control" type="text" id="${side}Loc" name="${side}Loc">`
	}

	const legForm = ()=>{
		const handler = {
			get: function(target, name) {
			return target.hasOwnProperty(name) ? target[name] : ''}
		};
		const currentLeg = store.trips.currentLeg || {}
		const leg = new Proxy(currentLeg, handler);
		if (leg.startLoc){
			leg.startName = leg.startLoc.city || leg.startLoc.cityLong || leg.startLoc.state || 'origin city'
			leg.endName = leg.endLoc.city || leg.endLoc.cityLong || leg.endLoc.state || 'arrival city'
		}
		const _airlines = store.airlines.map(airline=> {
			return `<option value="${airline.name}" ${leg.company === airline.name ? 'selected' : ''}>${airline.name}</option>`
		})
		const _legTypes = store.legTypes.map(opt=>{
        	return `<option value='${opt}' ${leg.type === opt ? 'selected' : ''}> ${opt} </option>`
        })
		// const travelerList = () => {
		// 	let html = '<h4>Travelers</h4><ul>'
		// 	html += store.trips.currentLeg.travelers.map(t=> `<li>${t.firstName} ${t.lastName} <a><small><i class="fas fa-ban delete removeUserFromLeg"></i></small></a></li>`).join('')
		// 	html += '</ul>'
		// 	console.log(html)
		// 	return html
		// }

		let html = `
		<h4 text-center font-weight-bold>${leg.startLoc ? leg.startName + ' <i class="fas fa-arrow-right"></i> ' + leg.endName : 'New Leg' } </h4>
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
			                <input class="form-control" type="text" id="flightNum" name="flightNum" value="${leg.flightNum || ''}">
			            </div>
			        </div>
			    </div>
			    <hr>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="startDate">Departure Date</label>
			                <input class="form-control" type="date" id="startDate" name="startDate" value=${leg.startTime? moment(leg.startTime).format('YYYY-MM-DD')  : ''} >
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="startTime">Departure Time</label>
			                <input class="form-control" type="time" id="startTime" name="startTime" value=${leg.startTime? moment(leg.startTime).format('HH:MM')  : ''} >
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="startLoc">Departure Location</label><div class='startLocSwap'>`
	                html += locToggle(leg, 'start')
		
		html += `</div></div>
			    <hr>
			    <div class="row">
			        <div class="col">
			            <div class="form-group">
			                <label for="endDate">Arrival Date</label>
			                <input class="form-control" type="date" id="endDate" name="endDate" value=${leg.startTime? moment(leg.endTime).format('YYYY-MM-DD') :  ''}>
			            </div>
			        </div>
			        <div class="col">
			            <div class="form-group">
			                <label for="endTime">Arrival Time</label>
			                <input class="form-control" type="time" id="endTime" name="endTime" value=${leg.startTime? moment(leg.endTime).format('HH:MM') :  ''}>
			            </div>
			        </div>
			    </div>
			    <div class="form-group">
	                <label for="endLoc">Arrival Location</label><div class='endLocSwap'>`
        html += locToggle(leg, 'end')

		html += `<input type="submit" class="btn btn-success" id="saveLeg" tripId="${store.trips.current._id}" value="SAVE">
				</form>`

		$('.rightSide').html(html)
	}



	const trips = () => {
		store.setTimeRanges()
// start section
		let html = `<section class="d-flex flex-row justify-content-between  " >`
		if (store.trips.maxIndex > 1) html += `<a class="btn btn-success my-5" id="prevTrips"> <i class="fas fa-arrow-left"></i> </a>`
// add cards for trips
		// html += displayTrip(store.trips[store.trips.maxIndex - 2])
		store.trips.maxIndex === 1 ? html += displayTripForm() : html += displayTrip(store.trips[store.trips.maxIndex - 2])
		if (store.trips[store.trips.maxIndex - 1]) html += displayTrip(store.trips[store.trips.maxIndex - 1])
		if (store.trips[store.trips.maxIndex]) html += displayTrip(store.trips[store.trips.maxIndex])
// close off section
			if (store.trips.maxIndex < store.trips.length - 1) html += `<a class="btn btn-success my-5" id="nextTrips"> <i class="fas fa-arrow-right"></i> </a>`
			html += `</section>`
		
		$('.topRow').html(html)
	}
	
	

	return {
		// trips,  legForm, locToggle
	}
})()