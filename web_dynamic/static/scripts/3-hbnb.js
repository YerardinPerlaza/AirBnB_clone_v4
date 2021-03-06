$(document).ready(() => {
  const CheckList = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      CheckList[key] = value;
    }
    if (!$(this).is(':checked')) {
      delete CheckList[$(this).attr('data-id')];
    }
    const list = [];
    for (const name in CheckList) {
      list.push(CheckList[name]);
    }
    $('div.amenities h4').text(list.join(', '));
  });
});
$.getJSON('http://0.0.0.0:5001/api/v1/status', content => {
  if (content.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

const json_body = {};
$.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(json_body),
    contentType: 'application/json ',
    success: (places) => {
      for (const place of places) {
        $('section.places').append(`\
          <article>\
            <div class="title_box">\
              <h2>${place.name}</h2>\
              <div class="price_by_night">$${place.price_by_night}</div>\
            </div>\
            <div class="information">\
              <div class="max_guest">
                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}\
              </div>\
              <div class="number_rooms">
                ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}\
              </div>\
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}\
              </div>\
            </div>\
            <div class="description">${place.description}</div>\
          </article>\
        `);
      }
    }
});
