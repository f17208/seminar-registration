import { useSelector } from 'react-redux';
import './App.css';
import { Step } from './components/common/Step/Step';
import { CompleteRegistrationForm } from './components/registration/CompleteRegistration/CompleteRegistrationForm';
import { PeopleAttendingForm } from './components/registration/PeopleAttendingForm/PeopleAttendingForm';
import {
  isCompleteSelector as peopleAttendingIsCompleteSelector,
} from './components/registration/PeopleAttendingForm/PeopleAttendingForm.slice';
import {
  isCompleteSelector as registrationOptionsIsCompleteSelector,
} from './components/registration/RegistrationOptions/RegistrationOptionsForm.slice';
import { RegistrationOptionsForm } from './components/registration/RegistrationOptions/RegistrationOptionsForm';

function App() {
  const isPeopleAttendingComplete = useSelector(peopleAttendingIsCompleteSelector);
  const isRegistrationOptionsComplete = useSelector(registrationOptionsIsCompleteSelector);

  return (
    <div className="App-container">
      <header className="App-header">
        Seminar <span className="text-primary">Registration</span>
      </header>
      <div className="App-main">
        <Step title="Step 1" color="aquamarine">
          <PeopleAttendingForm />
        </Step>

        <Step title="Step 2" color="lightblue" disabled={!isPeopleAttendingComplete}>
          <RegistrationOptionsForm />
        </Step>

        <Step title="Step 3" color="bisque" disabled={!isRegistrationOptionsComplete}>
          <CompleteRegistrationForm />
        </Step>
      </div>
    </div>
  );
}

export default App;
