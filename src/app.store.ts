import { configureStore } from '@reduxjs/toolkit'

import peopleAttendingReducer from './components/registration/PeopleAttendingForm/PeopleAttendingForm.slice'
import registrationOptionsReducer from './components/registration/RegistrationOptions/RegistrationOptionsForm.slice'

export const store = configureStore({
  reducer: {
    PeopleAttending: peopleAttendingReducer,
    RegistrationOptions: registrationOptionsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch