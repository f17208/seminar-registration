import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteCheckContainer } from '../../common/CompleteCheck/CompleteCheck';

import './PeopleAttendingForm.css';
import { 
  numberOfPeopleSelector, 
  setNumberOfPeople, 
  peopleDetailsSelector,
  setNthPersonDetail,
  isCompleteSelector,
} from './PeopleAttendingForm.slice';

export type PeopleAttendingFormProps = {};

export const PeopleAttendingForm: FC<PeopleAttendingFormProps> = () => {
  const numberOfPeople = useSelector(numberOfPeopleSelector);
  const peopleDetails = useSelector(peopleDetailsSelector);
  const isComplete = useSelector(isCompleteSelector);

  const dispatch = useDispatch();

  return (
    <div className="PeopleAttending-container">

      <div className="color--contrast">
        How many people will be attending?&nbsp;
        <select 
          className="PeopleAttending-select"
          id="numberOfPeopleSelect"
          onChange={e => dispatch(setNumberOfPeople(+e.target.value))}
        >
          {
            new Array(6)
              .fill(0)
              .map((_, i) => {
                if (i === 0) {
                  return <option key={i} value={i}>Please Choose</option>
                }
                return <option key={i} value={i}>{i}</option>
              })
          }
        </select>

        {
          numberOfPeople > 0 && (
            <h4 className="PeopleAttending-cta">Please provide full names:</h4>
          )
        }

        <div className="PeopleAttending-list">
          {
            new Array(numberOfPeople)
              .fill(0)
              .map((_, i) => {
                const details = peopleDetails[i];
                if (!details) {
                  console.warn('missing data', i);
                  return null;
                }
                return <span className="PeopleAttending-item">
                  Attendee {i + 1} name:&nbsp;
                  <input 
                    className="PeopleAttending-item-name"
                    key={i}
                    value={details.name}
                    onChange={e => (
                      dispatch(
                        setNthPersonDetail({ 
                          index: i, 
                          data: { 
                            name: e.target.value,
                          }
                        })
                      )
                    )}
                  />
                </span>
              })
          }
        </div>
      </div>

      {
        isComplete && (
          <CompleteCheckContainer />
        )
      }
    </div>
  );
}
