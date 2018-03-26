const renderUsers = (()=>{


	const editUser = user => {
		// const { firstName, lastName, userName, email,
		// 		phone, homeAirport, _id } = user;
		const form = 
		`<form action="#!" id="addEditUser">
			<div class="input"><label for="firstName">FIRST NAME</label><input type="text" id="firstName"></div>
			<div  class="input"><label for="lastName">LAST NAME</label><input type="text" id="lastName"></div>
			<div  class="input"><label for="userName">USER NAME</label><input type="text" id="userName"></div>
			<div  class="input"><label for="email">EMAIL</label><input type="text" id="email"></div>
			<div  class="input"><label for="phone">PHONE</label><input type="text" id="phone"></div>
			<div  class="input"><label for="homeAirport">HOME AIRPORT</label><input type="text" id="homeAirport"></div>
			<div class="submit">
				<input type="submit" value="submit">
			</div>
		</form>`

		return form;
	};

	const listDiv = ( users = [] ) => {
		usersHtml = users.map(user=>{
			return `<li>${user.firstName}</li>`
		})
		return `<ul>` + usersHtml + '</ul>'
	};
	const editDiv = (user)=>{
		return editUser()
	};
	const footer = ()=>{
		return `hey whatsup footer`
	};

	const dom = ()=>{
		$('#app').html(
		`<div class="container">
			<div class="mainGrid">
				<section class="navDiv">${listDiv()}</section>
				<section class="listDiv">${listDiv()}</section>
				<section class="editDiv">${editDiv()}</section>
				<footer class="footer">${footer()}</footer>
			</div>
		</div>`)

	}


	return {
		dom,
	}
})()