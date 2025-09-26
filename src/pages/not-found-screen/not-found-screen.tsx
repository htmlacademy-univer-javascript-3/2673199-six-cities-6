export function NotFoundScreen() {
  return (
    <main className="page__main page__main--not-found">
      <div className="container">
        <section className="not-found">
          <h1 className="not-found__title">404. Page not found</h1>
          <a className="not-found__link" href="/">
            Go to main page
          </a>
        </section>
      </div>
    </main>
  );
}
