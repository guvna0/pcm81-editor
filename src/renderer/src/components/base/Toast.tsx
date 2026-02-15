export type ToastItem = { id: string; message: string; tone: 'info' | 'success' | 'warning' | 'error' };

type Props = {
  items: ToastItem[];
  onDismiss: (id: string) => void;
};

export const ToastStack = ({ items, onDismiss }: Props): JSX.Element => (
  <div className="toast-stack">
    {items.map((item) => (
      <div key={item.id} className={`toast toast--${item.tone}`}>
        <span>{item.message}</span>
        <button onClick={() => onDismiss(item.id)}>×</button>
      </div>
    ))}
  </div>
);
