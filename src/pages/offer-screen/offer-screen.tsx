import {PlaceCardType} from '../../components/place-card';
import { Map } from '../../components/map/map.tsx';
import {PlacesListMemo} from '../../components/places-list/places-list.tsx';
import {DetailedPlace} from '../../components/detailed-place/detailed-place.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useOffer} from '../../hooks';
import {useNears} from '../../hooks';
import {useMemo} from 'react';
import {useAppSelector} from '../../hooks';
import {Offers} from '../../types';
import {AppRoute, MAX_NEARS_LEN, MAX_PHOTOS_LEN} from '../../consts.ts';


export function OfferScreen() {
  const { id } = useParams<{ id: string }>();
  const detailOfferPending = useOffer(id);
  const nears = useNears(id);
  const offersFromStore = useAppSelector((state) => state.offers.offers);

  const mergedItems: Offers = useMemo(() => {
    if (!nears.data) {
      return [];
    }

    return nears.data.map((item) => {
      const fromOffers = offersFromStore.find((o) => o.id === item.id);
      const source = fromOffers ?? item;

      return {
        ...item,
        isFavorite: source.isFavorite,
      };
    });
  }, [nears.data, offersFromStore]);
  const nearsOffers = useMemo(() => mergedItems.slice(0, MAX_NEARS_LEN), [mergedItems]);


  if (!detailOfferPending || detailOfferPending.isLoading || nears.isLoading) {
    return <Spinner/>;
  }
  if (detailOfferPending.error || nears.error) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const detailOffer = detailOfferPending.data!;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {detailOffer.images.map((imgUrl, index) => (
              <div className="offer__image-wrapper" key={`image wrapper ${index + 1}`}>
                <img className="offer__image" src={imgUrl} alt={`Photo ${index + 1}`} />
              </div>
            )).slice(0, MAX_PHOTOS_LEN)}
          </div>
        </div>
        <DetailedPlace detailOffer={detailOffer}/>
        <Map offers={nearsOffers.concat({...detailOffer, previewImage: detailOffer.images[0]})} className="offer__map" activeOfferId={detailOffer.id}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <PlacesListMemo
            offers={nearsOffers}
            type={PlaceCardType.Offer}
          />
        </section>
      </div>
    </main>
  );
}
