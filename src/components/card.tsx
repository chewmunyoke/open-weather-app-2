import cx from 'classnames';
import { forwardRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default forwardRef(function Card(
  {
    children,
    className,
    ...props
  }: Readonly<CardProps & React.HTMLProps<HTMLDivElement>>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cx(
        'rounded-3xl p-4 backdrop-blur-sm transition-all motion-reduce:transition-none',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
