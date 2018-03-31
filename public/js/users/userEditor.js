const userEditor = (function(){

	const userForm = ()=> { 
			const user = store.currentUser._id && store.currentUser

			const userImageDisplay = title => {
				return `<div class='carousel-cell' id="${title} "imgName='${title}'>
							<img src='/people/${title}' >
						</div>`
			}
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
					<button type="submit" class='btn btn-sm btn-success ${user?'updateUserButton':'submitNewUserButton'}'>${user?'UPDATE':'SAVE'}</button>
				</div>
				<div style="grid-area: avatar; width: 250px;">
					<div id='avatarChooser' >
						${store.peopleSVGs.map( title => userImageDisplay(title) ).join('') }
					</div>
				</div>
				<div class="avatarNameDisplay">
					<p><span id="displayFirstName">${user?user.firstName:''}</span> 
					<span id="displayLastName">${user?user.lastName:''}</span></p>
				</div>
			</form>`
	}

	const render = ()=>{
		$('.rightSide').html(userForm())
		$('#avatarChooser').flickity({
			cellAlign: 'center',
			pageDots: false,
			wrapAround: true
			});
		const avatarIndex = store.peopleSVGs.indexOf(store.currentUser && store.currentUser.avatar)
		$('#avatarChooser').flickity('selectCell', avatarIndex)
		$('#firstName').on('keyup', function(){
			$('#displayFirstName').text( $(this).val() )
		})
		$('#lastName').on('keyup', function(){
			$('#displayLastName').text( $(this).val() )
		})


		function putUserInfoIntoStore(){
			store.currentUser.avatar = $('#avatarChooser .is-selected').attr('imgname')
			store.currentUser.firstName = $('#firstName').val()
			store.currentUser.lastName = $('#lastName').val()
			store.currentUser.email = $('#email').val()

		}
		$('.submitNewUserButton').click(function(e){
			e.preventDefault()
			putUserInfoIntoStore()
			$('#firstName').val('')
			$('#lastName').val('')
			$('#email').val('')
			handlers.addNewUser()
		})
		$('.updateUserButton').click(function(e){
			e.preventDefault()
			putUserInfoIntoStore()
			handlers.updateUser()
		})
	}
	return {
		render,
	}
})()