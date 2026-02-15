import { useEffect, useState } from 'react';
import type { MidiConnectionState, PatchData, PatchFileEntry, ProgramBank, SysExEvent } from '../../shared/ipc';
import { Button } from './components/base/Button';
import { Card } from './components/base/Card';
import { TabBar, type TabKey } from './components/base/TabBar';
import { ToastStack, type ToastItem } from './components/base/Toast';
import { DiagramCanvas } from './components/feature/DiagramCanvas';
import { FileBrowserList } from './components/feature/FileBrowserList';
import { MidiSetupModal } from './components/feature/MidiSetupModal';
import { SysExMonitor } from './components/feature/SysExMonitor';
import { mBandReverbTemplate } from './mock/algorithmTemplates';
import { mockPatch } from './mock/mockPatch';
import { StyleguideView } from './routes/StyleguideView';
import './styles/theme.css';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'algorithm', label: 'Algorithm' },
  { key: 'reverb', label: 'Reverb' },
  { key: 'patching', label: 'Patching' },
  { key: 'common', label: 'Common' },
  { key: 'system', label: 'System' },
  { key: 'styleguide', label: 'Styleguide' }
];

const PATCH_DIR = './patches';

export const App = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabKey>('algorithm');
  const [patch, setPatch] = useState<PatchData>(mockPatch);
  const [selectedNodeId, setSelectedNodeId] = useState(mBandReverbTemplate.nodes[0].id);
  const [midiState, setMidiState] = useState<MidiConnectionState>('disconnected');
  const [showMidiModal, setShowMidiModal] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [files, setFiles] = useState<PatchFileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [sysexEvents, setSysexEvents] = useState<SysExEvent[]>([]);


  const refreshFiles = async (): Promise<void> => {
    const next = await window.pcm81Api.listPatchFiles(PATCH_DIR);
    setFiles(next);
  };

  useEffect(() => {
    void refreshFiles();
  }, []);

  const toast = (message: string, tone: ToastItem['tone'] = 'info'): void => {
    const id = crypto.randomUUID();
    setToasts((current) => [{ id, message, tone }, ...current].slice(0, 5));
  };

  const pushMockTraffic = (): void => {
    const event: SysExEvent = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      direction: Math.random() > 0.5 ? 'in' : 'out',
      status: 'ok',
      summary: 'Mock traffic packet',
      bytesHex: 'F0 06 09 10 00 7F F7',
      productId: '0x10'
    };
    setSysexEvents((current) => [event, ...current]);
  };

  const savePatch = async (): Promise<void> => {
    const targetBank: ProgramBank = patch.bank;
    try {
      await window.pcm81Api.savePatchFile({ directory: PATCH_DIR, patch, targetBank });
      toast('Patch saved to disk.', 'success');
      await refreshFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Save failed';
      toast(message, 'error');
    }
  };

  const saveToRegister = async (): Promise<void> => {
    const registerPatch = { ...patch, bank: 'register' as const };
    await window.pcm81Api.savePatchFile({ directory: PATCH_DIR, patch: registerPatch, targetBank: 'register' });
    setPatch(registerPatch);
    toast('Saved to Register bank.', 'success');
    await refreshFiles();
  };

  const loadFile = async (fullPath: string): Promise<void> => {
    setSelectedFile(fullPath);
    const loaded = await window.pcm81Api.loadPatchFile(fullPath);
    setPatch(loaded);
    toast(`Loaded ${loaded.name}`, 'info');
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <h1>PCM81 Editor + Librarian</h1>
          <p className={`status status--${midiState}`}>MIDI: {midiState}</p>
        </div>
        <div className="top-bar__actions">
          <span>{patch.bank.toUpperCase()} / PRG {String(patch.program).padStart(2, '0')}</span>
          <Button variant="secondary" onClick={() => setShowMidiModal(true)}>MIDI Setup</Button>
          <Button variant="secondary" onClick={() => setShowMonitor(true)}>SysEx Monitor</Button>
          <Button onClick={savePatch}>Save (current bank)</Button>
          <Button onClick={saveToRegister}>Save to Register</Button>
        </div>
      </header>

      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <main className="workspace">
        <section className="workspace__main">
          {activeTab === 'styleguide' ? (
            <StyleguideView />
          ) : (
            <Card>
              <h2>{activeTab.toUpperCase()}</h2>
              <DiagramCanvas
                nodes={mBandReverbTemplate.nodes}
                edges={mBandReverbTemplate.edges}
                selectedNodeId={selectedNodeId}
                parameterValues={patch.parameters}
                onSelectNode={setSelectedNodeId}
                onChangeParameter={(parameterId, value) =>
                  setPatch((current) => ({
                    ...current,
                    parameters: {
                      ...current.parameters,
                      [parameterId]: value
                    }
                  }))
                }
              />
            </Card>
          )}
        </section>

        <aside className="workspace__rail">
          <Card>
            <h3>Transport</h3>
            <Button onClick={pushMockTraffic}>PCM81 -&gt; Editor</Button>
            <Button onClick={pushMockTraffic}>Editor -&gt; PCM81</Button>
            <Button variant="ghost" onClick={pushMockTraffic}>Mock Traffic</Button>
          </Card>
          <FileBrowserList
            directory={PATCH_DIR}
            files={files}
            selected={selectedFile}
            onSelect={(path) => void loadFile(path)}
            onRefresh={() => void refreshFiles()}
          />
        </aside>
      </main>

      <MidiSetupModal open={showMidiModal} onClose={() => setShowMidiModal(false)} onStateChange={setMidiState} />
      <SysExMonitor open={showMonitor} onClose={() => setShowMonitor(false)} events={sysexEvents} />
      <ToastStack items={toasts} onDismiss={(id) => setToasts((current) => current.filter((toastItem) => toastItem.id !== id))} />
    </div>
  );
};
