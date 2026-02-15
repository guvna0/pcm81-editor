import { BrowserWindow, app, ipcMain } from 'electron';
import path from 'node:path';
import Store from 'electron-store';
import { FileService } from './services/fileService';
import { MidiService } from './services/midiService';
import { IPC_CHANNELS, type AppSettings, type SavePatchRequest, type SysExEvent } from '../shared/ipc';

const defaults: AppSettings = {
  midiInputId: null,
  midiOutputId: null
};

const store = new Store<{ settings: AppSettings }>({
  name: 'pcm81-editor-settings',
  defaults: {
    settings: defaults
  }
});

const midiService = new MidiService();
const fileService = new FileService();

const readSettings = (): AppSettings => (store as any).get('settings', defaults);

const createWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    width: 1460,
    height: 930,
    minWidth: 1280,
    minHeight: 800,
    backgroundColor: '#0B0E14',
    title: 'Modifier Music - PCM81 Editor',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    await mainWindow.loadURL('http://localhost:5173');
  }
};

app.whenReady().then(() => {
  ipcMain.handle(IPC_CHANNELS.settingsRead, () => readSettings());
  ipcMain.handle(IPC_CHANNELS.settingsUpdate, (_event, settings: AppSettings) => {
    (store as any).set('settings', settings);
    return readSettings();
  });

  ipcMain.handle(IPC_CHANNELS.midiListPorts, () => midiService.listPorts());
  ipcMain.handle(IPC_CHANNELS.midiConnect, (_event, inputId: string, outputId: string) => midiService.connect(inputId, outputId));
  ipcMain.handle(IPC_CHANNELS.midiDisconnect, () => midiService.disconnect());
  ipcMain.handle(IPC_CHANNELS.midiGetState, () => midiService.getState());

  ipcMain.handle(IPC_CHANNELS.filesListPatches, (_event, directory: string) => fileService.listPatchFiles(directory));
  ipcMain.handle(IPC_CHANNELS.filesSavePatch, (_event, request: SavePatchRequest) => fileService.savePatchFile(request));
  ipcMain.handle(IPC_CHANNELS.filesLoadPatch, (_event, fullPath: string) => fileService.loadPatchFile(fullPath));
  ipcMain.handle(IPC_CHANNELS.logsExportSysex, (_event, destinationPath: string, events: SysExEvent[]) =>
    fileService.exportSysExLog(destinationPath, events)
  );

  void createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
