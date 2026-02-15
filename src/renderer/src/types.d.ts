import type { Pcm81IpcApi } from '../../shared/ipc';

declare global {
  interface Window {
    pcm81Api: Pcm81IpcApi;
  }
}

export {};
