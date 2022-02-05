import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import { deleteUser, selectUsers, sortUsersByUsername } from './dashboardSlice'

function UserList({ selectedUser, setSelectedUser, setIsUserFormVisible }) {
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => setIsModalVisible(!isModalVisible)

  const users = useSelector(selectUsers)

  const handleDeleteButtonClicked = user => {
    return () => {
      setSelectedUser(user)
      toggleModal()
    }
  }

  const handleEditButtonClicked = user => {
    return () => {
      setSelectedUser(user)
      setIsUserFormVisible(true)
    }
  }

  const handleAddButtonClicked = () => {
    setSelectedUser(undefined)
    setIsUserFormVisible(true)
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser.id))
    setSelectedUser(undefined)
    toggleModal()
  }

  return (
    <>
      <Container className='bg-light border pt-2'>
        <Row className='mt-3'>
          <Col>
            <h2 className='mb-5 '>User List</h2>
          </Col>
          <Col>
            <Button color='primary' className='float-right' onClick={handleAddButtonClicked}>
              Add new
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className='bg-light border pt-2'>
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th
                onClick={() => {
                  dispatch(sortUsersByUsername())
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
            {users.map(user => {
              const { id, name, username = '', email, address = '' } = user
              return (
                <tr key={id}>
                  <th scope='row'>{id}</th>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                  <td>
                    <Button color='warning' onClick={handleEditButtonClicked(user)}>
                      edit
                    </Button>
                  </td>
                  <td>
                    <Button color='danger' onClick={handleDeleteButtonClicked(user)}>
                      delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        {users.length === 0 && <p className='text-center'>No users found.</p>}

        <Modal centered isOpen={isModalVisible} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete {selectedUser?.username}?</ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={toggleModal}>
              Cancel
            </Button>
            <Button color='danger' onClick={handleDeleteUser}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  )
}

export default UserList
