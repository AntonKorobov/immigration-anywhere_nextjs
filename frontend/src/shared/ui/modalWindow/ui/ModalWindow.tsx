import React, { ReactNode } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

interface IModalWindow {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  renderFooter?: () => ReactNode;
}

export function ModalWindow({
  children,
  isOpen,
  onClose,
  title,
  renderFooter,
}: IModalWindow) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="divide-y">
        <ModalHeader className="flex flex-col gap-1 text-2xl font-normal">
          {title}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {renderFooter && (
          <ModalFooter className="justify-center">{renderFooter()}</ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
