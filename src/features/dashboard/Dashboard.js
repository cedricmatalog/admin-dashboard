import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsersAsync } from './dashboardSlice'
import './Dashboard.css'
import UserList from './UserList'
import UserForm from './UserForm'

function Dashboard() {
  const dispatch = useDispatch()

  const [isUserFormVisible, setIsUserFormVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    dispatch(fetchUsersAsync())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1 className='mb-5'>Dashboard</h1>

      {isUserFormVisible ? (
        <UserForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setIsUserFormVisible={setIsUserFormVisible}
        />
      ) : (
        <UserList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setIsUserFormVisible={setIsUserFormVisible}
        />
      )}
    </>
  )
}

export default Dashboard
