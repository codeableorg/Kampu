User.destroy_all
User.create(name: 'Lian Nivin', email: 'liam@kampu.pe', role: "regular", password: '123456')
User.create(name: 'Cristian Berly', email: 'berli@kampu.pe', role: "owner", password: '123456')

clubs = Club.create([{name: "Club #1"}, {name: "Club #2"}, {name: "Club #3"}])
SportField.create(name: "SportField #1", club_id: 1);
SportField.create(name: "SportField #2", club_id: 2);
SportField.create(name: "SportField #3", club_id: 1);