import reducer, {
  PeopleAttendingState,
  setNumberOfPeople,
} from '../components/registration/PeopleAttendingForm/PeopleAttendingForm.slice';

test('should set number of people from initial state', () => {
  const previousState: PeopleAttendingState = {
    peopleDetails: [],
  };

  expect(reducer(previousState, setNumberOfPeople(2))).toEqual({
    peopleDetails: [
      {
        name: '',
      },
      {
        name: '',
      },
    ],
  });
});

test('should set a smaller number of people from state containing a greater number people', () => {
  const previousState: PeopleAttendingState = {
    peopleDetails: [
      {
        name: 'Test 1',
      },
      {
        name: 'Test 2',
      },
      {
        name: 'Test 3',
      },
      {
        name: 'Test 4',
      },
    ],
  };

  expect(reducer(previousState, setNumberOfPeople(2))).toEqual({
    peopleDetails: [
      {
        name: 'Test 1',
      },
      {
        name: 'Test 2',
      },
    ],
  });
});
