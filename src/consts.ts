export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/notfound',
  All = '*',
}

export enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const EmptyStates = {
  Favorites: {
    header: 'Favorites (empty)',
    title: 'Nothing yet saved.',
    description: 'Save properties to narrow down search or plan your future trips.',
    classNames: {
      section: 'favorites favorites--empty',
      wrapper: 'favorites__status-wrapper',
      status: 'favorites__status',
      description: 'favorites__status-description'
    }
  },
  Cities: (city: string) => ({
    title: 'No places to stay available',
    description: `We could not find any property available at the moment in ${city}`,
    classNames: {
      section: 'cities__no-places',
      wrapper: 'cities__status-wrapper tabs__content',
      status: 'cities__status',
      description: 'cities__status-description'
    }
  })
};

export const ReviewLen = {
  Min: 50,
  Max: 300,
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const MAX_REVIEWS_LEN = 10;
export const MAX_NEARS_LEN = 3;
export const MAX_PHOTOS_LEN = 6;
