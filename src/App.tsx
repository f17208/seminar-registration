import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Step, StepProps } from './components/common/Step/Step';
import { CompleteRegistrationForm } from './components/registration/CompleteRegistration/CompleteRegistrationForm';
import { PeopleAttendingForm } from './components/registration/PeopleAttendingForm/PeopleAttendingForm';
import {
  isCompleteSelector as peopleAttendingIsCompleteSelector,
} from './components/registration/PeopleAttendingForm/PeopleAttendingForm.slice';
import {
  isCompleteSelector as registrationOptionsIsCompleteSelector,
} from './components/registration/RegistrationOptions/RegistrationOptionsForm.slice';
import { RegistrationOptionsForm } from './components/registration/RegistrationOptions/RegistrationOptionsForm';

import './App.css';

type StepConfig = Omit<StepProps, 'title' | 'disabled'> & { title?: string; key: string }

function App() {
  const isPeopleAttendingComplete = useSelector(peopleAttendingIsCompleteSelector);
  const isRegistrationOptionsComplete = useSelector(registrationOptionsIsCompleteSelector);

  const stepsConfig: (StepConfig)[] = useMemo(() => {
    return [
      {
        color: 'aquamarine',
        children: <PeopleAttendingForm />,
        key: 'people-attending',
      },
      {
        color: 'lightblue',
        children: <RegistrationOptionsForm />,
        disabled: !isPeopleAttendingComplete,
        key: 'registration-options',
      },
      {
        color: 'bisque',
        children: <CompleteRegistrationForm />,
        disabled: !isPeopleAttendingComplete || !isRegistrationOptionsComplete,
        key: 'complete-registration',
      },
    ];
  }, [
    isPeopleAttendingComplete,
    isRegistrationOptionsComplete,
  ]);

  return (
    <div className="App-container">
      <header className="App-header">
        Seminar <span className="text-primary">Registration</span>
      </header>
      <div className="App-main">
        {
          stepsConfig.map((stepConfig, i) => {
            return <Step title={`Step ${i + 1}`} {...stepConfig} />;
          })
        }
      </div>
    </div>
  );
}

export default App;
