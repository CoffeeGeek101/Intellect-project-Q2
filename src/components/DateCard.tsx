import { useEffect, useState, type Dispatch, type FC } from "react";
import { DayMap } from "../util/slots_data";

/**
 * DateCard is responsible for rendering the dates on the DateScroll parent component
 * @params : 
 *  - date : a string of date e.g : 2025/08/02
 *  - dateSetter : setter method of useState hook from parent, to pass the value to parent.
 *  - selectedDate : date selected by user
 * **/ 

interface DateCardI{
    date : string;
    dateSetter : Dispatch<React.SetStateAction<string | null>>;
    selectedDate : string | null;
}

const DateCard : FC<DateCardI> = ({date, dateSetter, selectedDate}) => {

    const [dateInfo, setDateInfo] = useState<Date | null>(null)

    // on change in date, we are creating a JS Date object to extract Day and Date from the date string.
    useEffect(()=>{
        let date_ = new Date(date)
        setDateInfo(date_)
    },[date])

  return (
    <div 
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-md cursor-pointer min-w-16
                ${date === selectedDate ? 'bg-slate-400/20' : 'bg-slate-100 '}`}
    onClick={()=>dateSetter(date)}
    >
        <p className={`text-[12px] ${date === selectedDate ? 'font-semibold' : 'font-light'}`}>{dateInfo?.getDate()}</p>
        {/* DayMap is the mapped Day abbreviation to the number return from "getDay" method */}
        {dateInfo && <p className='text-[12px] font-light'>{DayMap[dateInfo.getDay()]}</p>}
    </div>
  )
}

export default DateCard