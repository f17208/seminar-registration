import { FC } from 'react';
import { ReactComponent as CheckIcon } from '../../../assets/check-icon.svg';

import './CompleteCheck.css';

export const CompleteCheck: FC = () => {
  return <CheckIcon className="CompleteCheck-icon" />;
};

export interface CompleteCheckContainerProps {
  show?: boolean;
}

export const CompleteCheckContainer: FC<CompleteCheckContainerProps> = ({ show = true }) => {
  const classes = [
    'CompleteCheck-container',
    !show && 'CompleteCheck-container--hidden',
  ].filter(Boolean).join(' ');

  return <div className={classes}>
    <CompleteCheck />
  </div>;
};
