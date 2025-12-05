import {memo} from 'react';

type PriceProps = {
  price: number;
  className: string;
};

export function Price({ price, className }: PriceProps) {
  return (
    <div className={className}>
      <b className={`${className}-value`}>&euro;{price}</b>
      <span className={`${className}-text`}>&nbsp;&#47;&nbsp;night</span>
    </div>
  );
}

export const PriceMemo = memo(Price);
