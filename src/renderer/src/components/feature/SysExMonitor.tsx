import type { SysExEvent } from '../../../../shared/ipc';
import { Button } from '../base/Button';
import { Modal } from '../base/Modal';

type Props = {
  open: boolean;
  events: SysExEvent[];
  onClose: () => void;
};

export const SysExMonitor = ({ open, events, onClose }: Props): JSX.Element => {
  const exportLog = async (): Promise<void> => {
    await window.pcm81Api.exportSysExLog('./sysex-monitor.log', events);
  };

  return (
    <Modal open={open} onClose={onClose} title="SysEx Monitor">
      <Button onClick={() => void exportLog()}>Export Log</Button>
      <div className="sysex-list">
        {events.map((event) => (
          <article key={event.id} className={`sysex-item sysex-item--${event.status}`}>
            <strong>{event.direction.toUpperCase()}</strong> {event.summary}
            <code>{event.bytesHex}</code>
          </article>
        ))}
      </div>
    </Modal>
  );
};
