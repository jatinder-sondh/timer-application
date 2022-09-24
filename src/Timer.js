import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [counter, setCounter] = useState(0);
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

            }, 1000)
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
            <div className='mb'>
                <input type="number" placeholder="Enter Minute" onChange={(e) => setUserCount(e.target.value)} />
            </div>
            <div className='btn-flex'>
                <button onClick={() => setIsActive(!isActive)}>
                    {isActive ? "Pause" : "Start"}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="time">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
        </div>
    )
}

export default Timer