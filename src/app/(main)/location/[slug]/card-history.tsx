'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import IcSearch from '@/assets/search.svg';
import IcTrash from '@/assets/trash.svg';
import Button from '@/components/button';
import Card from '@/components/card';
import Loading from '@/components/loading';
import Message from '@/components/message';
import DialogModal from '@/components/modal/dialog';
import {
  getFormattedDate,
  getLocationFromSlug,
  getLocationPath,
} from '@/utils/helpers';
import {
  addLocation,
  getSortedHistoryList,
  removeLocation,
} from '@/utils/storage';

function HistoryListItem({
  name,
  timestamp,
  onSearch,
  onDelete,
}: Readonly<{
  name: string;
  timestamp: number;
  onSearch(): void;
  onDelete(): void;
}>) {
  const handleSearchClick = () => {
    onSearch();
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <li className='flex items-center gap-x-4 rounded-2xl bg-translucent-white-70 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-translucent-white-50 motion-reduce:transition-none dark:bg-translucent-black-70 dark:hover:bg-translucent-black-50'>
      <div className='flex flex-auto flex-col justify-between gap-y-0.5 sm:flex-row sm:items-center'>
        <span>{name}</span>
        <span className='text-2xs dark:text-zinc-400 sm:text-sm'>
          {getFormattedDate(new Date(timestamp))}
        </span>
      </div>
      <div className='flex items-center gap-x-2'>
        <Button
          type='circular'
          tooltip='Search'
          aria-label={`Search weather of ${name}`}
          onClick={handleSearchClick}
        >
          <IcSearch width={20} height={20} />
        </Button>
        <Button
          type='circular'
          tooltip='Delete'
          aria-label={`Delete ${name} from history`}
          onClick={handleDeleteClick}
        >
          <IcTrash width={20} height={20} />
        </Button>
      </div>
    </li>
  );
}

export default function HistoryCard({
  currentLocation,
}: Readonly<{ currentLocation: string }>) {
  const router = useRouter();
  const [historyList, setHistoryList] = useState<[string, number][]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSearch = (location: string) => {
    addLocation(location);
    router.push(getLocationPath(location));
  };

  const handleDelete = (location: string) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  const handleDeleteConfirm = () => {
    removeLocation(selectedLocation);
    setHistoryList(getSortedHistoryList());
    setShowModal(false);
  };

  useEffect(() => {
    const historyList = getSortedHistoryList(
      true,
      getLocationFromSlug(currentLocation)
    );
    setHistoryList(historyList);
    setIsLoading(false);
  }, []);

  return (
    <Card className='bg-translucent-white-80 dark:bg-translucent-black-70'>
      <h2 className='mb-5 mt-1'>Search History</h2>
      {isLoading ? (
        <Loading />
      ) : !historyList.length ? (
        <Message
          type='information'
          message='You have no search history. Start searching above!'
        />
      ) : (
        <ul className='flex flex-col gap-y-4'>
          {historyList.map(([name, timestamp], index) => (
            <HistoryListItem
              key={`history-${index}`}
              name={name}
              timestamp={timestamp}
              onSearch={() => handleSearch(name)}
              onDelete={() => handleDelete(name)}
            />
          ))}
        </ul>
      )}
      <DialogModal
        show={showModal}
        cancelLabel='Cancel'
        confirmLabel='Confirm'
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      >
        <div>
          <h2 className='mb-2 text-lg font-medium'>{selectedLocation}</h2>
          <p>
            Are you sure you want to delete this location from your search
            history?
          </p>
        </div>
      </DialogModal>
    </Card>
  );
}
