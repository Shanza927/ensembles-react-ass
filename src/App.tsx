import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SharedState } from './state'

export interface AppProps {
  value: Record<string, unknown>
}

const App: React.FC<AppProps> = ({ value }) => {
  const renderCount = useRef(0);

  const [localValue, setLocalValue]  = useState<Record<string, unknown>>(value);
  const [timesChanged, setTimesChanged] = useState<number>(0);

  // Update our shared state with a copy of our local value
  useEffect(() => {
    SharedState.value = {...localValue};
  }, [localValue])

  // Sync shared value to local
  const sharedStateValue = SharedState.value;
  useEffect(() => {
    setLocalValue({...sharedStateValue})
  }, [sharedStateValue])

  renderCount.current++;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Rendered {renderCount.current} times
        </p>
        <button onClick={() => {
          SharedState.value = ({ value: Math.random().toString(36).slice(2) })
          setTimesChanged(timesChanged + 1);
        }}>
          Update shared value
        </button>
        <p>
          The local value is {String(localValue['value'])}
        </p>
        <p>
          The shared value is {String(sharedStateValue['value'])}
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
