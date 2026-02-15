import { useEffect, useState } from 'react';
import type { MidiConnectionState, MidiPort } from '../../../../shared/ipc';
import { Button } from '../base/Button';
import { Modal } from '../base/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onStateChange: (state: MidiConnectionState) => void;
};

export const MidiSetupModal = ({ open, onClose, onStateChange }: Props): JSX.Element => {
  const [inputs, setInputs] = useState<MidiPort[]>([]);
  const [outputs, setOutputs] = useState<MidiPort[]>([]);
  const [inputId, setInputId] = useState('');
  const [outputId, setOutputId] = useState('');

  useEffect(() => {
    if (!open) return;
    void window.pcm81Api.listMidiPorts().then((ports) => {
      setInputs(ports.inputs);
      setOutputs(ports.outputs);
      setInputId(ports.inputs[0]?.id ?? '');
      setOutputId(ports.outputs[0]?.id ?? '');
    });
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="MIDI Setup">
      <div className="field">
        <label>Input Port</label>
        <select value={inputId} onChange={(event) => setInputId(event.target.value)}>
          {inputs.map((port) => (
            <option key={port.id} value={port.id}>{port.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Output Port</label>
        <select value={outputId} onChange={(event) => setOutputId(event.target.value)}>
          {outputs.map((port) => (
            <option key={port.id} value={port.id}>{port.name}</option>
          ))}
        </select>
      </div>
      <div className="modal__actions">
        <Button variant="secondary" onClick={() => void window.pcm81Api.disconnectMidi().then(onStateChange)}>Disconnect</Button>
        <Button onClick={() => void window.pcm81Api.connectMidi(inputId, outputId).then(onStateChange)}>Connect</Button>
      </div>
    </Modal>
  );
};
