import { contextBridge, ipcRenderer } from 'electron';

type AppSettings = {
  midiInputId: string | null;
  midiOutputId: string | null;
};

contextBridge.exposeInMainWorld('pcm81Api', {
  readSettings: (): Promise<AppSettings> => ipcRenderer.invoke('settings:read'),
  updateSettings: (settings: AppSettings): Promise<AppSettings> => ipcRenderer.invoke('settings:update', settings)
});
