import {memo} from 'react';

type MarkProps = {
  isPremium: boolean;
  className: string;
};

function Mark({ isPremium, className }: MarkProps) {
  if (!isPremium) {
    return null;
  }
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export const MarkMemo = memo(Mark);
