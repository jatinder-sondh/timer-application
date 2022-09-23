import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [userCount, setUserCount] = useState(3)

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        if (minuteCounter === parseInt(userCount)) {
          setIsActive(false);
          setCounter(0);
          setSecond('00');
          setMinute('00')
        }
        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
        setSecond(computedSecond);
        setMinute(computedMinute);
        setCounter(counter => counter + 1);

      }, 10)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])

  const resetTimer = () => {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00')
  }

  return (
    <div className='flex'>
      <input type="number" placeholder="Enter Mins" value={userCount} onChange={(e) => setUserCount(e.target.value)} />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
      <div className="time">
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
    </div>

  );
}

export default App;
