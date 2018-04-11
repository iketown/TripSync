const handlers = (() => {

  const signUp = (e) => {
    e.preventDefault()
    const me = {}
    me.firstName = $('#firstName').val()
    me.lastName = $('#lastName').val()
    me.email = $('#email').val()
    me.password = $('#password').val()
    api.signUp(me)
      .then(data => {
        store.me = data
        return api.getEventsOnLoad();
      })
      .then(() => {
        tripRender.accordion()
        userHeader.render()
        tripRender.allTrips()
        homeRender.nav()
      })
      .catch(err => {
        console.log('signup err', err)
        homeRender.signInForm()
      })
  }
  const signIn = (e) => {
    e.preventDefault()
    const me = {}
    me.email = $('#emailInput').val()
    me.password = $('#passwordInput').val()
    api.signIn(me)
      .then(() => api.getEventsOnLoad())
      .then(data => {
        store.trips = data.myTrips;
        store.setTimeRanges()
        store.me = data.me
        store.users = data.me.travelers;
        tripRender.accordion()
        userHeader.render()
        tripRender.allTrips()
        homeRender.nav()
      })
      .catch(err => {
        toastr.error('Email / Password not recognized')
        console.log('error from signin handler', err.response)
      })
  }
  const signUpButton = () => {
    homeRender.signUpForm()
  }
  const selectTrip = function() {
    store.currentLeg = null
    userHeader.render()
    let tripId = $(this).attr('tripId')
    const trip = store.trips.find(trip => trip._id === tripId)
    store.current = trip
    tripRender.viewTrip()
  }

  const fillOutForm = () => {
    const $form = $('#addLegForm')
    $form.find('#type').val(store.legTypes[Math.floor(Math.random() * 3)])
    $form.find('#company').val(store.airlines[Math.floor(Math.random() * store.airlines.length)].name)
    $form.find('#flightNum').val(Math.floor(Math.random() * 10000))
    const startDate = moment(faker.date.future())
    $form.find('#startDate').val(startDate.format('YYYY-MM-DD'))
    $form.find('#endDate').val(startDate.add(7, 'days').format('YYYY-MM-DD'))
    $form.find('#startTime').val(moment(faker.date.future()).format('HH:MM'))
    $form.find('#endTime').val(moment(faker.date.future()).format('HH:MM'))
    return 'ok'
  }
  const selectLeg = function() {
    let legId = $(this).attr('legId')
    let leg = store.current.tripLegs.find(leg => leg._id === legId)
    store.currentLeg = leg
    $(this).closest('#tripFullList').find('.legListItem').removeClass('selectedLeg')
    $(this).addClass('selectedLeg')
    legRender.edit()
    userHeader.render()
  }

  const newLegForm = function() {
    let tripId = $(this).attr('tripId')
    store.currentLeg = {travelers: []}
    $(this).closest('#tripFullList').find('.legListItem').removeClass('selectedLeg')
    $(this).addClass('selectedLeg')
    userHeader.render()
    legRender.edit()
  }
  const newTripForm = function() {
    store.current = null
    tripRender.edit()
  }

  const addLegToTrip = () => {
    const tripId = store.current._id
    console.log('tripId', tripId)
    let leg = store.currentLeg
    leg.line = null
    api.addLegToTrip(tripId, leg)
      .then(updatedTrip => {
        for (let i = 0; i < store.trips.length; i++) {
          if (store.trips[i]._id === updatedTrip._id) store.trips[i] = store.current = updatedTrip
        }
        tripRender.accordion()
        tripRender.allTrips()
        toastr.success('Leg Added 👍')
      })
      .catch(err => console.error(err))
  }
  const updateLeg = () => {
    let leg = store.currentLeg
    leg.line = null // otherwise JSON circular reference
    api.updateLeg(leg)
      .then(response => {
        const newTrip = response
        for (var i = store.trips.length - 1; i >= 0; i--) {
          if (store.trips[i]._id === newTrip._id) store.trips[i] = newTrip
        }
        tripRender.accordion()
        tripRender.allTrips()
        toastr.success('Leg Updated 👍')
      })
      .catch(err => console.error(err))
  }

  const addNewUser = () => {
    api.addNewUser()
      .then(response => {
        if (response.errmsg) {
          toastr.error(`${store.currentUser.email} is already registered.  Please try again`)
          store.currentUser = {}
          userEditor.render()
        } else {
          store.users = response.travelers
          userHeader.render()
          toastr.success('New User created 👍')
        }
      })
      .catch(e => console.log(e))
  }
  const updateUser = () => {
    const {
      firstName,
      lastName,
      email,
      avatar,
      _id: userId
    } = store.currentUser
    const updateObj = {
      firstName,
      lastName,
      email,
      avatar
    }
    api.updateUser(updateObj, userId)
      .then(response => {
        toastr.success(`${firstName} was updated.`)
        console.log('response from update user', response)
        userHeader.render()
        tripRender.allTrips()
      })
      .catch(err => console.log(err))
  }
  const updateLegUsers = () => {
    if (store.currentLeg && store.currentLeg._id) {
      const leg = store.currentLeg
      let legId = leg._id
      let userIds = leg.travelers.map(t => t._id)
      api.updateLegUsers(legId, userIds)
        .then(() => {
          userHeader.render()
          $('.legTravelerList').hide().html(legRender.travelerList()).fadeIn()
        })
        .catch(err => console.log(err))
    } else {
      userHeader.render()
      $('.legTravelerList').hide().html(legRender.travelerList()).fadeIn()
    }
    }
  const deleteLeg = (e) => {
    e.preventDefault()
    let legId = store.currentLeg._id
    api.deleteLeg(legId)
      .then(res => {
        store.removeLeg()
        tripRender.viewTrip()
        tripRender.accordion()
        toastr.success('leg deleted')
      })
  }
  const hoverLeg = function() {
    const legId = $(this).attr('legId')
    const line = store.current.tripLegs.find(leg => leg._id === legId).line
    line.setOptions(store.mapArrowOptions.selected)
  }
  const unhoverLeg = function() {
    const legId = $(this).attr('legId')
    const line = store.current.tripLegs.find(leg => leg._id === legId).line
    line.setOptions(store.mapArrowOptions.unSelected)
  }

  const updateTrip = function(e) {
    e.preventDefault()
    store.current.name = $('#tripName').val()
    addUpdateTrip()
  }
  const addTrip = function(e) {
    e.preventDefault()
    store.current = {}
    store.current.name = $('#tripName').val()
    addUpdateTrip()
  }
  const addUpdateTrip = () => {

    const tripName = store.current.name
    const tripId = store.current._id || ''
    api.addUpdateTrip(tripId, tripName)
      .then(myTrips => {
        console.log('myTrips', myTrips)
        store.trips = myTrips.trips
        tripRender.accordion()
        tripRender.viewTrip()
        store.current = myTrips.newTrip
        toastr.success(`Trip "${store.current.name}" ${tripId ? 'Updated' : 'Created'} 👍`)
      })
      .catch(err => console.error(err))
  }
  const deleteTrip = () => {
    const tripId = store.current._id
    api.deleteTrip(tripId)
      .then(trips => {
        store.trips = trips
        tripRender.accordion()
        tripRender.allTrips()
        toastr.success(`Trip ${store.current.name} Deleted`)
      })
  }

  function autoFillFirstName() {
    $('#displayFirstName').text($(this).val())
  }

  function autoFillLastName() {
    $('#displayLastName').text($(this).val())
  }
  const fillInStartLoc = (html) => {
    $('.departureLocationDisplay').html(html)
  }
  const fillInEndLoc = (html) => {
    $('.arrivalLocationDisplay').html(html)
  }

  function linkLegFromUser() {
    let legId = $(this).attr('legId')
    const tripId = $(this).attr('tripId')
    const trip = store.trips.find(trip => trip.tripLegs.find(leg => leg._id === legId))
    const leg = trip.tripLegs.find(leg => leg._id === legId)
    store.current = trip;
    store.currentLeg = leg;
    legRender.edit()
    tripRender.accordion()
    userHeader.render()
  }


  return {
    signUpButton,
    signUp,
    signIn,
    updateLegUsers,
    fillOutForm,
    addNewUser,
    updateUser,
    addLegToTrip,
    updateLeg,
    addTrip,
    updateTrip,
    addUpdateTrip,
    deleteTrip,
    deleteLeg,
    newLegForm,
    selectLeg,
    selectTrip,
    hoverLeg,
    unhoverLeg,
    newTripForm,
    autoFillFirstName,
    autoFillLastName,
    fillInStartLoc,
    fillInEndLoc,
    linkLegFromUser,
  }
})()