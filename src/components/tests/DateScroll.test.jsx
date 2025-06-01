import { render, fireEvent } from '@testing-library/react'
import DateScroll from '../DateScroll'
import { vi } from 'vitest'

describe('DateScroll', () => {
  const mockSetter = vi.fn()
  const dates = ['2025-08-02', '2025-08-03']

  it('renders date labels and buttons', () => {
    const { getByText } = render(
      <DateScroll dates={dates} dateSetter={mockSetter} selectedDate={null} />
    )
    expect(getByText('Pick a date')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
  })

  it('renders left and right scroll buttons', () => {
    const { container } = render(
      <DateScroll dates={dates} dateSetter={mockSetter} selectedDate={null} />
    )
    
    // Lucide icons are SVGs, we just make sure the clickable wrappers exist
    const buttons = container.querySelectorAll('.cursor-pointer')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})
