type NavView = 'signal-flow' | 'space' | 'mod-matrix' | 'global';

type Props = {
  activeView: NavView;
  onChange: (view: NavView) => void;
};

const views: { id: NavView; label: string; icon: string }[] = [
  { id: 'signal-flow', label: 'Signal Flow', icon: '◈' },
  { id: 'space', label: 'Space', icon: '◍' },
  { id: 'mod-matrix', label: 'Mod Matrix', icon: '⟲' },
  { id: 'global', label: 'Global', icon: '⚙' }
];

export const CapsuleNav = ({ activeView, onChange }: Props): JSX.Element => (
  <div className="capsule-nav" role="tablist" aria-label="Editor views">
    {views.map((view) => (
      <button
        key={view.id}
        className={`capsule-nav__button ${activeView === view.id ? 'capsule-nav__button--active' : ''}`}
        onClick={() => onChange(view.id)}
      >
        <span aria-hidden>{view.icon}</span> {view.label}
      </button>
    ))}
  </div>
);
