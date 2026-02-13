import { BrowserWindow, app, ipcMain } from 'electron';
import path from 'node:path';
import Store from 'electron-store';

type AppSettings = {
  midiInputId: string | null;
  midiOutputId: string | null;
};

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

const readSettings = (): AppSettings => (store as any).get('settings', defaults);

const createWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    width: 1460,
    height: 930,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: '#0b0d12',
    title: 'Modifier Music - PCM81 Editor',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  } else {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  ipcMain.handle('settings:read', () => readSettings());
  ipcMain.handle('settings:update', (_event, settings: AppSettings) => {
    (store as any).set('settings', settings);
    return readSettings();
  });

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
