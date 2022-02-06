import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function UserDeleteModal({ isModalVisible, toggleModal, handleDeleteUser, username }) {
  return (
    <Modal centered isOpen={isModalVisible} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete {username}?</ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
        <Button color='danger' onClick={handleDeleteUser}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UserDeleteModal;
