
const userHeader = (function(){

	const render = ()=>{

		function userCards(){
			return	store.users.map(user => {
				 return `
					<div class='carousel-cell' style="background-image: url('/people/${user.avatar}');">
						<div class='emptyImageDiv'></div>
						<div class='userName editUserLink' userId="${user._id}">
							<p><a href="#">${user.firstName}<br>${user.lastName}</a></p> 
						</div>
						<button class='btn btn-sm btn-light userOut' style="background: white;" >ADD</button>
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
					<button class='btn btn-sm btn-light userOut' style="background: white;">ADD</button>
				</div> 
			`
		}
		const carouselHTML = `
			<div class='user-carousel'>
				${userCards()}
				${newUserCardForm()}
			</div>
		`
		const userImageDisplay = title => {
			return `<div class='carousel-cell' id="${title} "imgName='${title}'>
						<img src='/people/${title}' >
					</div>`
		}
		const newUserForm = (user) =>{
			return `
			<form class="newUserForm">
				<div class='form-group' style="grid-area: firstName;">
					<label for='firstName'> First Name </label>
					<input type='text' id='firstName' class='form-control' required value="${user?user.firstName:''}">
				</div>
				<div class='form-group' style="grid-area: lastName;">
					<label for='lastName'> Last Name </label>
					<input type='text' id='lastName' class='form-control' value="${user?user.lastName:''}" required>
				</div>
				<div class='form-group' style="grid-area: email;">
					<label for='email'> Email </label>
					<input type='email' id='email' class='form-control' value="${user?user.email:''}" required>
				</div>
				<div class='form-group' style="grid-area: save;">
					<button type="submit" class='btn btn-sm btn-success ${user?'updateUserButton':'submitNewUserButton'}'>${user?'SAVE':'UPDATE'}</button>
				</div>
				<div style="grid-area: avatar; width: 250px;">
					<h3> Choose Avatar </h3>
					<div id='avatarChooser' >
						${store.peopleSVGs.map( title => userImageDisplay(title) ).join('') }
					</div>
				</div>
				<div class="avatarNameDisplay">
					<p><span id="displayFirstName">${user?user.firstName:''}</span> 
					<span id="displayLastName">${user?user.lastName:''}</span></p>
				</div>
			</form>
				`
		}






		// populate and carousel-ify top user header
		$('.topRow').html(carouselHTML)

		// set up user form modal

		$('.user-carousel').flickity({
			cellAlign: 'center',
			contain: true
		})

		 $('#userFormModal').html(newUserForm(null))
		 $('#userFormModal').iziModal();
			// attach carousel to picture gallery
		$('#avatarChooser').flickity({
			cellAlign: 'center',
			pageDots: false,
		})
// iziModal open command 
		$('.addNewTraveler').click( function(e){
				// create and open the modal
		$('#userFormModal').iziModal('open')
		$('#avatarChooser').flickity('resize')
		});
		// auto update the name on input field
		$('#firstName').on('keyup', function(){
			$('#displayFirstName').text( $(this).val() )
		})
		$('#lastName').on('keyup', function(){
			$('#displayLastName').text( $(this).val() )
		})
		$('.submitNewUserButton').click(function(e){
			e.preventDefault()
			const avatar = $('#avatarChooser .is-selected').attr('imgname')
			const firstName = $('#firstName').val()
			const lastName = $('#lastName').val()
			const email = $('#email').val()
			// validate here, if it doesn't work return out of this function
			store.newUser = {avatar, firstName, lastName, email}
			console.log('store.newUser', store.newUser)
			$('#firstName').val('')
			$('#lastName').val('')
			$('#email').val('')
			handlers.addNewUser()
		})
// edit a user profile
		$('.topRow').on('click', '.editUserLink', function(){
			let userId = $(this).attr('userId')
			let user = store.users.find(user=> user._id === userId)
			$('#userFormModal').html( newUserForm(user) )
			store.editingUser = user
			$('#avatarChooser').flickity({
				cellAlign: 'center',
				pageDots: false,
				});
			 // $('#userFormModal').iziModal();
			$('#userFormModal').iziModal('open')
			$('#avatarChooser').flickity('selectCell', `#${user.avatar}`)
			$('#avatarChooser').flickity('resize')

		})
	}








return {
	render,


}

})()

