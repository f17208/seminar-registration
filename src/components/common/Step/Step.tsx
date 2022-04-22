import { FC } from 'react';
import './Step.css';

export type StepProps = {
  title: string;
  children: JSX.Element;
  disabled?: boolean;
  color?: string;
};

export const Step: FC<StepProps> = ({ title, children, disabled, color }) => {

  return (
    <div className="Step-container" style={{ backgroundColor: color }}>
      <header className="Step-header">
        {title}
      </header>
      <div className="Step-content">
        <fieldset className="Step-fieldset" disabled={disabled}>
          {children}
        </fieldset>
      </div>
    </div>
  );
}
