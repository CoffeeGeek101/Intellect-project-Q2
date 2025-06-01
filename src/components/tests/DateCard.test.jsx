import { render, fireEvent } from '@testing-library/react'
import DateCard from '../DateCard'
import { vi } from 'vitest'

describe('DateCard', () => {
  const mockSetter = vi.fn()
  const testDate = '2025-08-02'

  it('renders day and date correctly', () => {
    const { getByText } = render(
      <DateCard date={testDate} dateSetter={mockSetter} selectedDate={null} />
    )
    expect(getByText('2')).toBeInTheDocument() // Day of the month, tighly coupled with testDate
    expect(getByText('Sat')).toBeInTheDocument() // From DayMap[6], tighly coupled with testDate
  })

  it('calls setter on click', () => {
    const { getByText } = render(
       <DateCard date={testDate} dateSetter={mockSetter} selectedDate={null} />
    )
    fireEvent.click(getByText('2'))
    expect(mockSetter).toHaveBeenCalledWith(testDate)
  })

  it('applies selected styles if selectedDate matches', () => {
    const { container } = render(
      <DateCard date={testDate} dateSetter={mockSetter} selectedDate={testDate} />
    )
    expect(container.firstChild).toHaveClass('bg-slate-400/20')
  })
})
