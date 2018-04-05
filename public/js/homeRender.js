const homeRender = (function(){

	const nav = () => {
		const signedInHtml = `
                <div class="navBarMe">
                    <p class='text-white me'>${store.me && store.me.email}</p>
                    <p class='signOut btn'><strong><a href='/auth/signout'>SIGN OUT</a></strong></p>
                </div>
		`
		const navHtml = `
            <a class="navbar-brand" href="/">TripSync</a>
                ${store.me ? signedInHtml : ''}
            `

		$('.navDiv').html(navHtml)		
	}

	const intro = () => {
		const introHtml = `
            <header class='logo'><h1>TripSync</h1></header>
            <h3>group travel made simple</h3>
		`
		$('.leftSide').html(introHtml)
	}
	const signInForm = () => {
		const signInHtml = `
			<h2>Please Sign In</h2>
			<div class="form-group signInForm">
			    <label  for="emailInput">Email</label>
			    <input class= "form-control" type="email" id="emailInput" name="email">
			    <br>
			    <label for="passwordInput">Password</label>
			    <input class= "form-control" type="password" id="passwordInput" name="password">
			    <div class='mt-4 d-flex justify-content-around'>
				    <button id="signInButton" class="btn-success btn btn-sm">SIGN IN</button>
				    <div class="d-flex flex-column align-items-center justify-content-end">
					    <p class='mb-0'>not yet registered?</p>
					    <button id="signUpButton" class='btn btn-sm btn-info'>SIGN UP HERE</button>
				    </div>
			    </div>
			</div>
		`
		$('.rightSide').html(signInHtml)

		$('#signInButton').click(function(){
			console.log('signin button clicked')
			const me = {}
			me.email = $('#emailInput').val()
			me.password = $('#passwordInput').val()
			handlers.signIn(me)
		})
		$('#signUpButton').click(function(){
			signUpForm()
		})
	}
	const signUpForm = () => {
		const signUpHtml = `
			<h4>Sign Up</h4>
			<div class='wholeForm'>
			<div class='row'>
				<div class='form-group col-md-6'>
					<label for="firstName">First Name</label>
					<input type='firstName' id='firstName' name='firstName' class='form-control' required>
				</div>
				<div class='form-group col-md-6'>
					<label for="lastName">Last Name</label>
					<input type='lastName' id='lastName' name='lastName' class='form-control' required>
				</div>
			</div>
			<div class='form-group'>
				<label for="email">Email</label>
				<input type='email' id='email' name='email' class='form-control' required>
			</div>
			<div class='form-group'>
				<label for="password">Password</label>
				<input type='password' id='password' name='password' class='form-control' required>
			</div>
			<button class='btn btn-success' id='signUpButton'>SIGN UP</button>
			</div>
		`
		$('.rightSide').html(signUpHtml)
		$('#signUpButton').click(function(event){
			const me = {}
			me.firstName = $('#firstName').val()
			me.lastName = $('#lastName').val()
			me.email = $('#email').val()
			me.password = $('#password').val()
			handlers.signUp(me)
		})
	}

	return {
		nav,
		intro,
		signInForm,
		signUpForm,

	}
})()