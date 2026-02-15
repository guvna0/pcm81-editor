import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS, type Pcm81IpcApi } from '../shared/ipc';

const api: Pcm81IpcApi = {
  readSettings: () => ipcRenderer.invoke(IPC_CHANNELS.settingsRead),
  updateSettings: (settings) => ipcRenderer.invoke(IPC_CHANNELS.settingsUpdate, settings),
  listMidiPorts: () => ipcRenderer.invoke(IPC_CHANNELS.midiListPorts),
  connectMidi: (inputId, outputId) => ipcRenderer.invoke(IPC_CHANNELS.midiConnect, inputId, outputId),
  disconnectMidi: () => ipcRenderer.invoke(IPC_CHANNELS.midiDisconnect),
  getMidiState: () => ipcRenderer.invoke(IPC_CHANNELS.midiGetState),
  listPatchFiles: (directory) => ipcRenderer.invoke(IPC_CHANNELS.filesListPatches, directory),
  savePatchFile: (request) => ipcRenderer.invoke(IPC_CHANNELS.filesSavePatch, request),
  loadPatchFile: (fullPath) => ipcRenderer.invoke(IPC_CHANNELS.filesLoadPatch, fullPath),
  exportSysExLog: (destinationPath, events) => ipcRenderer.invoke(IPC_CHANNELS.logsExportSysex, destinationPath, events)
};

contextBridge.exposeInMainWorld('pcm81Api', api);
