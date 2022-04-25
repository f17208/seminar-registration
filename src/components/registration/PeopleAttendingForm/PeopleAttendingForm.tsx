import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteCheckContainer } from '../../common/CompleteCheck/CompleteCheck';

import './PeopleAttendingForm.css';
import {
  setNumberOfPeople,
  peopleDetailsSelector,
  setNthPersonDetail,
  isCompleteSelector,
} from './PeopleAttendingForm.slice';

export type PeopleAttendingFormProps = {};

export const PeopleAttendingForm: FC<PeopleAttendingFormProps> = () => {
  const peopleDetails = useSelector(peopleDetailsSelector);
  const isComplete = useSelector(isCompleteSelector);

  const dispatch = useDispatch();

  const numberOfPeople = useMemo(() => {
    return peopleDetails.length;
  }, [peopleDetails]);

  return (
    <div className="PeopleAttending-container">
      <div className="PeopleAttending-question">
        <label id="people-attending-label">How many people will be attending?</label>
        &nbsp;
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

      <div className="PeopleAttending-list">
        {numberOfPeople > 0 && (
          <h4 className="PeopleAttending-cta">
            Please provide full names:
          </h4>
        )}

        <table>
          <tbody>
            {
              new Array(5)
                .fill(0)
                .map((_, i) => {
                  const value = peopleDetails[i]?.name;
                  const isDisabled = i >= peopleDetails.length;
                  const classes = [
                    'text-small',
                    isDisabled && 'people-row--disabled',
                  ].filter(Boolean).join(' ');

                  return <tr
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={classes}
                  >
                    <td>
                      Attendee {i + 1} Name:
                    </td>
                    <td>
                      <input
                        id={`people-attending-input-${i}`}
                        value={value}
                        disabled={isDisabled}
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

      <CompleteCheckContainer show={isComplete} />
    </div>
  );
};
