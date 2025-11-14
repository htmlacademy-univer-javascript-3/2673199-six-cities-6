import { Link } from 'react-router-dom';
import { cities } from '../consts';

type CitiesListProps = {
  activeCity: string;
  onCityChange: (city: string) => void;
};

export function CitiesList({ activeCity, onCityChange }: CitiesListProps) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((cityName) => (
            <li key={cityName} className="locations__item">
              <Link
                to=''
                className={`locations__item-link tabs__item ${
                  cityName === activeCity ? 'tabs__item--active' : ''
                }`}
                onClick={() => onCityChange(cityName)}
              >
                <span>{cityName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
