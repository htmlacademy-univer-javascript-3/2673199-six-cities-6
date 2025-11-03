type EmptyStateProps = {
  title: string;
  description: string;
  header?: string;
  classNames?: {
    section?: string;
    wrapper?: string;
    status?: string;
    description?: string;
  };
};


export function EmptyState({
                             title,
                             description,
                             header,
                             classNames = {},
                           }: EmptyStateProps) {
  return (
    <section className={classNames.section}>
      {header && <h1 className="visually-hidden">{header}</h1>}
      <div className={classNames.wrapper}>
        <b className={classNames.status}>{title}</b>
        <p className={classNames.description}>{description}</p>
      </div>
    </section>
  );
}
