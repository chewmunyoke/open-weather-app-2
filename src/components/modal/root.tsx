'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export default function Modal({
  children,
  show,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  show: boolean;
  onClose(): void;
}>) {
  const portalRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    portalRef.current = document.getElementById('modal');

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return portalRef.current
    ? createPortal(
        <CSSTransition
          classNames='modal-'
          noderef={modalRef}
          in={show}
          timeout={300}
          unmountOnExit
        >
          <div
            className='fixed inset-0 z-50 content-center bg-translucent-white-70 backdrop-blur-sm dark:bg-translucent-black-70'
            ref={modalRef}
          >
            <div className='responsive-modal rounded-2xl bg-translucent-white-20 p-4 dark:bg-translucent-black-20'>
              {children}
            </div>
          </div>
        </CSSTransition>,
        portalRef.current
      )
    : null;
}
