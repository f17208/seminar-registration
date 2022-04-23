import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import './CompleteRegistration.css';

import { reset as resetPeopleAttending } from '../PeopleAttendingForm/PeopleAttendingForm.slice';
import { reset as resetRegistrationOptions } from '../RegistrationOptions/RegistrationOptionsForm.slice';

export type CompleteRegistrationFormProps = {};

export const CompleteRegistrationForm: FC<CompleteRegistrationFormProps> = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    setIsConfirmed(false);
    dispatch(resetPeopleAttending());
    dispatch(resetRegistrationOptions());
  }, [setIsConfirmed, dispatch]);

  return (
    <div className="CompleteRegistration-container">

      <div className="CompleteRegistration-questions">
        <div className="CompleteRegistration-question">
          Are you ready to rock?
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(_isConfirmed => !_isConfirmed)}
          />
        </div>

        <div className="CompleteRegistration-submit">
          <button
            type="button"
            disabled={!isConfirmed}
            onClick={onSubmit}
          >
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};
