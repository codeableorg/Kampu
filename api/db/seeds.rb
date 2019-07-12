puts "Init seed"
User.destroy_all
User.create(name: 'Lian Nivin', email: 'liam@kampu.pe', role: "regular", password: '123456')
User.create(name: 'Cristian Berly', email: 'berli@kampu.pe', role: "owner", password: '123456')

clubs = Club.create([{name: "Club #1", address: 'Jr cayumba 440',
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
}}, {name: "Club #2", address: 'Jr cayumba 440',
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
}}, {name: "Club #3", address: 'Jr cayumba 440',
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

SportField.create(name: "SportField #1", club_id: 1);
SportField.create(name: "SportField #2", club_id: 2);
SportField.create(name: "SportField #3", club_id: 1);

Club.create(
  name: 'Club golden',
  address: 'Jr cayumba 440',
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
