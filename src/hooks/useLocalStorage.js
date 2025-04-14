import { useEffect } from "react"
import { useState } from "react"

function useLocalStorage(key, initialvalue){
    const [value, setvalue] = useState(()=>{
        try{
            const item=window.localStorage.getItem(key)
            return item? JSON.parse(item):initialvalue
        }
        catch(err){
            console.error(err)
            return initialvalue
        }
    })

    useEffect(() => {
      try{
        if(value===undefined){
            window.localStorage.removeItem(key)
        }
        else {
            window.localStorage.setItem(key, JSON.parse(value))
        }
      }
      catch(err){
        console.error(err)

      }
    }, [value, key])
    return [value, setvalue]
}

export default useLocalStorage