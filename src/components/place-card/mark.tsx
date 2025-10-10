type MarkProps = {
  isPremium: boolean;
};

export function Mark({ isPremium }: MarkProps) {
  if (!isPremium) {
    return null;
  }
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}
