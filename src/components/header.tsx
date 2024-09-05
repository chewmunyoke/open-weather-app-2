'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { CSSTransition } from 'react-transition-group';

import IcSearch from '@/assets/search.svg';
import IcSpinner from '@/assets/spinner.svg';
import { apiURLGeocoding } from '@/constants';
import { GeocodingResponse, ResponseError } from '@/types';
import { getLocationFromSlug, getLocationPath } from '@/utils/helpers';
import { addLocation } from '@/utils/storage';

export default function Header({ location }: Readonly<{ location: string }>) {
  const formattedLocation = getLocationFromSlug(location);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>(formattedLocation);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGeocoding = async () => {
    setErrorMessage('');
    setIsLoading(true);
    const res = await fetch(apiURLGeocoding(query));
    const data = await res.json();
    if (res.ok) {
      const successData = data as GeocodingResponse[];
      if (data.length) {
        const location = `${successData[0].name}, ${successData[0].country}`;
        addLocation(location);
        setQuery(location);
        setIsLoading(false);
        router.push(getLocationPath(location));
      } else {
        setErrorMessage('Invalid country or city');
        setIsLoading(false);
        inputRef.current?.focus();
      }
    } else {
      const errorData = data as ResponseError;
      setErrorMessage(
        `Error ${errorData?.cod}: ${errorData?.message ?? 'An error occurred'}`
      );
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchGeocoding();
    }
  };

  const handleButtonClick = () => {
    fetchGeocoding();
  };

  return (
    <div className='responsive sticky top-0 z-40 py-4'>
      <div className='flex items-stretch justify-between gap-x-4'>
        <div className='relative flex-auto'>
          <input
            className='w-full rounded-2xl bg-translucent-white-80 px-4 pb-2 pt-5 backdrop-blur-md transition-all read-only:cursor-wait read-only:bg-translucent-white-70 read-only:text-gray-500 focus:outline-offset-4 focus:outline-primary motion-reduce:transition-none dark:bg-translucent-black-50 dark:read-only:bg-translucent-black-40 dark:read-only:text-gray-300 dark:focus:outline-violet-300'
            placeholder='Search country or city here'
            id='search-input'
            aria-labelledby='search-label'
            value={query}
            readOnly={isLoading}
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          ></input>
          <label
            className='absolute left-0 top-1.5 mx-4 text-2xs text-zinc-500 dark:text-zinc-400 sm:text-xs'
            id='search-label'
            htmlFor='search-input'
          >
            Country
          </label>
          <CSSTransition
            classNames='message-'
            nodeRef={errorMessageRef}
            in={Boolean(errorMessage)}
            timeout={200}
            unmountOnExit
          >
            <div
              className='absolute mt-2 flex min-h-6 items-center rounded-xl bg-[theme(colors.red.200/75%)] px-4 text-xs font-semibold text-red-700 shadow-md backdrop-blur-md sm:py-1 sm:text-sm'
              ref={errorMessageRef}
            >
              {errorMessage}
            </div>
          </CSSTransition>
        </div>
        <button
          className='group/button relative rounded-2xl bg-primary p-3 text-white backdrop-blur-md transition-all hover:bg-violet-800 focus:outline-offset-4 focus:outline-primary motion-reduce:transition-none dark:bg-translucent-black-40 dark:hover:bg-black dark:focus:outline-violet-300 sm:p-3.5'
          aria-label='Search'
          onClick={handleButtonClick}
        >
          {isLoading ? (
            <IcSpinner
              className='animate-spin'
              width={24}
              height={24}
              fill='currentColor'
            />
          ) : (
            <IcSearch width={24} height={24} />
          )}
          <span className='absolute left-1/2 top-full hidden -translate-x-1/2 translate-y-0.5 rounded-md bg-zinc-700 px-2 py-1 text-xs text-white group-hover/button:block sm:text-sm'>
            Search
          </span>
        </button>
      </div>
    </div>
  );
}
