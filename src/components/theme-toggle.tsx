'use client';

import { useTheme } from 'next-themes';

import IcMoon from '@/assets/moon.svg';
import IcSun from '@/assets/sun.svg';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label
      className='fixed bottom-4 right-4 block cursor-pointer rounded-full bg-primary p-3 text-white transition-colors hover:bg-violet-800'
      htmlFor='mode-toggle'
    >
      <input
        className='absolute inset-0 cursor-pointer appearance-none rounded-full transition-all focus:outline-offset-4 focus:outline-primary dark:focus:outline-violet-300'
        type='checkbox'
        id='mode-toggle'
        checked={theme === 'dark'}
        onChange={handleChange}
      />
      <IcSun
        className='dark:hidden'
        width={20}
        height={20}
        fill='currentColor'
      />
      <IcMoon
        className='hidden dark:block'
        width={20}
        height={20}
        fill='currentColor'
      />
      <span className='sr-only'>Toggle light / dark mode</span>
    </label>
  );
}
