import React, { useRef, useState } from 'react'

function Countdown() {
    const [timer, settimer] = useState(0)
    const [input, setinput] = useState(0)
    const setIntervalRef=useRef()
    const [running, setrunning] = useState(false)
    function handleStart() {
        if(!running){
            if(setIntervalRef.current){
                clearInterval(setIntervalRef.current)
            }
            if(timer===0){
                settimer(Number(input))
            }
            setrunning(true)
            setIntervalRef.current=setInterval(()=>{
                settimer((prev)=>{
                    if(prev<=0){
                        clearInterval(setIntervalRef.current)
                        return 0
                    }
                    return prev-1
                })
                
            },1000)
        }
        else {
            settimer(timer)
        }
      }
    function handleReset(){
        clearInterval(setIntervalRef.current)
        setrunning(false)
        settimer(0)
        
    }
    function handlePause(){
        if(running){
            clearInterval(setIntervalRef.current)
            setrunning(false)
        }
    }
    
  return (
    <div>
        <input type='number' value={input} onChange={(e)=> setinput(e.target.value)}/>

        <button onClick={handleStart}>{!running && timer>0 ? 'Resume':'Start'}</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>

        <h2>{timer}</h2>
    </div>
  )
}

export default Countdown