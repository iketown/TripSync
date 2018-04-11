const api = (function() {

	// only get and return data,  dont touch store, don't touch DOM

	const signIn = (me) => {
		return axios.post('/auth/signin', me)
	}
	const signUp = (me) => {
		return axios.post('/auth/signup', me)
			.then(res => res.data)
	}
	const getEventsOnLoad = (events) => {
		return axios.get('/admin')
			.then(res => res.data)
	}
	const addUpdateTrip = (tripId, tripName) => {
		return axios.post(`/admin/trips/${tripId}`, {
				tripName
			})
			.then(myTrips => myTrips.data)
	}
	const deleteTrip = (tripId) => {
		return axios.delete(`/admin/trips/${tripId}`)
			.then(res => res.data)
	}
	const deleteLeg = (legId) => {
		return axios.delete(`/admin/legs/${legId}`)
	}
	const addLegToTrip = (tripId, leg) => {
		return axios.post(`/admin/legs/addLegToTrip/${tripId}`, leg)
			.then(res => res.data)
	}
	const updateLeg = (leg) => {
		return axios.post(`/admin/legs/${leg._id}`, leg)
			.then(res => res.data)
	}
	const addNewUser = () => {
		return axios.post('/admin/users', store.currentUser)
			.then(res => res.data)
	}
	const updateUser = (updateObj, userId) => {
		return axios.post(`/admin/users/${userId}`, updateObj)
			.then(res => res.data)
	}
	const updateLegUsers = (legId, userIds) => {
		return axios.post(`/admin/legs/updateUsers/${legId}`, userIds)
	}
	const removeUser = (userId) => {
		return axios.delete(`/admin/users/${userId}`)
			.then(res => res.data)
	}


	return {
		getEventsOnLoad,
		addUpdateTrip,
		deleteTrip,
		deleteLeg,
		signIn,
		signUp,
		addLegToTrip,
		updateLeg,
		addNewUser,
		updateUser,
		updateLegUsers,
		removeUser,
	}
})()