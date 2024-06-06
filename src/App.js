import React, { useCallback, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*(){}[]!~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-10 py-4 bg-gray-800 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type='text' 
            value={password} 
            readOnly
            className='outline-none w-full py-2 px-3 bg-white-800 text-black' 
            placeholder='password' 
          />
          <button 
            onClick={copyToClipboard} 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-col text-sm gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <input 
              type='range' 
              min={6} 
              max={100} 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              className='cursor-pointer' 
            />
            <label> Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input 
              type='checkbox' 
              checked={numberAllowed} 
              onChange={(e) => setNumberAllowed(e.target.checked)} 
              className='cursor-pointer' 
            />
            <label>Include Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input 
              type='checkbox' 
              checked={charAllowed} 
              onChange={(e) => setCharAllowed(e.target.checked)} 
              className='cursor-pointer' 
            />
            <label>Include Special Characters</label>
          </div>

          <button 
            onClick={PasswordGenerator} 
            className='mt-4 outline-none bg-green-600 text-white px-3 py-1 rounded'
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
