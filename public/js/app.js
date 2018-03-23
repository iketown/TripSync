$( function(){

	axios.get('/home/store')
		.then(results => {
			store.data = results.data
		})

	// admin home page listeners
	$('.tripListLink').on('click', async function(e){
		const tripId = this.id;
		const tripJson = await displayTrip(tripId)
		$('#4middle').html(tripJson)
	})

	






} )