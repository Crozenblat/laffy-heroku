import {useEffect} from "react";
import {throttle} from "../utilities/utilities";

const useParallax = (ref, speed = -1, top = 0) => {
    
    const throttledHandleScroll = throttle(handleScroll, 10)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(ref.current){
                throttledHandleScroll()
            };
        });

        return () => {window.removeEventListener("scroll", throttledHandleScroll)};
    });

    function handleScroll(){
        const pageTop = window.scrollY;
        const newTop = (top - (pageTop * speed));

        ref.current.style.top = `${newTop}px`;
    }
}

export default useParallax;