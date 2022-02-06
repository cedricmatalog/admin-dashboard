import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import { addUser, removeSelectedUser, selectedUser, selectUsers, updateUser } from '../dashboardSlice';

function UserForm({ setIsUserFormVisible }) {
  const dispatch = useDispatch();

  // redux state
  const user = useSelector(selectedUser);
  const users = useSelector(selectUsers);

  // local states
  const [userDetails, setUserDetails] = useState(user);
  const [errors, setErrors] = useState({});

  const handleInputValueChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleCancelButtonClicked = () => {
    dispatch(removeSelectedUser());
    setIsUserFormVisible(false);
  };

  const handleSubmitButtonClicked = () => {
    const isUserDetailsValid = validateUserDetails();
    if (!isUserDetailsValid) return;

    if (user) {
      dispatch(updateUser(userDetails));
      dispatch(removeSelectedUser());
    } else {
      dispatch(addUser(userDetails));
    }

    setIsUserFormVisible(false);
  };

  const validateUserDetails = () => {
    let errorMessages = {};
    const { name, email, username } = userDetails || {};

    if (name === undefined || name === '') {
      errorMessages['name'] = 'Name is required.';
    }

    if (email === undefined || email === '') {
      errorMessages['email'] = 'Email is required.';
    } else {
      if (!isEmailValid(email)) {
        errorMessages['email'] = 'Email is invalid.';
      }
    }

    if (username !== '' && users.filter((user) => user.username === username).length > 0) {
      errorMessages['username'] = 'Username is already taken.';
    }

    setErrors(errorMessages);

    return Object.keys(errorMessages).length === 0;
  };

  const isEmailValid = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const { id, name, username, address, email } = userDetails || {};

  const renderHeader = () => (
    <Container className='bg-light border pt-2'>
      <Row className='mt-3'>
        <Col>
          <h2 className='mb-5'>Form</h2>
        </Col>
      </Row>
    </Container>
  );

  const renderForm = () => (
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
                  defaultValue={name}
                  onChange={handleInputValueChange}
                  className={errors.name ? 'border-danger' : ''}
                />
                {errors.name && <p className='text-danger'>{errors.name}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='email' sm={2}>
                Email
              </Label>
              <Col>
                <Input
                  name='email'
                  defaultValue={email}
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
                <Input
                  name='username'
                  defaultValue={username}
                  onChange={handleInputValueChange}
                  className={errors.username ? 'border-danger' : ''}
                />
                {errors.username && <p className='text-danger'>{errors.username}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='city' sm={2}>
                City
              </Label>
              <Col>
                <Input name='city' defaultValue={id ? address.city : ''} onChange={handleInputValueChange} />
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );

  const renderButtons = () => (
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
  );

  return (
    <>
      {renderHeader()}
      {renderForm()}
      {renderButtons()}
    </>
  );
}

export default UserForm;
