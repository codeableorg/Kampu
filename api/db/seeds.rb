puts "Init seed"
User.destroy_all
regular_user = User.create(name: 'Lian Nivin', email: 'liam@kampu.pe', role: "regular", password: '123456')
owner_user = User.create(name: 'Cristian Berly', email: 'berli@kampu.pe', role: "owner", password: '123456')

clubs = Club.create([{name: "Club #1", address: 'Jr cayumba 440', district: "Lince", latitude: -12.1199378, longitude: -77.0373161,
schedule: {
  'monday-friday': {
    start: '8',
    end: '22'
  },
  'saturday': {
    start: '8',
    end: '22'
  },
  'sunday': {
    start: '8',
    end: '22'
  },
}}, {name: "Club #2", address: 'Av. Jorge Chavez 184', district: "Miraflores", latitude: -13.1199378, longitude: -77.0353161,
schedule: {
  'monday-friday': {
    start: '8',
    end: '22'
  },
  'saturday': {
    start: '8',
    end: '22'
  },
  'sunday': {
    start: '8',
    end: '22'
  },
}}, {name: "Club #3", address: 'Jr General Artigas 440', district: "Pueblo Libre", latitude: -14.1199378, longitude: -77.0373261,
schedule: {
  'monday-friday': {
    start: '8',
    end: '22'
  },
  'saturday': {
    start: '8',
    end: '22'
  },
  'sunday': {
    start: '8',
    end: '22'
  },
}}])

SportField.create(name: "SportField #1", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)
SportField.create(name: "SportField #2", description: "Soccer 6vs6", price_day: 30, price_night: 60, club_id: 2)
SportField.create(name: "SportField #3", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)

Club.create(
  name: 'Club golden',
  address: 'Jr Something 123', district: "Cercado de Lima", latitude: -12.0641388, longitude: -77.0358862,
  schedule: {
    'monday-friday': {
      start: '8',
      end: '22'
    },
    'saturday': {
      start: '8',
      end: '22'
    },
    'sunday': {
      start: '8',
      end: '22'
    },
  }
)

# favorites
regular_user.favorite(Club.first)
regular_user.favorite(Club.last)
