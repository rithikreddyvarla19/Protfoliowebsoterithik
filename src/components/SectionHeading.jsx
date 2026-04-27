export default function SectionHeading({ kicker, title, className = "" }) {
  return (
    <div className={className}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
