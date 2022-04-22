import './App.css';
import { Step } from './components/common/Step/Step';

function App() {
  return (
    <div className="App-container">
      <header className="App-header">
        Seminar <span className="text-primary">Registration</span>
      </header>
      <div className="App-main">
        <Step title="Step 1" color="aquamarine">
          <div>
            -
          </div>
        </Step>

        <Step title="Step 2" color="lightblue">
          <div>
            -
          </div>
        </Step>

        <Step title="Step 3" color="bisque">
          <div>
            -
          </div>
        </Step>
      </div>
    </div>
  );
}

export default App;
