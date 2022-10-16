import { useEffect } from 'react';

import { Overlay, ModalWrapp } from './Modal.module';



export default function Modal({ largeImageURL, onClose }) {
  
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = element => {
      if (element.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
   return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWrapp>
          <img src={largeImageURL} alt="" />
        </ModalWrapp>
      </Overlay>
    );
}
  