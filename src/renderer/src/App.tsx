import { useMemo, useState } from 'react';
import { CapsuleNav } from './components/CapsuleNav';
import { MidiSetupModal } from './components/MidiSetupModal';
import { ParameterPanel } from './components/ParameterPanel';
import { pcm81Catalogue } from './catalogue/pcm81Catalogue';
import { validateCatalogue } from './catalogue/validateCatalogue';
import { PlaceholderView } from './views/PlaceholderView';
import { SignalFlowView } from './views/SignalFlowView';
import { placeholderParameters } from './state/placeholderPreset';

validateCatalogue();

type NavView = 'signal-flow' | 'space' | 'mod-matrix' | 'global';

export const App = (): JSX.Element => {
  const [activeView, setActiveView] = useState<NavView>('signal-flow');
  const [showMidiModal, setShowMidiModal] = useState(false);
  const [parameters, setParameters] = useState(placeholderParameters);

  const activeAlgorithm = useMemo(() => pcm81Catalogue.algorithms[0], []);

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <h1>Modifier Music - PCM81 Editor</h1>
          <p>Copyright © 2026 The Alderstone Group Ltd t/a Modifier Music</p>
        </div>
        <div className="header__actions">
          <button className="button button--ghost">Load Patch</button>
          <button className="button button--ghost">Save Patch</button>
          <button className="button" onClick={() => setShowMidiModal(true)}>MIDI Setup</button>
        </div>
      </header>

      <CapsuleNav activeView={activeView} onChange={setActiveView} />

      <main className="workspace">
        <section className="workspace__left">
          {activeView === 'signal-flow' && <SignalFlowView algorithm={activeAlgorithm} />}
          {activeView === 'space' && <PlaceholderView title="Space" description="Reverb-focused macro controls will be surfaced here." />}
          {activeView === 'mod-matrix' && <PlaceholderView title="Mod Matrix" description="Patch routing and modulation matrix scaffolding." />}
          {activeView === 'global' && <PlaceholderView title="Global" description="System-level settings and common controls." />}
        </section>
        <section className="workspace__right">
          <ParameterPanel
            parameters={parameters}
            onChange={(id, value) => {
              setParameters((previous) => previous.map((parameter) => (parameter.id === id ? { ...parameter, value } : parameter)));
            }}
          />
        </section>
      </main>

      <MidiSetupModal isOpen={showMidiModal} onClose={() => setShowMidiModal(false)} />
    </div>
  );
};
