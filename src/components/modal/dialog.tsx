import Button from '@/components/button';

import Modal from './root';

export default function DialogModal({
  children,
  show,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  show: boolean;
  cancelLabel?: string;
  confirmLabel: string;
  onCancel?(): void;
  onConfirm(): void;
  onClose(): void;
}>) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className='flex flex-col gap-y-4'>
        {children}
        <div className='flex justify-end gap-x-4'>
          {cancelLabel && onCancel ? (
            <Button type='secondary' onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
          <Button type='primary' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
