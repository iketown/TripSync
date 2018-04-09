const handlers = (() => {

  const signUp = (me) => {
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
        // const errorMessage = err.response.data.error
        console.log('signup err', err)
        // toastr.error(errorMessage)
        homeRender.signInForm()
      })
  }
  const signIn = (me) => {
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
    // need catch
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
    const leg = store.currentLeg
    let legId = leg._id
    let userIds = leg.travelers.map(t => t._id)
    api.updateLegUsers(legId, userIds)
      .then(() => {
        userHeader.render()
        $('.legTravelerList').hide().html(legRender.travelerList()).fadeIn()
      })
      .catch(err => console.log(err))
  }
  const deleteLeg = () => {
    let legId = store.currentLeg._id
    api.deleteLeg(legId)
      .then(res => {
        store.removeLeg()
        tripRender.viewTrip()
        tripRender.accordion()
      })
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



  return {
    signUp,
    signIn,
    updateLegUsers,
    fillOutForm,
    addNewUser,
    updateUser,
    addLegToTrip,
    updateLeg,
    addUpdateTrip,
    deleteTrip,
    deleteLeg,
  }
})()