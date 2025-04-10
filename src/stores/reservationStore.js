import { ref } from 'vue'
import { defineStore } from 'pinia'

export const reservationStore = defineStore('reservationStore', () => {
  const reservations = ref([
    {
      id: 'dc4761f3-cffa-41af-b5e4-001aefe501a9',
      client_name: 'Todd Ross',
      client_email: 'jeffrey12@johnston.com',
      client_phone: '+1-776-180-7970',
      party_size: 4,
      date: '2025-04-10',
      time: '13:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '742c393b-e5ae-4d95-b0b4-204a7dd4853c',
      client_name: 'Brittany Flores',
      client_email: 'vschroeder@yahoo.com',
      client_phone: '001-390-650-8326',
      party_size: 2,
      date: '2025-04-13',
      time: '12:00',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '9b93fb7d-a3f3-46fa-a061-be052b40b549',
      client_name: 'Debra Allen',
      client_email: 'jonesalexander@alvarez.com',
      client_phone: '7093690292',
      party_size: 4,
      date: '2025-04-12',
      time: '12:00',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'f1c2402c-b1dc-4cef-856c-50d4ee236586',
      client_name: 'Nancy Morgan',
      client_email: 'rodriguezcarl@young-johnston.net',
      client_phone: '616.503.0196x19559',
      party_size: 4,
      date: '2025-04-12',
      time: '19:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '4329a02f-be23-4d64-9ce8-af2d214b22eb',
      client_name: 'Clayton Shepherd',
      client_email: 'clarkmonica@chambers.com',
      client_phone: '001-653-684-3758',
      party_size: 4,
      date: '2025-04-10',
      time: '11:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '629afdcc-8c11-4c24-b864-e7da21aa9d31',
      client_name: 'Jennifer Kelley',
      client_email: 'aaronsmith@brown.com',
      client_phone: '(715)323-3023x1018',
      party_size: 5,
      date: '2025-04-12',
      time: '20:00',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '8b6ab4b1-f993-4167-b1b7-7e4b13b08658',
      client_name: 'Elizabeth Campos',
      client_email: 'kelseyperry@gmail.com',
      client_phone: '+1-469-027-4216x248',
      party_size: 4,
      date: '2025-04-11',
      time: '12:00',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '61a67713-e44a-40cf-8e25-e032a0324d5f',
      client_name: 'Christine Day',
      client_email: 'danielle09@hotmail.com',
      client_phone: '562-750-4773',
      party_size: 4,
      date: '2025-04-10',
      time: '20:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'c18a8199-7fe2-4c67-817d-a48b1ff6e02d',
      client_name: 'Pamela Torres',
      client_email: 'kelsey88@bennett.com',
      client_phone: '551.932.3074',
      party_size: 4,
      date: '2025-04-10',
      time: '19:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '11d4f2cc-6632-43a1-8e76-82ec08f76a9c',
      client_name: 'Sean Washington',
      client_email: 'harveynicole@hotmail.com',
      client_phone: '774.610.0366',
      party_size: 5,
      date: '2025-04-12',
      time: '17:00',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'f403486f-5535-4097-8bb3-73fc70872065',
      client_name: 'Suzanne Gomez',
      client_email: 'sbarnett@yahoo.com',
      client_phone: '398-562-2999x808',
      party_size: 6,
      date: '2025-04-10',
      time: '13:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'e3912676-331b-4638-88e5-29d62c17f571',
      client_name: 'John White',
      client_email: 'cohenkristine@baker-campos.com',
      client_phone: '001-680-289-7935x2686',
      party_size: 5,
      date: '2025-04-10',
      time: '19:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '3437c581-d3a2-49bf-b879-b1195635ad6a',
      client_name: 'Cheryl Young',
      client_email: 'jameshill@yahoo.com',
      client_phone: '+1-325-213-0508x037',
      party_size: 6,
      date: '2025-04-11',
      time: '19:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'afe393fe-bed0-435d-aef3-c0a93882bc54',
      client_name: 'Jennifer Bernard',
      client_email: 'terryhale@gmail.com',
      client_phone: '4035132791',
      party_size: 3,
      date: '2025-04-11',
      time: '13:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '792397b7-8922-43c8-a909-505aa38d1c36',
      client_name: 'Kayla Thompson',
      client_email: 'walshlaurie@gmail.com',
      client_phone: '(099)383-1499x2887',
      party_size: 2,
      date: '2025-04-11',
      time: '19:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '5f589705-edc6-493c-bead-f21f1a7644bf',
      client_name: 'Dr. Deborah Davila DDS',
      client_email: 'thudson@villarreal-wright.com',
      client_phone: '+1-609-904-1749',
      party_size: 10,
      date: '2025-04-13',
      time: '14:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '527bfc2f-af68-4391-9558-2c048e09a678',
      client_name: 'Jessica Parker',
      client_email: 'allison94@wang.org',
      client_phone: '6968405564',
      party_size: 12,
      date: '2025-04-12',
      time: '12:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '5958733c-a7af-41c5-a6f1-3bcaaf894e1b',
      client_name: 'Michael Henderson',
      client_email: 'sarah99@gmail.com',
      client_phone: '387.279.3154',
      party_size: 2,
      date: '2025-04-10',
      time: '17:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '59a81a11-14f7-44b5-8927-ed282f4eb2ca',
      client_name: 'Benjamin Mcdonald',
      client_email: 'brooksmark@hill.org',
      client_phone: '849-858-1797x9529',
      party_size: 6,
      date: '2025-04-13',
      time: '14:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '2b633273-7019-4400-889b-4ffb97601e28',
      client_name: 'Patricia Lawson',
      client_email: 'lopezkristina@little-murphy.com',
      client_phone: '928-466-5163x7767',
      party_size: 6,
      date: '2025-04-10',
      time: '17:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '0519afd6-190e-4dc4-910f-c2868c688fbb',
      client_name: 'Connie Pugh',
      client_email: 'erica44@jensen.com',
      client_phone: '(700)587-8914x9145',
      party_size: 4,
      date: '2025-04-10',
      time: '17:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '69f9e1e8-ff56-47ab-abca-7fdbd7fdfa69',
      client_name: 'Nathaniel Fernandez',
      client_email: 'martinezjames@gmail.com',
      client_phone: '001-870-758-6004x6288',
      party_size: 3,
      date: '2025-04-10',
      time: '12:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '82b50ca8-7a36-4b74-8db0-91e8085973fe',
      client_name: 'Robert Krueger',
      client_email: 'zdavis@barnett-day.com',
      client_phone: '938-554-2554',
      party_size: 4,
      date: '2025-04-11',
      time: '15:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'f018d0b7-1011-4f32-9a47-e9ba40586e5c',
      client_name: 'Mark Hernandez',
      client_email: 'wesley54@wilson.info',
      client_phone: '(494)104-3974',
      party_size: 2,
      date: '2025-04-10',
      time: '16:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'c89313da-d2e0-46de-9911-ada821358e00',
      client_name: 'Paige Reed',
      client_email: 'stephenwatkins@parker.info',
      client_phone: '846-679-1585x3797',
      party_size: 3,
      date: '2025-04-13',
      time: '15:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'b9bf554f-bb69-455a-a53d-c25bee43f77d',
      client_name: 'Thomas Olson',
      client_email: 'allenjulie@cardenas-rangel.com',
      client_phone: '671.685.6348x5567',
      party_size: 10,
      date: '2025-04-10',
      time: '12:30',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '35f227a7-8cd1-43a9-b4f8-7baa3439f5e5',
      client_name: 'Martin Hensley III',
      client_email: 'randallwhite@gmail.com',
      client_phone: '736-381-3301x137',
      party_size: 6,
      date: '2025-04-13',
      time: '18:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: '18e71a10-df5f-4b46-934a-14bd04725246',
      client_name: 'William Hill',
      client_email: 'harveysarah@wall.org',
      client_phone: '+1-774-397-2707x47600',
      party_size: 2,
      date: '2025-04-13',
      time: '15:45',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'd087fa70-cfa3-40c8-ac72-5f485ae7731f',
      client_name: 'Michael Harrison',
      client_email: 'kroberts@yahoo.com',
      client_phone: '1077265064',
      party_size: 6,
      date: '2025-04-10',
      time: '12:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
    {
      id: 'b7025247-306e-4a9e-9e4c-637518f75b5f',
      client_name: 'James Torres',
      client_email: 'eduardo50@yahoo.com',
      client_phone: '772-865-5366',
      party_size: 2,
      date: '2025-04-11',
      time: '14:15',
      seated: false,
      tables_occupied: [],
      service_start_time: '',
      service_end_time: '',
      walk_in: false,
    },
  ])

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

        if (selectedDateStr === todayStr) {
          return (
            isSameDate &&
            reservationDateTime >= new Date(now.getTime()) &&
            reservation.seated === false &&
            reservation.walk_in === false
          )
        }

        return isSameDate
      })
      .sort((a, b) => a.time.localeCompare(b.time))
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
          return isSameDate && reservation.seated === true && reservation.service_end_time === ''
        }
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  function endServiceForReservation(reservationId) {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const reservation = reservations.value.find((res) => res.id === reservationId)
    if (reservation) {
      reservation.service_end_time = formattedTime
    } else {
      console.warn(`Reservation with ID ${reservationId} not found.`)
    }
  }

  function startServiceForReservation(reservationId, selectedTables) {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const reservation = reservations.value.find((res) => res.id === reservationId)
    if (reservation) {
      reservation.service_start_time = formattedTime
      reservation.seated = true
      reservation.tables_occupied = [...selectedTables]
    }
  }

  function addReservation(newReservation) {
    reservations.value.push(newReservation)
    return reservations.value[reservations.value.length - 1]
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
          return isSameDate && reservation.seated === false && reservation.walk_in === true
        }

        return isSameDate && reservation.walk_in === true
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  return {
    getReservations,
    addReservation,
    getSeatedReservations,
    endServiceForReservation,
    startServiceForReservation,
    getWalkinReservations,
    getDailyReservations,
  }
})
