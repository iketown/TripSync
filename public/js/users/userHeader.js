
const userHeader = (function(){

	const render = ()=>{

		function userCards(){
			// first sort them by presense in current leg, if that exists
			if (store.trips.currentLeg) {
				let legTravelers = store.trips.currentLeg.travelers
				console.log('leg Travelrs =', legTravelers)
				store.users.sort((user, others)=>{
					return legTravelers.filter(t=>t._id === others._id).length - legTravelers.filter(t=>t._id === user._id).length
				})
			}

			return	store.users.map(user => {
				// let inCurrentLeg = store.trips.currentLeg && store.trips.currentLeg.travelers.find(t=> t._id === user._id)
				 return `
					<div class='carousel-cell' style="background-image: url('/people/${user.avatar}');">
						<div class="addUserToLeg" userId="${user._id}" style="display:none;">ADD</div>
						<div class="removeUserFromLeg" userId="${user._id}" style="display: none;"><i class="fas fa-ban delete removeUserFromLeg"></i></div>
						<div class='emptyImageDiv'></div>
						<div class='userName editUserLink' userId="${user._id}">
							<p><a href="#" >${user.firstName}<br>${user.lastName}</a></p> 
						</div>
						
					</div> 
				`
			}).join('')
		}
		function newUserCardForm(){
			return `
				<div class='carousel-cell addNewTraveler'>
					<div class='emptyImageDiv'></div>
					<div class='userName'>
						<p>NEW<br>
						TRAVELER</p>
					</div>
				</div> 
			`
		}
		const carouselHTML = `
			<div class='user-carousel'>
				${userCards()}
				${newUserCardForm()}
			</div>
		`

		// populate and carousel-ify top user header
		$('.topRow').html(carouselHTML)

		// set up user form modal

		$('.user-carousel').flickity({
			cellAlign: 'center',
			contain: true
		})

// edit a user profile
		$('.topRow').on('click', '.addNewTraveler', function(e){
			store.currentUser = {};
			userEditor.render()
		});
		$('.topRow').on('click', '.editUserLink', function(){
			let userId = $(this).attr('userId')
			store.currentUser = store.users.find(user=> user._id === userId)
			userEditor.render()
		})

		this.highlight()
		this.attachListeners()
	}

highlight = ()=>{
	$('.user-carousel .carousel-cell').each( function(index){
		let userId = $(this).find('.userName').attr('userid')
		if (store.trips.currentLeg && !store.trips.currentLeg.travelers.find(user=> user._id === userId)) {
			// the OUT crowd
			$(this).fadeTo(100, .5)
			$(this).find('.addUserToLeg').show()
			$(this).find('.removeUserFromLeg').hide()
			$(this).addClass('zoomOut')
		} else if (store.trips.currentLeg && store.trips.currentLeg.travelers.find(user=> user._id === userId)) {
			// the IN crowd
			$(this).fadeTo(100, 1)
			$(this).find('.addUserToLeg').hide()
			$(this).find('.removeUserFromLeg').show()
			$(this).removeClass('zoomOut')
		}
		$('.user-carousel').flickity('resize')
	})
}
attachListeners = ()=>{
		$('.addUserToLeg').click(function(){
			let userId = $(this).closest('.carousel-cell').find('.userName').attr('userid')
			console.log(userId)
			const user = store.users.find( u => u._id === userId)
			console.log('the user is', user)
			if ( !store.trips.currentLeg.travelers.find(t => t._id === userId) ){
				store.trips.currentLeg.travelers.push(user)
			} 
			handlers.updateLegUsers()
		})
		$('.removeUserFromLeg').click(function(){
			let userId = $(this).closest('.carousel-cell').find('.userName').attr('userid')
			if ( store.trips.currentLeg.travelers.find(t => t._id === userId) ){
				store.trips.currentLeg.travelers = store.trips.currentLeg.travelers.filter(t=> t._id !== userId)
				handlers.updateLegUsers()
			} 
		})
}
sort = ()=>{

}






return {
	render,
	highlight,
	attachListeners,
}

})()

