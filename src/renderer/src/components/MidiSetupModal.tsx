type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const mockPorts = ['Scarlett MIDI', 'UM-ONE mk2', 'IAC Driver Bus 1'];

export const MidiSetupModal = ({ isOpen, onClose }: Props): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <div className="modal">
        <h2>MIDI Setup</h2>
        <p>This scaffolding view uses placeholder ports until live MIDI wiring is implemented.</p>
        <label>
          MIDI Input
          <select>{mockPorts.map((port) => <option key={`in-${port}`}>{port}</option>)}</select>
        </label>
        <label>
          MIDI Output
          <select>{mockPorts.map((port) => <option key={`out-${port}`}>{port}</option>)}</select>
        </label>
        <div className="modal__actions">
          <button className="button button--ghost" onClick={onClose}>Cancel</button>
          <button className="button" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};
