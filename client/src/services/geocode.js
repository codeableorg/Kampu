async function getCoords(place) {
  let apikey = process.env.REACT_APP_OPEN_CAGE_DATA_KEY;
  let api_url = "https://api.opencagedata.com/geocode/v1/json";
  let request_url =
    api_url +
    "?" +
    "q=" +
    encodeURIComponent(place) +
    "&key=" +
    apikey +
    "&language=es" +
    "&pretty=1" +
    "&countrycode=pe" +
    "&no_annotations=1";
  const response = await fetch(request_url);

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { getCoords };
