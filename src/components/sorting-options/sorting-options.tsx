import {memo, useState} from 'react';
import {SortingType} from '../../consts.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {setActiveSortingType} from '../../store/reducers/city-slice/city-slice.ts';


function SortingOptions() {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);
  const activeSortingType = useAppSelector((state) => state.city.activeSortingType);

  const handleSelect = (type: SortingType) => {
    dispatch(setActiveSortingType(type));
    setOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        {activeSortingType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      {opened && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortingType).map((type) => (
            <li
              key={type}
              className={
                `places__option${ activeSortingType === type ? ' places__option--active' : ''}`
              }
              tabIndex={0}
              onClick={() => handleSelect(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export const SortingOptionsMemo = memo(SortingOptions);
