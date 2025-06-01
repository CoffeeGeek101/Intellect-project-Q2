import { ArrowLeft, ArrowRight } from 'lucide-react'
import DateCard from './DateCard'
import { useRef, type Dispatch, type FC } from 'react'
import { handleScrollBack, handleScrollFront } from '../util/scrollableBtns'

/**
 * DateScroll is the a scrollable component, where we are rendering DateCard array
 * 
 * @params : 
 *  - dates : array of date strings e.g : 2025/08/02
 *  - dateSetter : setter method of useState hook from parent, to pass the value to parent.
 *  - selectedDate : date selected by user, used for CSS updates based on user interaction.
 * 
 * **/ 

interface DateScrollI {
    dates : string[],
    dateSetter : Dispatch<React.SetStateAction<string | null>>,
    selectedDate : string | null
}

const DateScroll : FC<DateScrollI> = ({dates, dateSetter, selectedDate}) => {
   
 //DOM node ref for onClick scroll behaviour, go to "src/util/scrollableBtns.ts" for implementation  
  const scrollableWrapper = useRef<HTMLDivElement|null>(null);

  return (
    <div className='w-full flex flex-col items-start justify-start gap-4'>
        <p className='font-semibold'>Pick a date</p>
        <div className='w-full flex items-center justify-center gap-1 h-auto'>
            <div className='p-3 rounded-full bg-slate-400/30 cursor-pointer' onClick={()=>handleScrollBack(scrollableWrapper)}>
                <ArrowLeft/>
            </div>
            <div ref={scrollableWrapper} className='flex-2 h-full overflow-x-scroll'>
                <div className='h-full flex items-start justify-start gap-2'>
                    {
                        dates.map((date, idx) => {
                            return(
                                <DateCard date={date} dateSetter={dateSetter} selectedDate={selectedDate} key={idx}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className='p-3 rounded-full bg-slate-400/30 cursor-pointer' onClick={()=>handleScrollFront(scrollableWrapper)}>
                <ArrowRight/>
            </div>
        </div>
    </div>
  )
}

export default DateScroll