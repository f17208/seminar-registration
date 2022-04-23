import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

export interface RegistrationOptionsState {
  isCompanyNameRequiredOnBadges: null | boolean;
  isSpecialAccomodationRequired: null | boolean;
  companyName: string;
}

const initialState: RegistrationOptionsState = {
  isCompanyNameRequiredOnBadges: null,
  isSpecialAccomodationRequired: null,
  companyName: '',
};

export const registrationOptionsSlice = createSlice({
  name: 'RegistrationOptions',
  initialState,
  reducers: {
    setIsCompanyNameRequiredOnBadges: (state, action: PayloadAction<boolean>) => {
      state.isCompanyNameRequiredOnBadges = action.payload;
      // reset companyName if it's not required
      if (!state.isCompanyNameRequiredOnBadges && state.companyName) {
        state.companyName = '';
      }
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    setIsSpecialAccomodationRequired: (state, action: PayloadAction<boolean>) => {
      state.isSpecialAccomodationRequired = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsCompanyNameRequiredOnBadges,
  setIsSpecialAccomodationRequired,
  setCompanyName,
  reset,
} = registrationOptionsSlice.actions;

// selectors
export const isCompanyNameRequiredOnBadgesSelector = (state: RootState) => (
  state.RegistrationOptions.isCompanyNameRequiredOnBadges
);
export const isSpecialAccomodationRequiredSelector = (state: RootState) => (
  state.RegistrationOptions.isSpecialAccomodationRequired
);
export const companyNameSelector = (state: RootState) => (
  state.RegistrationOptions.companyName
);

export const isCompleteSelector = (state: RootState) => {
  const slice = state.RegistrationOptions;
  return slice.isCompanyNameRequiredOnBadges !== null
    && (!slice.isCompanyNameRequiredOnBadges || slice.companyName)
    && slice.isSpecialAccomodationRequired !== null;
};

export default registrationOptionsSlice.reducer;
