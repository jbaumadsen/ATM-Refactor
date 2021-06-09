import logo from './logo.svg';
import './App.css';
import React from 'react';
import ATMDeposit from './components/ATMDeposit';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [atmMode, setAtmMode] = React.useState();
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if(Number(event.target.value <= 0)){
      return setValidTransaction(false);
    }
    if(atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    }else {
      setValidTransaction(true)
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    newTotal >= 0 && setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    console.log('handle mode select')
    setAtmMode(e.target.value);
    if(e.target.value === "Cash Back") {
      console.log ('Cash Back');
      console.log('isDeposit set to false, isDeposit : ' + setIsDeposit(false));
    }
    if(e.target.value === "Deposit") {
      console.log ('Deposit');
      console.log ('isDeposit set to true, isDeposit : ' + setIsDeposit(true));
    }
    // (atmMode == 'Deposit') ? setIsDeposit(true) : (atmMode == 'Cash Back') ? setIsDeposit(false) : 0;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} >
        <h1>MAC</h1>
        <h2 id="total">{status}</h2>

        {
          atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        }
        <div>
        {
          !atmMode && <label>Select an action below to continue</label>
        }
        {
          atmMode !== "Cash Back" && <Button className="btn" onClick={(e) => handleModeSelect(e)} value="Cash Back"> Get Cash Back</Button>

        }
        {
          atmMode !== "Deposit" && <Button onClick={(e) => handleModeSelect(e)} value="Deposit">Make a Deposit</Button>
        }
        </div>
      </form>
    </div>
  );
}

export default App;
