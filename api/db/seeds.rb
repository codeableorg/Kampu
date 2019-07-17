puts "Init seed"
User.destroy_all
regular_user = User.create(name: 'Lian Nivin', email: 'liam@kampu.pe', role: "regular", password: '123456')
User.create(name: 'Cristian Berly', email: 'berli@kampu.pe', role: "owner", password: '123456')

clubs = Club.create([{name: "Club #1", address: 'Jr cayumba 440',
schedule: {
  'monday-friday': {
    start: '8',
    end: '22'
  },
  'saturday': {
    start: '10',
    end: '22'
  },
  'sunday': {
    start: '14',
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

sportfield1 = SportField.create(name: "SportField #1", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)
sportfield2 = SportField.create(name: "SportField #2", club_id: 2);	SportField.create(name: "SportField #2", description: "Soccer 6vs6", price_day: 30, price_night: 60, club_id: 2)
sportfield3 = SportField.create(name: "SportField #3", club_id: 1);	SportField.create(name: "SportField #3", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)

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

regular_user.bookings.create(date: Time.now, start_hour: 14, end_hour: 15, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 15, end_hour: 16, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 16, end_hour: 17, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 17, end_hour: 18, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 15, end_hour: 16, amount: 200, sport_field_id: sportfield2.id );

regular_user.bookings.create(date: Time.now, start_hour: 16, end_hour: 17, amount: 300, sport_field_id: sportfield3.id );
