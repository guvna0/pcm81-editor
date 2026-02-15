import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: Variant;
};

export const Button = ({ variant = 'primary', className = '', children, ...rest }: Props): JSX.Element => (
  <button className={`btn btn--${variant} ${className}`.trim()} {...rest}>
    {children}
  </button>
);
