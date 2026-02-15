import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  open: boolean;
  onClose: () => void;
}>;

export const Modal = ({ title, open, onClose, children }: Props): JSX.Element | null => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <header className="modal__header">
          <h3>{title}</h3>
          <button className="btn btn--ghost" onClick={onClose}>Close</button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};
