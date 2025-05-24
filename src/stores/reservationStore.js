import { ref } from 'vue'
import { defineStore } from 'pinia'

export const reservationStore = defineStore('reservationStore', () => {
  const reservations = ref([])

  async function loadReservations(account_uid) {
    try {
      const q = query(
        collection(getFirestore(app), 'reservations'),
        where('restaurant_id', '==', account_uid),
      )
      const snapshot = await getDocs(q)
      reservations.value = snapshot.docs.map((doc) => doc.data())
    } catch (error) {
      console.log(error)
    }
  }

  function getReservations() {
    return reservations.value
  }

  function getDailyReservations(appDate) {
    const now = new Date()
    const todayStr = now.toDateString()
    const selectedDateObj = new Date(appDate)
    const selectedDateStr = selectedDateObj.toDateString()

    return reservations.value
      .filter((reservation) => {
        const [year, month, day] = reservation.date.split('-').map(Number)
        const [hour, minute] = reservation.time.split(':').map(Number)
        const reservationDateObj = new Date(year, month - 1, day)
        const reservationDateTime = new Date(year, month - 1, day, hour, minute)

        const isSameDate = reservationDateObj.toDateString() === selectedDateStr

        return isSameDate
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  function getUpcomingReservations(appDate) {
    const now = new Date()
    const todayStr = now.toDateString()
    const selectedDateObj = new Date(appDate)
    const selectedDateStr = selectedDateObj.toDateString()

    return getDailyReservations(appDate).filter((reservation) => {
      const [year, month, day] = reservation.date.split('-').map(Number)
      const [hour, minute] = reservation.time.split(':').map(Number)
      const reservationDateObj = new Date(year, month - 1, day)
      const reservationDateTime = new Date(year, month - 1, day, hour, minute)

      const isSameDate = reservationDateObj.toDateString() === selectedDateStr

      if (selectedDateStr === todayStr) {
        return (
          isSameDate &&
          reservationDateTime >= new Date(now.getTime()) &&
          reservation.seated === false &&
          reservation.walk_in === false &&
          reservation.cancelled === false
        )
      }
      return isSameDate && reservation.cancelled === false
    })
  }

  function getSeatedReservations(appDate) {
    const now = new Date()
    const todayStr = now.toDateString()
    const selectedDateObj = new Date(appDate)
    const selectedDateStr = selectedDateObj.toDateString()

    return reservations.value
      .filter((reservation) => {
        const [year, month, day] = reservation.date.split('-').map(Number)
        const reservationDateObj = new Date(year, month - 1, day)

        const isSameDate = reservationDateObj.toDateString() === selectedDateStr

        if (selectedDateStr === todayStr) {
          return (
            isSameDate &&
            reservation.cancelled === false &&
            reservation.seated === true &&
            reservation.service_end_time === ''
          )
        }
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  async function endServiceForReservation(reservation_id) {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const restaurant_id = reservations.value.find(
      (reservation) => reservation.id === reservation_id,
    ).restaurant_id

    try {
      const reservationRef = doc(getFirestore(app), 'reservations', reservation_id)
      await updateDoc(reservationRef, { service_end_time: formattedTime })
      await loadReservations(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  async function startServiceForReservation(reservation_id, selectedTables) {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const restaurant_id = reservations.value.find(
      (reservation) => reservation.id === reservation_id,
    ).restaurant_id

    try {
      const reservationRef = doc(getFirestore(app), 'reservations', reservation_id)
      await updateDoc(reservationRef, {
        service_start_time: formattedTime,
        seated: true,
        tables_occupied: [...selectedTables],
      })
      await loadReservations(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  async function addReservation(newReservation) {
    try {
      await setDoc(doc(getFirestore(app), 'reservations', newReservation.id), newReservation)
      await loadReservations(newReservation.restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  async function cancelReservation(reservation_id) {
    const restaurant_id = reservations.value.find(
      (reservation) => reservation.id === reservation_id,
    ).restaurant_id
    try {
      const reservationRef = doc(getFirestore(app), 'reservations', reservation_id)
      await updateDoc(reservationRef, { cancelled: true })
      await loadReservations(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  function getWalkinReservations(appDate) {
    const now = new Date()
    const todayStr = now.toDateString()
    const selectedDateObj = new Date(appDate)
    const selectedDateStr = selectedDateObj.toDateString()

    return reservations.value
      .filter((reservation) => {
        const [year, month, day] = reservation.date.split('-').map(Number)
        const reservationDateObj = new Date(year, month - 1, day)

        const isSameDate = reservationDateObj.toDateString() === selectedDateStr

        if (selectedDateStr === todayStr) {
          return (
            isSameDate &&
            reservation.seated === false &&
            reservation.walk_in === true &&
            reservation.cancelled === false
          )
        }

        return isSameDate && reservation.walk_in === true && reservation.cancelled === false
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  return {
    loadReservations,
    getReservations,
    addReservation,
    cancelReservation,
    getSeatedReservations,
    endServiceForReservation,
    startServiceForReservation,
    getWalkinReservations,
    getDailyReservations,
    getUpcomingReservations,
  }
})
