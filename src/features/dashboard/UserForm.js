import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { addUser, updateUser } from './dashboardSlice'

function UserForm({ selectedUser, setSelectedUser, setIsUserFormVisible }) {
  const dispatch = useDispatch()

  const [userDetails, setUserDetails] = useState(selectedUser)
  const [errors, setErrors] = useState({})

  const handleInputValueChange = e => {
    const { name, value } = e.target

    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleCancelButtonClicked = () => {
    setSelectedUser(undefined)
    setIsUserFormVisible(false)
  }

  const handleSubmitButtonClicked = () => {
    let errorMessages = {}

    if (userDetails?.name === undefined || userDetails?.name === '') {
      errorMessages = { ...errorMessages, name: 'Name is required' }
    }

    if (userDetails?.email === undefined || userDetails?.email === '') {
      errorMessages = { ...errorMessages, email: 'Email is required' }
    }

    setErrors(errorMessages)

    if (Object.keys(errorMessages).length !== 0) return

    if (userDetails.id) {
      dispatch(updateUser(userDetails))
    } else {
      dispatch(addUser(userDetails))
    }

    handleCancelButtonClicked()
  }

  return (
    <>
      <Container className='bg-light border pt-2'>
        <Row className='mt-3'>
          <Col>
            <h2 className='mb-5'>Form</h2>
          </Col>
        </Row>
      </Container>

      <Container className='bg-light border pt-5 pb-5'>
        <Row>
          <Col md='1'></Col>
          <Col>
            <Form>
              <FormGroup row>
                <Label for='name' sm={2}>
                  Name
                </Label>

                <Col>
                  <Input
                    name='name'
                    defaultValue={userDetails?.name ?? ''}
                    onChange={handleInputValueChange}
                    className={errors.email ? 'border-danger' : ''}
                  />
                  {errors.name && <p className='text-danger'>{errors.name}</p>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='exampleEmail' sm={2}>
                  Email
                </Label>
                <Col>
                  <Input
                    name='email'
                    defaultValue={userDetails?.email ?? ''}
                    onChange={handleInputValueChange}
                    className={errors.email ? 'border-danger' : ''}
                  />
                  {errors.email && <p className='text-danger'>{errors.email}</p>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='username' sm={2}>
                  Username
                </Label>
                <Col>
                  <Input name='username' defaultValue={userDetails?.username ?? ''} onChange={handleInputValueChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='city' sm={2}>
                  City
                </Label>
                <Col>
                  <Input
                    name='city'
                    defaultValue={userDetails?.id ? userDetails?.address.city : ''}
                    onChange={handleInputValueChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className='bg-light border pt-2'>
        <Row className='mt-3 mb-3'>
          <Col></Col>
          <Col className='d-flex justify-content-end'>
            <Button color='danger' outline className='me-2' onClick={handleCancelButtonClicked}>
              Cancel
            </Button>
            <Button color='success' onClick={handleSubmitButtonClicked}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserForm
