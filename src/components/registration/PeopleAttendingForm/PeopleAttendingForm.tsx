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

      <div className="PeopleAttending-question">
        How many people will be attending?&nbsp;
        <select
          className="PeopleAttending-select"
          id="numberOfPeopleSelect"
          value={numberOfPeople}
          onChange={e => dispatch(setNumberOfPeople(+e.target.value))}
        >
          {
            new Array(6)
              .fill(0)
              .map((_, i) => {
                // eslint-disable-next-line react/no-array-index-key
                return <option key={i} value={i}>
                  {i === 0 ? 'Please Choose' : i}
                </option>;
              })
          }
        </select>
      </div>
          
      <div>
        {
          numberOfPeople > 0 && (
            <h4 className="PeopleAttending-cta">Please provide full names:</h4>
          )
        }

        { numberOfPeople > 0 && (
          <div className="PeopleAttending-list">
            <table>
              <tbody>
                {
                  new Array(numberOfPeople)
                    .fill(0)
                    .map((_, i) => {
                      const details = peopleDetails[i];
                      if (!details) {
                        // eslint-disable-next-line no-console
                        console.warn('missing data', i);
                        return null;
                      }
                      // eslint-disable-next-line react/no-array-index-key
                      return <tr key={i} className="text-small">
                        <td>
                          Attendee {i + 1} Name:
                        </td>
                        <td>
                          <input
                            value={details.name}
                            onChange={e => (
                              dispatch(
                                setNthPersonDetail({
                                  index: i,
                                  data: {
                                    name: e.target.value,
                                  },
                                }),
                              )
                            )}
                          />
                        </td>
                      </tr>;
                    })
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

      {
        isComplete && (
          <CompleteCheckContainer />
        )
      }
    </div>
  );
};
