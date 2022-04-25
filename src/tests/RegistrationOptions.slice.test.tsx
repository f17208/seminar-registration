import reducer, {
  setIsCompanyNameRequiredOnBadges,
  RegistrationOptionsState,
} from '../components/registration/RegistrationOptions/RegistrationOptionsForm.slice';

test('should reset company name if it is set as not required', () => {
  const previousState: RegistrationOptionsState = {
    companyName: 'Subito.it',
    isCompanyNameRequiredOnBadges: true,
    isSpecialAccomodationRequired: null,
  };

  expect(reducer(previousState, setIsCompanyNameRequiredOnBadges(false))).toEqual({
    companyName: '',
    isCompanyNameRequiredOnBadges: false,
    isSpecialAccomodationRequired: null,
  });
});
