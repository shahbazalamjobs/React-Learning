import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbersAllowed) {
      str += "0123456789"
    }

    if (charsAllowed) {
      str += "!@#$%^&*()-_=+[{]};:'`~?"
    }


    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass)

  }, [length, numbersAllowed, charsAllowed, setPassword])

  // copy password to clipboard
  const copyPasswordtoClickboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3); // select in range first 3 value
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charsAllowed])

  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg p-2 my-12 text-orange-500 bg-gray-800">
        <h1 className="text-4xl text-center text-white my-4 py-4">Password Generator</h1>
        <div className="flex shadow overflow-hidden px-4 mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none w-full py-2 px-4 mb-2 rounded-l-md "
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClickboard}
            className='outline-none bg-blue-600 text-white py-2 px-4 mb-2 shrink-0 rounded-r-md'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range" min={6} max={100} value={length} className='cursor-pointer mx-4'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label> Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numbersAllowed}
              id='numberInput'
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Numbers </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charsAllowed}
              id='characterInput'
              onChange={() => {
                setCharsAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="characterInput"> Character </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
