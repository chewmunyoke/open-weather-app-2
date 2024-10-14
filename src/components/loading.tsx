import IcSpinner from '@/assets/spinner.svg';

export default function Loading() {
  return (
    <div className='m-4 flex min-h-[inherit] items-center justify-center gap-x-2'>
      <div>Loading...</div>
      <IcSpinner
        className='shrink-0 animate-spin'
        width={24}
        height={24}
        fill='currentColor'
      />
    </div>
  );
}
