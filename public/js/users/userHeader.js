
const userHeader = (function(){

	const render = ()=>{

		function userCards(){
			// first sort them by presense in current leg, if that exists
			if (store.trips.currentLeg) {
				let legTravelers = store.trips.currentLeg.travelers
				store.users.sort((user, others)=>{
					return legTravelers.filter(t=>t._id === others._id).length - legTravelers.filter(t=>t._id === user._id).length
				})
			}

			return	store.users.map(user => {
				let inCurrentLeg = store.trips.currentLeg && store.trips.currentLeg.travelers.find(t=> t._id === user._id)
				 return `
					<div class='carousel-cell' style="background-image: url('/people/${user.avatar}');">
						<div class="addUserToLeg" userId="${user._id}" style="display:none;">ADD</div>
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
			store.currentUser = null;
			userEditor.render()
		});
		$('.topRow').on('click', '.editUserLink', function(){
			let userId = $(this).attr('userId')
			store.currentUser = store.users.find(user=> user._id === userId)
			userEditor.render()
		})

		highlight()
		attachListeners()
	}

highlight = ()=>{
	$('.user-carousel .carousel-cell').each( function(index){
		let userId = $(this).find('.userName').attr('userid')
		if (store.trips.currentLeg && !store.trips.currentLeg.travelers.find(user=> user._id === userId)) {
			$(this).fadeTo(100, .5)
			$(this).find('.addUserToLeg').show()
		} else {
			$(this).fadeTo(100, 1)
			$(this).find('.addUserToLeg').hide()
		}
	})
}
attachListeners = ()=>{
	// $('.user-carousel .carousel-cell').on('click', '.addUserToLeg', function(){
		$('.addUserToLeg').click(function(){
		let userId = $(this).closest('.carousel-cell').find('.userName').attr('userid')
		console.log(userId)
		const user = store.users.find( u => u._id === userId)
		console.log('the user is', user)
		if ( !store.trips.currentLeg.travelers.find(t => t._id === userId) ){
			store.trips.currentLeg.travelers.push(user)
		} 
		console.log('updated leg', store.trips.currentLeg)
		handlers.updateLegUsers()
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

