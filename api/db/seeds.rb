puts "Init seed 🙈🙉🙊"

def get_image(file_name)
  { io: File.open(File.join(Rails.root, "/app/assets/images/#{file_name}")), filename: file_name }
end

clubs = [
  {
    name: "La Diez",
    address: "La Calera de la Merced 178, Distrito de Lima 15038",
    district: "Surquillo",
    latitude: -12.1135125,
    longitude: -77.0113851,
    num_img: 4
  },
  {
    name: "Depor plaza Puericultorio",
    address: "Av. del Ejército 700",
    district: "Magdalena",
    latitude: -12.1003595,
    longitude: -77.0646032,
    num_img: 4
  },
  {
    name: "Depor Plaza Costa Verde",
    address: "Costa Verde Magdalena del Mar",
    district: "Magdalena",
    latitude: -12.1053237,
    longitude: -77.0652807,
    num_img: 4
  },
  {
    name: "Complejo Deportivo - Municipalidad de San Isidro",
    address: "Av. Augusto Pérez Araníbar 1355",
    district: "San Isidro",
    latitude: -12.1078158,
    longitude: -77.053914,
    num_img: 3
  }, 
  {
    name: "Cancha de Futbol 6",
    address: "Jirón Rio Piura 481",
    district: "Cercado de Lima",
    latitude: -12.0778519,
    longitude: -77.0023999,
    num_img: 2
  },
  {
    name: "Fanatic Soccer Fir",
    address: "Av Bolivia 148",
    district: "Cercado de Lima",
    latitude: -12.054698,
    longitude: -77.036893,
    num_img: 2
  }, 
  {
    name: "Complejo Deportivo Chino Vasquez",
    address: "Malecón de la Marina 9, Miraflores 15074",
    district: "Miraflores",
    latitude: -12.1137559,
    longitude: -77.0493404,
    num_img: 2
  }, 
]

schedule = {
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
  }
}

regular_user = User.create(name: 'Lian Nivin', email: 'liam@kampu.pe', role: "regular", password: '123456')
owner_user = User.create(name: 'Cristian Berly', email: 'berli@kampu.pe', role: "owner", password: '123456')

clubs.each do |club|
  image = club[:num_img].times.map { |i| get_image("#{club[:name]}/gallery_#{i + 1}.jpg") }
  club.delete(:num_img)
  Club.create(club.merge({image: image, schedule: schedule}))
end

Club.all.each do |club|
  SportField.create(name: "SportField #1", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: club.id)
  SportField.create(name: "SportField #2", description: "Soccer 6vs6", price_day: 30, price_night: 60, club_id: club.id)
  SportField.create(name: "SportField #3", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: club.id)
end


sportfield1 = SportField.create(name: "SportField #1", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)
sportfield2 = SportField.create(name: "SportField #2", club_id: 2);	
SportField.create(name: "SportField #2", description: "Soccer 6vs6", price_day: 30, price_night: 60, club_id: 2)
sportfield3 = SportField.create(name: "SportField #3", club_id: 1);	SportField.create(name: "SportField #3", description: "Soccer 5vs5", price_day: 20, price_night: 40, club_id: 1)

# favorites
regular_user.favorite(Club.first)
regular_user.favorite(Club.last)
regular_user.bookings.create(date: Time.now, start_hour: 14, end_hour: 15, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 15, end_hour: 16, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 16, end_hour: 17, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 17, end_hour: 18, amount: 100, sport_field_id: sportfield1.id );

regular_user.bookings.create(date: Time.now, start_hour: 15, end_hour: 16, amount: 200, sport_field_id: sportfield2.id );

regular_user.bookings.create(date: Time.now, start_hour: 16, end_hour: 17, amount: 300, sport_field_id: sportfield3.id );
