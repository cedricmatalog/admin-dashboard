import dashboardReducer, { addUser, updateUser, deleteUser } from './dashboardSlice'

describe('counter reducer', () => {
  // const initialState = {
  //   value: 3,
  //   status: 'idle',
  // }
  it('should handle initial state', () => {
    expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual({
      isUsersSortedByUsername: false,
      selectedUser: null,
      users: [],
    })
  })

  it('should handle addUser', () => {
    // const actual = counterReducer(initialState, increment());
    // expect(actual.value).toEqual(4);
  })

  it('should handle updateUser', () => {
    // const actual = counterReducer(initialState, decrement())
    // expect(actual.value).toEqual(2)
  })

  it('should handle deleteUser', () => {
    // const actual = counterReducer(initialState, incrementByAmount(2))
    // expect(actual.value).toEqual(5)
  })
})
