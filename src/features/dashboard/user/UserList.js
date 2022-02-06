import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row, Table } from 'reactstrap';

import {
  deleteUser,
  removeSelectedUser,
  selectedUser,
  selectUsers,
  setSelectedUser,
  sortUsersByUsername,
} from '../dashboardSlice';
import UserDeleteModal from './UserDeleteModal';
import './User.css';

function UserList({ setIsUserFormVisible }) {
  const dispatch = useDispatch();

  // redux states
  const users = useSelector(selectUsers);
  const user = useSelector(selectedUser);

  // local states
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalVisible(!isDeleteModalVisible);

  const handleDeleteButtonClicked = (user) => {
    return () => {
      dispatch(setSelectedUser(user));
      toggleDeleteModal();
    };
  };

  const handleEditButtonClicked = (user) => {
    return () => {
      dispatch(setSelectedUser(user));
      setIsUserFormVisible(true);
    };
  };

  const handleAddButtonClicked = () => {
    setIsUserFormVisible(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id));
    dispatch(removeSelectedUser());
    toggleDeleteModal();
  };

  const renderHeader = () => (
    <Container className='bg-light border pt-2'>
      <Row className='mt-3'>
        <Col>
          <h2 className='mb-5 '>User List</h2>
        </Col>
        <Col className='d-flex justify-content-end align-items-start'>
          <Button color='primary' className='float-right' onClick={handleAddButtonClicked}>
            Add new
          </Button>
        </Col>
      </Row>
    </Container>
  );

  const renderTable = () => (
    <Container className='bg-light border pt-2'>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th
              onClick={() => {
                dispatch(sortUsersByUsername());
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              Username
            </th>
            <th>Email</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id, name, username = '', email, address = '' } = user;
            return (
              <tr key={id}>
                <th scope='row'>{id}</th>
                <td>{name}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{address.city}</td>
                <td>
                  <Button color='warning' className='text-white' onClick={handleEditButtonClicked(user)}>
                    edit
                  </Button>
                </td>
                <td>
                  <Button color='danger' onClick={handleDeleteButtonClicked(user)}>
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {users.length === 0 && <p className='text-center'>No users found.</p>}
    </Container>
  );

  return (
    <>
      {renderHeader()}
      {renderTable()}

      <UserDeleteModal
        isModalVisible={isDeleteModalVisible}
        toggleModal={toggleDeleteModal}
        handleDeleteUser={handleDeleteUser}
        username={user?.username}
      />
    </>
  );
}

export default UserList;
