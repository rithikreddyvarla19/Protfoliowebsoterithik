export default function IconLink({ href, icon: Icon, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:-translate-y-1 dark:border-white/15 dark:bg-white/10 dark:text-white"
    >
      {Icon && <Icon size={17} />}
      {children}
    </a>
  );
}
