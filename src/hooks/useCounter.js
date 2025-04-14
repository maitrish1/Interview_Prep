import { useEffect, useState } from "react"

function useCounter(num, by){
    const [numValue, setnumValue] = useState(num)
    const [byValue, setbyValue] = useState(by)
    const [sum, setsum] = useState(num+by)
    
    useEffect(() => {
        setsum(numValue,byValue)
    }, [byValue,numValue])
    
    return [sum, setnumValue, setbyValue]
}

export default useCounter

