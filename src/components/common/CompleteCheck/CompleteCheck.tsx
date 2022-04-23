import { FC } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

import './CompleteCheck.css'

export const CompleteCheck: FC = () => {
  return <FaRegCheckCircle className="CompleteCheck-icon" />;
}

export const CompleteCheckContainer: FC = () => {
  return <div className="CompleteCheck-container">
    <CompleteCheck />
  </div>
}