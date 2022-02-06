import dashboardReducer, { addUser, updateUser, deleteUser } from './dashboardSlice';
import { generateId } from './dashboardUtilities';

describe('counter reducer', () => {
  const initialState = {
    users: [
      {
        name: 'name',
        email: 'email',
        username: 'username',
        id: 1,
        address: {
          city: 'city',
        },
      },
    ],
    selectedUser: null,
    isUsersSortedByUsername: false,
  };

  const testUser = {
    name: 'testName',
    email: 'testEmail',
    username: 'testUsername',
    id: generateId(initialState),
    address: {
      city: 'testCity',
    },
  };

  const updatedTestUser = {
    name: 'updatedTestName',
    email: 'updatedTestEmail',
    username: 'updatedTestUsername',
    id: 1,
    city: 'updatedTestCity',
  };

  it('should handle initial state', () => {
    expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      selectedUser: null,
      isUsersSortedByUsername: null,
    });
  });

  it('should handle addUser', () => {
    const actual = dashboardReducer(initialState, addUser(testUser));
    expect(actual.users.length).toEqual(2);
  });

  it('should handle updateUser', () => {
    const actual = dashboardReducer(initialState, updateUser(updatedTestUser));

    expect(actual.users[0]).toEqual({
      name: 'updatedTestName',
      email: 'updatedTestEmail',
      username: 'updatedTestUsername',
      id: 1,
      address: { city: 'updatedTestCity' },
    });
  });

  it('should handle deleteUser', () => {
    const actual = dashboardReducer(initialState, deleteUser(1));
    expect(actual.users.length).toEqual(0);
  });
});
