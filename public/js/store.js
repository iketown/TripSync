const store = (() => {

	const trips = []
	const users = []

	const sortTrips = function() {
		this.trips.forEach(trip => trip.tripLegs.sort((a, b) => a.startMoment - b.startMoment))
		this.trips.sort((a, b) => a.timeRange.startMoment - b.timeRange.startMoment)
	}

	const setTimeRanges = function() {
		this.trips.forEach(trip => {
			let timeArr = []
			trip.tripLegs.forEach(leg => {
				timeArr.push(leg.startMoment)
				timeArr.push(leg.endMoment)
			})
			trip.timeRange = {
				startMoment: Math.min(...timeArr),
				endMoment: Math.max(...timeArr)
			}
		})
		this.sortTrips()
	}
	const removeLeg = function() {
		const deleteId = this.currentLeg._id
		this.current.tripLegs = this.current.tripLegs.filter(leg => leg._id !== deleteId)
	}
	const updateTrip = function(newTrip) {
		for (let i = 0; i < store.trips.length; i++) {
			if (store.trips[i]._id === newTrip._id) {
				store.trips[i] = newTrip
			}
		}
	}
	const colors = [
		"#3d5afe", // blue
		"#1b5e20", // green
		"#ff3d00", // orange
		"#5d4037", // brown
		"#b71c1c", // red,
	]

	const airlines = [{
		name: "Alaska",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Allegiant",
		logoUrl: '',
		abbr: ''
	}, {
		name: "American",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Delta",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Frontier",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Hawaiian",
		logoUrl: '',
		abbr: ''
	}, {
		name: "JetBlue",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Southwest",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Spirit",
		logoUrl: '',
		abbr: ''
	}, {
		name: "United",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Uber",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Lyft",
		logoUrl: '',
		abbr: ''
	}, {
		name: "Other",
		logoUrl: '',
		abbr: ''
	}]
	const legTypes = [
		"Flight",
		"Ground",
		"Other",
	]
	const mapArrowOptions = {
		selected: {
			strokeColor: 'salmon',
			strokeWeight: 3,
			zIndex: 2
		},
		unSelected: {
			strokeWeight: 1,
			strokeColor: 'black',
			geodesic: true,
			zIndex: 1,
			icons: [{
				icon: {
					path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
					scale: 2
				},
				offset: '100%'
			}]
		}
	}
	const peopleSVGs = ["woman.svg", "man-1.svg", "woman-1.svg", "man-2.svg", "woman-2.svg", "man-3.svg", "woman-3.svg", "man-4.svg", "man-5.svg", "woman-4.svg", "man-6.svg", "woman-5.svg", "man-7.svg", "woman-6.svg", "punk.svg", "woman-7.svg"]
	const oldMapStyle = [{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
			"color": "#e9e9e9"
		}, {
			"lightness": 17
		}]
	}, {
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f5f5f5"
		}, {
			"lightness": 20
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [{
			"color": "#ffffff"
		}, {
			"lightness": 17
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#ffffff"
		}, {
			"lightness": 29
		}, {
			"weight": 0.2
		}]
	}, {
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [{
			"color": "#ffffff"
		}, {
			"lightness": 18
		}]
	}, {
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [{
			"color": "#ffffff"
		}, {
			"lightness": 16
		}]
	}, {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f5f5f5"
		}, {
			"lightness": 21
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [{
			"color": "#dedede"
		}, {
			"lightness": 21
		}]
	}, {
		"elementType": "labels.text.stroke",
		"stylers": [{
			"visibility": "on"
		}, {
			"color": "#ffffff"
		}, {
			"lightness": 16
		}]
	}, {
		"elementType": "labels.text.fill",
		"stylers": [{
			"saturation": 36
		}, {
			"color": "#333333"
		}, {
			"lightness": 40
		}]
	}, {
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f2f2f2"
		}, {
			"lightness": 19
		}]
	}, {
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [{
			"color": "#fefefe"
		}, {
			"lightness": 20
		}]
	}, {
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#fefefe"
		}, {
			"lightness": 17
		}, {
			"weight": 1.2
		}]
	}]
	const mapStyle = [{
		"featureType": "water",
		"elementType": "all",
		"stylers": [{
			"visibility": "simplified"
		}, {
			"hue": "#e9ebed"
		}, {
			"saturation": -78
		}, {
			"lightness": 67
		}]
	}, {
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [{
			"visibility": "simplified"
		}, {
			"hue": "#ffffff"
		}, {
			"saturation": -100
		}, {
			"lightness": 100
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"visibility": "simplified"
		}, {
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": 31
		}]
	}, {
		"featureType": "poi",
		"elementType": "all",
		"stylers": [{
			"visibility": "off"
		}, {
			"hue": "#ffffff"
		}, {
			"saturation": -100
		}, {
			"lightness": 100
		}]
	}, {
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [{
			"visibility": "simplified"
		}, {
			"hue": "#e9ebed"
		}, {
			"saturation": -90
		}, {
			"lightness": -8
		}]
	}, {
		"featureType": "transit",
		"elementType": "all",
		"stylers": [{
			"visibility": "on"
		}, {
			"hue": "#e9ebed"
		}, {
			"saturation": 10
		}, {
			"lightness": 69
		}]
	}, {
		"featureType": "administrative.locality",
		"elementType": "all",
		"stylers": [{
			"visibility": "on"
		}, {
			"hue": "#2c2e33"
		}, {
			"saturation": 7
		}, {
			"lightness": 19
		}]
	}, {
		"featureType": "road",
		"elementType": "labels",
		"stylers": [{
			"visibility": "on"
		}, {
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": 31
		}]
	}, {
		"featureType": "road.arterial",
		"elementType": "labels",
		"stylers": [{
			"visibility": "simplified"
		}, {
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": -2
		}]
	}]

	return {
		airlines,
		legTypes,
		sortTrips,
		setTimeRanges,
		mapArrowOptions,
		mapStyle,
		peopleSVGs,
		colors,
		removeLeg,
		updateTrip,
		trips,
		users,
	}
})()