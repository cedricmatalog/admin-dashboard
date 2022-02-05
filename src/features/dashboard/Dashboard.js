import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsersAsync } from './dashboardSlice'

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersAsync())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <h1>Dashboard</h1>
}

export default Dashboard
