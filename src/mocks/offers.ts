import {OfferDetailed, Offers} from '../types/offer.ts';

export const activeCity = 'Paris';

export const offers: Offers = [
  {
    "id": "a07c7343-0d97-44d9-9af1-f7b7ee5be28f",
    "title": "Nice, cozy, warm big bed apartment",
    "type": "apartment",
    "price": 210,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/3.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3909553943508,
      "longitude": 4.85309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 2.5
  },
  {
    "id": "a9a1eeb1-42eb-4b66-b825-b0667e0a5dd3",
    "title": "Waterfront with extraordinary view",
    "type": "hotel",
    "price": 276,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/18.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3609553943508,
      "longitude": 4.85309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 3
  },
  {
    "id": "ad283cd3-728d-45a5-acfe-44e63719a024",
    "title": "The Joshua Tree House",
    "type": "apartment",
    "price": 317,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/18.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3909553943508,
      "longitude": 4.929309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 1
  },
  {
    "id": "db0cf877-f985-4c27-86f7-ccb977449c2a",
    "title": "Tile House",
    "type": "hotel",
    "price": 327,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/1.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3809553943508,
      "longitude": 4.939309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 3.9
  },
  {
    'id': 'b232f05e-3e7c-435c-9158-c331b4315747',
    'title': 'Loft Studio in the Central Area',
    'type': 'hotel',
    'price': 327,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.87961000000001,
      'longitude': 2.353499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.9
  },
  {
    'id': '4079890a-c4ea-43e7-994c-6782c6c0b82c',
    'title': 'Perfectly located Castro',
    'type': 'hotel',
    'price': 346,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.364499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2.5
  },
  {
    'id': '447a9377-6f00-42b5-a680-c48b8cb9266e',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 264,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.837610000000005,
      'longitude': 2.3454990000000002,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.6
  },
  {
    'id': '8423abe0-9660-4dc3-aa98-f31897ce8df5',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'price': 472,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.84761,
      'longitude': 2.356499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 1.1
  },
];

export const nears: Offers = [
  {
    "id": "a9a1eeb1-42eb-4b66-b825-b0667e0a5dd3",
    "title": "Waterfront with extraordinary view",
    "type": "hotel",
    "price": 276,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/18.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3609553943508,
      "longitude": 4.85309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 3
  },
  {
    "id": "ad283cd3-728d-45a5-acfe-44e63719a024",
    "title": "The Joshua Tree House",
    "type": "apartment",
    "price": 317,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/18.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3909553943508,
      "longitude": 4.929309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 1
  },
  {
    "id": "db0cf877-f985-4c27-86f7-ccb977449c2a",
    "title": "Tile House",
    "type": "hotel",
    "price": 327,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/1.jpg",
    "city": {
      "name": "Amsterdam",
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 52.3809553943508,
      "longitude": 4.939309666406198,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 3.9
  },
]

export const detailed: OfferDetailed = {
  'id': '4aabcc9d-e564-439a-86a9-646c3e71d66e',
  'title': 'Beautiful & luxurious apartment at great location',
  'description': 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
  'type': 'house',
  'price': 759,
  'images': [
    'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/15.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/16.jpg'
  ],
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  'location': {
    'latitude': 48.83961,
    'longitude': 2.342499,
    'zoom': 16
  },
  'goods': [
    'Washer',
    'Dishwasher',
    'Baby seat',
    'Fridge',
    'Towels',
    'Kitchen',
    'Washing machine',
    'Laptop friendly workspace',
    'Heating',
    'Wi-Fi',
    'Cable TV'
  ],
  'host': {
    'isPro': true,
    'name': 'Angelina',
    'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  'isPremium': true,
  'isFavorite': true,
  'rating': 3.3,
  'bedrooms': 5,
  'maxAdults': 9
};
