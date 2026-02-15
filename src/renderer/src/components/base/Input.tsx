import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>): JSX.Element => <input className="input" {...props} />;
