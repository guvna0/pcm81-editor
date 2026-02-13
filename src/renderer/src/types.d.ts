declare global {
  interface Window {
    pcm81Api: {
      readSettings: () => Promise<{ midiInputId: string | null; midiOutputId: string | null }>;
      updateSettings: (settings: { midiInputId: string | null; midiOutputId: string | null }) => Promise<{ midiInputId: string | null; midiOutputId: string | null }>;
    };
  }
}

export {};
