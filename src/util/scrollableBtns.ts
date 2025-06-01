import type { RefObject } from "react";

/**
 * Utility method to scroll a scrollable dom element. 
 * I am adding / substracting scroll value of the dom element
 * **/ 

    // these functions can futther be customized by passing amount we want to scroll per click as a parameter (scrollWidth)
    export const handleScrollFront = (component_ref : RefObject<HTMLDivElement | null>) => {
        if(component_ref.current){
        const scrollable = component_ref.current
        let scrollWidth = scrollable.clientWidth * 0.5;
        const newScrollLeft = scrollable.scrollLeft + scrollWidth;   // already scrolled length + new scroll length 
        const maxScrollLeft = scrollable.scrollWidth - scrollable.clientWidth; // this will give us the limit left to be scrolled

        scrollable.scroll({
            top: 0,
            left: Math.min(newScrollLeft, maxScrollLeft),   // length which can be scrolled.
            behavior: 'smooth'
            })
        }
    }

    export const handleScrollBack = (component_ref : RefObject<HTMLDivElement | null>) => {
        if(component_ref.current){
            const scrollable = component_ref.current 
            let scrollWidth = scrollable.clientWidth * 0.5;
            const newScrollLeft = scrollable.scrollLeft - scrollWidth; // already scrolled length - new scroll length 

            scrollable.scroll({
            top: 0,
            left: Math.max(newScrollLeft, 0),  // scrollLeft 0 is our limit, we don't want to scroll past 0 as it is our starting point 
            behavior: 'smooth'
            })
        }
    }