import cx from 'classnames';
import { forwardRef } from 'react';

import type { ButtonType } from '@/types';

interface ButtonProps {
  children: React.ReactNode;
  classNames?: string;
  type: ButtonType;
  tooltip?: string;
  onClick(): void;
}

export default forwardRef(function Button(
  {
    children,
    classNames,
    type,
    tooltip,
    onClick,
    ...props
  }: Readonly<ButtonProps & React.HTMLAttributes<HTMLButtonElement>>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const typeMap = {
    primary:
      'rounded-md border-transparent bg-primary px-4 py-2 text-white hover:bg-violet-800',
    secondary:
      'rounded-md border-gray-600 bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:border-translucent-white-50 dark:bg-transparent dark:text-translucent-white-50 dark:hover:border-white dark:hover:text-white',
    circular:
      'rounded-full border-transparent bg-white p-2 text-zinc-500 shadow-lg hover:text-black dark:border-translucent-white-50 dark:bg-transparent dark:text-translucent-white-50 dark:hover:border-white dark:hover:text-white',
  };
  const buttonClassNames = typeMap[type];

  return (
    <button
      className={cx(
        'group/button relative flex items-center justify-center border-2 text-sm transition-all focus:outline-offset-4 focus:outline-primary motion-reduce:transition-none dark:focus:outline-violet-300',
        buttonClassNames,
        classNames
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
      {tooltip ? (
        <span className='absolute bottom-full left-1/2 hidden -translate-x-1/2 -translate-y-1 rounded-md bg-zinc-700 px-2 py-1 text-xs text-white group-hover/button:block sm:text-sm'>
          {tooltip}
        </span>
      ) : null}
    </button>
  );
});
