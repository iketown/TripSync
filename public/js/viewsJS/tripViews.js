
const getTripJson = async (tripId) => {
	const json = await axios.get(`/admin/trips/${tripId}`)
	return json.data;
}


const displayTrip = async (tripId) => {
	const trip = await getTripJson(tripId)


	

	let html = `
	<h1>${trip.name}</h1>
	`
	return html;
}