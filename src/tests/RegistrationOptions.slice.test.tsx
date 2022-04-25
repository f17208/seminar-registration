import reducer, {
  setIsCompanyNameRequiredOnBadges,
  RegistrationOptionsState,
  setCompanyName,
} from '../components/registration/RegistrationOptions/RegistrationOptionsForm.slice';

test('should reset company name if it is set as not required', () => {
  const previousState: RegistrationOptionsState = {
    companyName: 'Subito.it',
    isCompanyNameRequiredOnBadges: true,
    isSpecialAccomodationRequired: null,
  };

  const newState = reducer(
    previousState, 
    setIsCompanyNameRequiredOnBadges(false)
  );

  expect(newState).toEqual({
    companyName: '',
    isCompanyNameRequiredOnBadges: false,
    isSpecialAccomodationRequired: null,
  });
});


test('should not accept spaces as company name', () => {
  const previousState: RegistrationOptionsState = {
    companyName: '',
    isCompanyNameRequiredOnBadges: true,
    isSpecialAccomodationRequired: null,
  };

  const newState = reducer(
    previousState,
    setCompanyName('   ')
  );

  expect(newState).toEqual({
    companyName: '',
    isCompanyNameRequiredOnBadges: true,
    isSpecialAccomodationRequired: null,
  });
});
