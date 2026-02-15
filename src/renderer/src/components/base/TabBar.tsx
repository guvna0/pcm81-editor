export type TabKey = 'algorithm' | 'reverb' | 'patching' | 'common' | 'system' | 'styleguide';

export type TabItem = {
  key: TabKey;
  label: string;
};

type Props = {
  tabs: TabItem[];
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export const TabBar = ({ tabs, active, onChange }: Props): JSX.Element => (
  <nav className="tabbar" aria-label="Primary tabs">
    {tabs.map((tab) => (
      <button key={tab.key} className={`tabbar__tab ${active === tab.key ? 'is-active' : ''}`} onClick={() => onChange(tab.key)}>
        {tab.label}
      </button>
    ))}
  </nav>
);
