import { use, useState,useEffect,useRef } from 'react'
import { useCallback } from 'react'

function App() {
  const [len, setlen] = useState(8)
  const[numberallowed, setnumberallowed] = useState(false)
  const[symbolallowed, setsymbolallowed] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook is used to store the cached value of the function
  //useCallback hook is used to memoize the function so that it is not recreated on every render

  const passwordRef = useRef()

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed){
      str += "0123456789"
    }
    if(symbolallowed){
      str += "!@#$%^&*()_+{}|:<>?-=[];',./`~"
    }
    for(let i=0;i<len;i++){
      let index = Math.floor(Math.random()*str.length)
      pass += str[index]
    }
    setpassword(pass)
  },[len,numberallowed,symbolallowed])//dependencies are len,numberallowed and symbolallowed which are stored cached value of the function

  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setTimeout(() => {
    setpassword(passwordgenerator());
  }, 300);
  },[password])//dependencies is password which is stored cached value of the function

  useEffect(()=>{
    passwordgenerator()
  },[len,numberallowed,symbolallowed,passwordgenerator])//here we are calling password generator function whenever len,numberallowed and symbolallowed changes

  return (
    <>
    <h1 className = "text-4xl font-bold text-center text-white m-5">Password Generator</h1> 
    <div className='absolute inset-0 flex flex-col items-center justify-center gap-4'>
      <label className='text-white'>Password Length: {len}</label>
      <input type="range" min="4" max="20" value={len} onChange={(e)=>setlen(e.target.value)} className="w-1/3"/>
      <div className='text-white'>
        <input type="checkbox" id="number" checked={numberallowed} onChange={(e)=>setnumberallowed(e.target.checked)}/>
        <label htmlFor='number' className='ml-2'>Include Numbers</label>
      </div>
      <div className='text-white'>
        <input type="checkbox" id="symbol" checked={symbolallowed} onChange={(e)=>setsymbolallowed(e.target.checked)}/>
        <label htmlFor='symbol' className='ml-2'>Include Symbols</label>
      </div>
      <input className='mt-4 p-4 bg-gray-200 rounded w-1/3 text-center break-all read-only' placeholder='Password' value={password} ref={passwordRef} readOnly/>
      <button className='mt-4 p-2 bg-blue-500 text-white rounded active:bg-black' onClick={copytoclipboard}>Copy to Clipboard</button>
    </div>  
    </>
  )
}

export default App
