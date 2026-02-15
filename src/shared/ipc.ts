export const IPC_CHANNELS = {
  settingsRead: 'settings:read',
  settingsUpdate: 'settings:update',
  midiListPorts: 'midi:list-ports',
  midiConnect: 'midi:connect',
  midiDisconnect: 'midi:disconnect',
  midiGetState: 'midi:get-state',
  filesListPatches: 'files:list-patches',
  filesSavePatch: 'files:save-patch',
  filesLoadPatch: 'files:load-patch',
  logsExportSysex: 'logs:export-sysex'
} as const;

export type MidiPort = {
  id: string;
  name: string;
};

export type MidiConnectionState = 'disconnected' | 'connected-idle' | 'receiving' | 'error';

export type AppSettings = {
  midiInputId: string | null;
  midiOutputId: string | null;
};

export type ProgramBank = 'program' | 'register';

export type PatchData = {
  id: string;
  name: string;
  bank: ProgramBank;
  program: number;
  algorithm: string;
  parameters: Record<string, number>;
};

export type PatchFileEntry = {
  id: string;
  name: string;
  fullPath: string;
  modifiedAt: number;
  sizeBytes: number;
  parseState: 'valid' | 'unsupported' | 'corrupt';
};

export type SysExEvent = {
  id: string;
  timestamp: number;
  direction: 'in' | 'out';
  status: 'ok' | 'warning' | 'error';
  summary: string;
  bytesHex: string;
  productId?: '0x07' | '0x10' | 'unknown';
};

export type SavePatchRequest = {
  directory: string;
  patch: PatchData;
  targetBank: ProgramBank;
};

export interface Pcm81IpcApi {
  readSettings: () => Promise<AppSettings>;
  updateSettings: (settings: AppSettings) => Promise<AppSettings>;
  listMidiPorts: () => Promise<{ inputs: MidiPort[]; outputs: MidiPort[] }>;
  connectMidi: (inputId: string, outputId: string) => Promise<MidiConnectionState>;
  disconnectMidi: () => Promise<MidiConnectionState>;
  getMidiState: () => Promise<MidiConnectionState>;
  listPatchFiles: (directory: string) => Promise<PatchFileEntry[]>;
  savePatchFile: (request: SavePatchRequest) => Promise<{ syxPath: string; metaPath: string }>;
  loadPatchFile: (fullPath: string) => Promise<PatchData>;
  exportSysExLog: (destinationPath: string, events: SysExEvent[]) => Promise<{ path: string }>;
}

/**
 * SysEx codec contract only.
 * TODO: Implement real PCM80-compatible encoding/decoding after hardware-capture validation.
 */
export interface SysExCodec {
  encodeProgramDump: (patch: PatchData) => Uint8Array;
  decodeProgramDump: (bytes: Uint8Array) => PatchData;
  validateMessage: (bytes: Uint8Array) => { valid: boolean; reason?: string };
}

export const createUnimplementedSysExCodec = (): SysExCodec => ({
  encodeProgramDump: () => {
    throw new Error('TODO: SysEx encoding not implemented; use hardware-validated fixtures.');
  },
  decodeProgramDump: () => {
    throw new Error('TODO: SysEx decoding not implemented; use hardware-validated fixtures.');
  },
  validateMessage: () => ({
    valid: false,
    reason: 'TODO: SysEx validation not implemented; fixtures pending.'
  })
});
