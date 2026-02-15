import type { PatchFileEntry } from '../../../../shared/ipc';
import { Button } from '../base/Button';

type Props = {
  directory: string;
  files: PatchFileEntry[];
  selected: string | null;
  onSelect: (fullPath: string) => void;
  onRefresh: () => void;
};

export const FileBrowserList = ({ directory, files, selected, onSelect, onRefresh }: Props): JSX.Element => (
  <div className="file-browser">
    <div className="file-browser__header">
      <h4>File Browser</h4>
      <Button variant="ghost" onClick={onRefresh}>Refresh</Button>
    </div>
    <p className="muted">{directory}</p>
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          <button className={selected === file.fullPath ? 'is-selected' : ''} onClick={() => onSelect(file.fullPath)}>
            {file.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
