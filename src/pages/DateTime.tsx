import { useEffect, useState } from 'react'
import DateScroll from '../components/DateScroll'
import AvailableTimeSlot from '../components/AvailableTimeSlot'
import { slots_data } from '../util/slots_data'
import { getMappedDays, type slotsT } from '../util/logic/slots'

/**
 * DateTime is the Parent component 
 * - Renders DateScroll and AvailableTimeSlot with a layout
 * - User inputs are stored here and passed down the children
 * - When this component mounts, we are preparing our data from 'slots_data' which can be used by child components
 * - Parent will render children once it get the data ready else, it renders a fallback  
 * **/ 

const DateTime = () => {

    const [selectedDate, setSelectedDate] = useState<string|null>(null);
    const [selectedTime, setSelectedTime] = useState<string| null>(null);
    const [mappedDates, setMappedDates] = useState<Map<string, slotsT[]>|null>(null);

    useEffect(()=> {
        // note : This data might come from a external data source like a DB and will return a promise,
        // this is why I have used useEffect here, instead of useMemo. 
        setMappedDates(getMappedDays(slots_data))
    },[]);

  return (
    <div className='w-[100dvw] h-[100dvh] bg-yellow-900/10 flex justify-center items-center'>
        {
            mappedDates ?
            <div className='w-[80%] md:w-[50%] lg:w-[30%] h-auto flex flex-col items-start justify-center gap-10'>
            <DateScroll 
            dates={[...mappedDates.keys()]}
            dateSetter={setSelectedDate}
            selectedDate={selectedDate}
            />
            <AvailableTimeSlot 
            slots={mappedDates.get(selectedDate!)} 
            timeSetter={setSelectedTime} 
            selectedTime={selectedTime}
            />
        </div>
        :
        <div>Loading...</div>    
    }
    </div>
  )
}

export default DateTime