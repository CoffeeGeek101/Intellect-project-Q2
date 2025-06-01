export type slotsT = {
  displayDate : string,
  displayTime : string,
  displayTimeEnd : string
}

// getMappedDays maps all the unique dates with slots associated with the particular date

export const getMappedDays = (master_arr : slotsT[]) => {
  let all_slots = [...master_arr];
  const dateMap = new Map();

  all_slots.forEach((slot : slotsT) => {
    if(!dateMap.has(slot.displayDate)){          // if unique date is not present add to a map
      dateMap.set(slot.displayDate, [slot])     
    }else{
      dateMap.set(slot.displayDate, [...dateMap.get(slot.displayDate), slot])    // if present, add the slot to the date.
    }
  });
  return dateMap
}