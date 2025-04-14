import { useCallback, useEffect, useState } from "react"

function useFetch(url, options){
    const [Data, setData] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    
    const fetchData=useCallback(async()=>{
        setloading(true)
        seterror(null)
        try{
            const response=await fetch(url, options)

            if(!response.ok){
                throw new Error(`Request failed with status ${response.status}`)
            }
    
            const result= await response.json()
            setData(result)
        }
       catch(err){
        seterror(err.message || 'Error occured while fetching')
       }
       finally{
        setloading(false)
       }
        
    },[url, options])

    useEffect(() => {
      fetchData()
    }, [fetchData])

    const refetch=useCallback(()=>{
        fetchData()
    }, [fetchData])
    return {Data, loading, error, refetch}
}

export default useFetch