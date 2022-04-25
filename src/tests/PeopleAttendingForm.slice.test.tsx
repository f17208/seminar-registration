import reducer, {
  PeopleAttendingState,
  setNthPersonDetail,
  setNumberOfPeople,
} from '../components/registration/PeopleAttendingForm/PeopleAttendingForm.slice';

test('should set number of people from initial state', () => {
  const previousState: PeopleAttendingState = {
    peopleDetails: [],
  };
  
  const newState = reducer(previousState, setNumberOfPeople(2));

  expect(newState).toEqual({
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

  const newState = reducer(previousState, setNumberOfPeople(2));

  expect(newState).toEqual({
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

test('should not accept spaces as name', () => {
  const previousState: PeopleAttendingState = {
    peopleDetails: [
      {
        name: '',
      },
    ],
  };

  const newState = reducer(
    previousState,
    setNthPersonDetail({
      index: 0,
      data: { name: '   ' }
    })
  );

  expect(newState).toEqual({
    peopleDetails: [
      {
        name: '',
      },
    ],
  });
});