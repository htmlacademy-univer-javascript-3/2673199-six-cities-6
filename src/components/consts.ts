export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']

export const MIN_REVIEW_LEN = 50;
export const MAX_REVIEW_LEN = 300;

export const emptyStates = {
  favorites: {
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
  cities: (city: string) => ({
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

