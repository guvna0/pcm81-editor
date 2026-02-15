import type { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren): JSX.Element => <section className="card">{children}</section>;
