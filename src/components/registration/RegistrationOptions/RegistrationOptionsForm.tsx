import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteCheckContainer } from '../../common/CompleteCheck/CompleteCheck';

import './RegistrationOptions.css';
import {
  isCompanyNameRequiredOnBadgesSelector,
  isSpecialAccomodationRequiredSelector,
  setIsCompanyNameRequiredOnBadges,
  setIsSpecialAccomodationRequired,
  isCompleteSelector,
  companyNameSelector,
  setCompanyName,
} from './RegistrationOptionsForm.slice';

export type RegistrationOptionsFormProps = {};

export const RegistrationOptionsForm: FC<RegistrationOptionsFormProps> = () => {
  const isCompanyNameRequiredOnBadges = useSelector(isCompanyNameRequiredOnBadgesSelector);
  const isSpecialAccomodationRequired = useSelector(isSpecialAccomodationRequiredSelector);
  const companyName = useSelector(companyNameSelector);

  const isComplete = useSelector(isCompleteSelector);

  const dispatch = useDispatch();

  return (
    <div className="RegistationOptions-container">

      <div className="RegistrationOptions-questions">
        <div className="RegistrationOptions-question">
          Would you like your company name on your badges?
          <div>
            <input
              type="radio"
              id="company-name-required-yes"
              name="company-name-required"
              value="1"
              checked={!!isCompanyNameRequiredOnBadges}
              onChange={() => dispatch(setIsCompanyNameRequiredOnBadges(true))}
            />
            <label htmlFor="company-name-required-yes">Yes</label>

            <input
              type="radio"
              id="company-name-required-no"
              name="company-name-required"
              value="0"
              checked={
                isCompanyNameRequiredOnBadges === null
                  ? undefined
                  : !isCompanyNameRequiredOnBadges
              }
              onChange={() => dispatch(setIsCompanyNameRequiredOnBadges(false))}
            />
            <label htmlFor="company-name-required-no">No</label>
          </div>
        </div>

        {
          isCompanyNameRequiredOnBadges && (
            <div className="RegistrationOptions-company-name text-small">
              Company name:&nbsp;
              <input
                value={companyName}
                onChange={e => dispatch(setCompanyName(e.target.value))}
              />
            </div>
          )
        }

        <div className="RegistrationOptions-question">
          Will anyone in your group require special accomodation?
          <div>
            <input
              type="radio"
              id="special-accomodation-required-yes"
              name="special-accomodation-required"
              value="1"
              checked={!!isSpecialAccomodationRequired}
              onChange={() => dispatch(setIsSpecialAccomodationRequired(true))}
            />
            <label htmlFor="special-accomodation-required-yes">Yes</label>

            <input
              type="radio"
              id="special-accomodation-required-no"
              name="special-accomodation-required"
              value="0"
              checked={
                isSpecialAccomodationRequired === null
                  ? undefined
                  : !isSpecialAccomodationRequired
              }
              onChange={() => dispatch(setIsSpecialAccomodationRequired(false))}
            />
            <label htmlFor="special-accomodation-required-no">No</label>
          </div>
        </div>
      </div>

      {
        isComplete && (
          <CompleteCheckContainer />
        )
      }
    </div>
  );
};
