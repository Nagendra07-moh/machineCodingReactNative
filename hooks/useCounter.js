import react,{useState,useEffect,useRef} from "react";

export  const useCounter = () =>{

    const [count,setCount] = useState({ HH: 0, MM: 0, SS: 0 });
    const [isRunning,setIsRunnig] = useState(false);
    const intervalRef = useRef(null);
    



    useEffect(()=>{
       if(isRunning){
         intervalRef.current = setInterval(()=>{
            setCount(prev =>{
                let {HH,MM,SS} = prev

                SS += 1;

                if(SS === 60){
                    MM += 1;
                    SS = 0
                }

                if(MM === 60){
                    MM = 0
                    HH += 1
                }

                return {HH,MM,SS}
            })
        },1000)
       }

        return () =>{
            clearInterval(intervalRef.current)
        }
    },[isRunning])

    const play = () =>{
        setIsRunnig(true);
    }

    const pause = () =>{
        setIsRunnig(false);
    }

    const reset = () =>{
        setIsRunnig(false);
         setCount({ HH: 0, MM: 0, SS: 0 });
    }


    return {
        count,
        pause,
        play,
        reset
    }
}