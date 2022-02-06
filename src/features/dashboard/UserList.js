import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row, Table } from 'reactstrap'
import {
  deleteUser,
  removeSelectedUser,
  selectedUser,
  selectUsers,
  setSelectedUser,
  sortUsersByUsername,
} from './dashboardSlice'
import UserDeleteModal from './UserDeleteModal'

function UserList({ setIsUserFormVisible }) {
  const dispatch = useDispatch()

  const user = useSelector(selectedUser)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => setIsModalVisible(!isModalVisible)

  const users = useSelector(selectUsers)

  const handleDeleteButtonClicked = (user) => {
    return () => {
      dispatch(setSelectedUser(user))
      toggleModal()
    }
  }

  const handleEditButtonClicked = (user) => {
    return () => {
      dispatch(setSelectedUser(user))
      setIsUserFormVisible(true)
    }
  }

  const handleAddButtonClicked = () => {
    dispatch(removeSelectedUser())
    setIsUserFormVisible(true)
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id))
    dispatch(removeSelectedUser())
    toggleModal()
  }

  const renderHeader = () => (
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
  )

  const renderTable = () => (
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
          {users.map((user) => {
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
    </Container>
  )

  return (
    <>
      {renderHeader()}
      {renderTable()}

      <UserDeleteModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        handleDeleteUser={handleDeleteUser}
        username={user?.username}
      />
    </>
  )
}

export default UserList
