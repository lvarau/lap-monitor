import React, {useState, useEffect} from 'react';
import './styles.css'

import ShowLaps from './components/ShowLaps'
import ShowTime from './components/ShowTime'
import Button from './components/Button'

const App = () => {
  const [numLaps, setNumLaps] = useState(0)
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let timer = null
    if(running) {
      timer = setInterval(() => {
        setTime(old => old + 1)
      }, 1000)
    }
    return () => {
      if(timer) {
        clearInterval(timer)
      }
    }  
  }, [running])

  const toggleRunning = () => {
    setRunning(!running)
  }

  const reset = () => {
    setNumLaps(0)
    setTime(0)
  }

  const incrementLaps = () => {
    setNumLaps(numLaps + 1)
  }

  const decrementLaps = () => {
    if(numLaps > 0) {
      setNumLaps(numLaps - 1)
    }
  }

  return (
    <>
      <ShowLaps laps={numLaps} />
      <Button text='+'className='bigger' onClick={incrementLaps}/>
      <Button text='-'className='bigger' onClick={decrementLaps} />

      {
        numLaps > 0 &&
        <ShowTime time={Math.round(time/numLaps)} />
      }
      <Button text={running ? 'Pausar' : 'Iniciar'} onClick={toggleRunning}/>
      <Button text='Reiniciar' onClick={reset}/>
    </>
  );
}

export default App;
