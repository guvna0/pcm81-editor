import type { MidiConnectionState, MidiPort } from '../../shared/ipc';

export class MidiService {
  private state: MidiConnectionState = 'disconnected';

  listPorts(): { inputs: MidiPort[]; outputs: MidiPort[] } {
    return {
      inputs: [
        { id: 'in-1', name: 'PCM81 MIDI In' },
        { id: 'in-2', name: 'USB MIDI Interface In' }
      ],
      outputs: [
        { id: 'out-1', name: 'PCM81 MIDI Out' },
        { id: 'out-2', name: 'USB MIDI Interface Out' }
      ]
    };
  }

  connect(_inputId: string, _outputId: string): MidiConnectionState {
    this.state = 'connected-idle';
    return this.state;
  }

  disconnect(): MidiConnectionState {
    this.state = 'disconnected';
    return this.state;
  }

  getState(): MidiConnectionState {
    return this.state;
  }
}
