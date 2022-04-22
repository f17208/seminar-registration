import { useSelector } from 'react-redux';
import './App.css';
import { Step } from './components/common/Step/Step';
import { PeopleAttendingForm } from './components/registration/PeopleAttendingForm/PeopleAttendingForm';
import { 
  isCompleteSelector as PeopleAttendingIsCompleteSelector,
} from './components/registration/PeopleAttendingForm/PeopleAttendingForm.slice';

function App() {
  const peopleAttendingIsComplete = useSelector(PeopleAttendingIsCompleteSelector);

  return (
    <div className="App-container">
      <header className="App-header">
        Seminar <span className="text-primary">Registration</span>
      </header>
      <div className="App-main">
        <Step title="Step 1" color="aquamarine">
          <PeopleAttendingForm />
        </Step>

        <Step title="Step 2" color="lightblue" disabled={!peopleAttendingIsComplete}>
          <div>
            lorem ipsum dolor sit amet
          </div>
        </Step>

        <Step title="Step 3" color="bisque">
          <div>
            lorem ipsum dolor sit amet
          </div>
        </Step>
      </div>
    </div>
  );
}

export default App;
