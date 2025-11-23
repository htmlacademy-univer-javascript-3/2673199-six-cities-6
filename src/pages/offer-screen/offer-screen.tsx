import {PlaceCardType} from '../../components/place-card';
import {useEffect} from 'react';
import { Map } from '../../components/map/map.tsx';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {DetailedPlace} from '../../components/detailed-place/detailed-place.tsx';
import {fetchNears, fetchOffer} from '../../store/api-actions.ts';
import {useParams} from 'react-router-dom';
import {Spinner} from '../../components/spinner/spinner.tsx';


export function OfferScreen() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchNears({ id }));
    dispatch(fetchOffer({ id }));
  }, [dispatch, id]);

  const detailOffer = useAppSelector((state) => state.detailOffer);
  const items = useAppSelector((state) => state.offers);

  if (!detailOffer) {
    return <Spinner/>;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {detailOffer.images.map((imgUrl, index) => (
              <div className="offer__image-wrapper" key={`image wrapper ${index + 1}`}>
                <img className="offer__image" src={imgUrl} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <DetailedPlace detailOffer={detailOffer}/>
        <Map offers={items} className="offer__map" activeOfferId={null}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <PlacesList
            offers={items}
            onHover={() => {}}
            type={PlaceCardType.Offer}
          />
        </section>
      </div>
    </main>
  );
}
