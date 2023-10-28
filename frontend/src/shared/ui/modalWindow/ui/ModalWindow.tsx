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
}

export function ModalWindow({ children, isOpen, onClose, title }: IModalWindow) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
