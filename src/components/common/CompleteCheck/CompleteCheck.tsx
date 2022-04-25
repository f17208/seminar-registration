import { FC } from 'react';
import { ReactComponent as CheckIcon } from '../../../assets/check-icon.svg';

import './CompleteCheck.css';

export const CompleteCheck: FC = () => {
  return <CheckIcon className="CompleteCheck-icon" />;
};

export const CompleteCheckContainer: FC = () => {
  return <div className="CompleteCheck-container">
    <CompleteCheck />
  </div>;
};
