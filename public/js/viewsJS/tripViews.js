
const getTripJson = async (tripId) => {
	const json = await axios.get(`/admin/trips/${tripId}`)
	return json.data;
}

const getMyTrips = async(userId) => {
	// const myTrips = await axios.get(`/admin/${}/trips`)
}

const displayTrip = async (tripId) => {
	const trip = await getTripJson(tripId)
	let html = `
	<h1>${trip.name}</h1>
	`
	return html;
}

const newTripForm = userId => {
	const html = `
	<form>
	</form>
	`
}