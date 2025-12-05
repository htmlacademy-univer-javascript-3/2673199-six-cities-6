type MarkProps = {
  isPremium: boolean;
  className: string;
};

export function Mark({ isPremium, className }: MarkProps) {
  if (!isPremium) {
    return null;
  }
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}
