import { useEffect, useState } from "react"

function useWindowSize(){
    const [windowSize, setwindowSize] = useState({
        width:undefined,
        height:undefined
    })

    useEffect(() => {
      function handleResize(){
        setwindowSize({
            width:window.innerWidth,
            height:window.innerHeight
        })
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return ()=> window.removeEventListener('resize')
    }, [])
    return windowSize
}

export default useWindowSize