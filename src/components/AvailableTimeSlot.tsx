import type { Dispatch, FC } from "react";
import type { slotsT } from "../util/logic/slots";

/**
 * AvailableTimeSlot is a component which render the available slot for a selected date.
 * 
 * @params : 
 *  - slots : An array of slots object (ref : "src/util/logic/slots.ts"), it is a list of all available slots
 *  - timeSetter : setter method of useState hook from parent, to pass the value to parent.
 *  - selectedTime : time slot selected by user, used for CSS updates based on user interaction.
 *  
 * **/ 

interface AvailableTimeSlotI {
  slots : slotsT[] | undefined;
  timeSetter : Dispatch<React.SetStateAction<string | null>>;
  selectedTime : string | null
}

const AvailableTimeSlot : FC<AvailableTimeSlotI> = ({slots, selectedTime, timeSetter}) => {

  return (
    <div className='w-full h-auto flex flex-col items-start gap-6'>

      <div className='flex flex-col items-start gap-1'>
        <p className='font-semibold text-[18px]'>Available time slots</p>
        <p className='font-medium text-[13px] text-gray-400'>Each session lasts for 30 minutes</p>
      </div>

      {
        slots ?
        // this component renders the UI block of all the available slots 
        <div className='w-full flex items-start justify-start flex-wrap gap-2'>
        {
          slots.map((slot, idx) => {
            return (
              <div 
              key={idx} 
              className={`p-2 border-[1px] rounded-md bg-slate-100 cursor-pointer
                          ${slot.displayTime === selectedTime ? 'bg-slate-400/20' : 'border-slate-300'}`
              }
              onClick={()=>timeSetter(slot.displayTime)}
              >
                <p className='font-normal text-[13px]'>{slot.displayTime}</p>
              </div>
            )
          })
        }
      </div> 
      : 
      (null)
      }

    </div>
  )
}

export default AvailableTimeSlot