export const PlaceholderView = ({ title, description }: { title: string; description: string }): JSX.Element => (
  <section className="panel panel--placeholder">
    <h2>{title}</h2>
    <p>{description}</p>
  </section>
);
