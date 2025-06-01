import { render, fireEvent } from '@testing-library/react'
import AvailableTimeSlot from '../AvailableTimeSlot'
import { vi } from 'vitest'

describe('AvailableTimeSlot', () => {
  const mockSetter = vi.fn()
  const slots = [
    { displayTime: '10:00 AM', displayDate: '2024/08/02' },
    { displayTime: '11:00 AM', displayDate: '2024/08/02' },
  ]

  it('renders slot list', () => {
    const { getByText } = render(
      <AvailableTimeSlot slots={slots} selectedTime={null} timeSetter={mockSetter} />
    )
    expect(getByText('10:00 AM')).toBeInTheDocument()
    expect(getByText('11:00 AM')).toBeInTheDocument()
  })

  it('calls timeSetter on slot click', () => {
    const { getByText } = render(
      <AvailableTimeSlot slots={slots} selectedTime={null} timeSetter={mockSetter} />
    )
    fireEvent.click(getByText('10:00 AM'))
    expect(mockSetter).toHaveBeenCalledWith('10:00 AM')
  })

  it('applies selected styles to selected time slot', () => {
    const { getByText } = render(
      <AvailableTimeSlot slots={slots} selectedTime={'10:00 AM'} timeSetter={mockSetter} />
    )
    expect(getByText('10:00 AM').parentElement).toHaveClass('bg-slate-400/20')
  })
})
