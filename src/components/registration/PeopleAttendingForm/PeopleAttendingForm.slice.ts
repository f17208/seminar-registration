import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

export interface PeopleDetails {
  name: string;
}

export interface PeopleAttendingState {
  peopleDetails: PeopleDetails[];
}

export interface SetNthPersonDetailInput {
  index: number;
  data: PeopleDetails;
}

const initialState: PeopleAttendingState = {
  peopleDetails: [],
};

export const peopleAttendingSlice = createSlice({
  name: 'PeopleAttending',
  initialState,
  reducers: {
    setNumberOfPeople: (state, action: PayloadAction<number>) => {
      while (state.peopleDetails.length < action.payload) {
        state.peopleDetails.push({
          name: '',
        });
      }
      if (state.peopleDetails.length > action.payload) {
        state.peopleDetails = state.peopleDetails.slice(0, action.payload);
      }
    },
    setNthPersonDetail: (state, action: PayloadAction<SetNthPersonDetailInput>) => {
      // used for sanitizing incoming data
      const dataToSet = action.payload.data;
      // we don't want spaces as name
      dataToSet.name = dataToSet.name.trimStart();
      state.peopleDetails[action.payload.index] = dataToSet;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNumberOfPeople,
  setNthPersonDetail,
  reset,
} = peopleAttendingSlice.actions;

// selectors
export const peopleDetailsSelector = (state: RootState) => (
  state.PeopleAttending.peopleDetails
);
export const isCompleteSelector = (state: RootState) => (
  state.PeopleAttending.peopleDetails.length > 0
    && state.PeopleAttending.peopleDetails.every(d => d.name)
);

export default peopleAttendingSlice.reducer;
