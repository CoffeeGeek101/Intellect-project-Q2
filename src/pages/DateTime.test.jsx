import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { slots_data } from '../util/slots_data'
import { getMappedDays } from '../util/logic/slots'
import DateTime from './DateTime'

describe('DateTime component', () => {
  const mappedDates = getMappedDays(slots_data)
  const firstDate = [...mappedDates.keys()][0]
  const firstSlot = mappedDates.get(firstDate)?.[0]?.displayTime

  describe('Initial render', () => {
    test('renders without crashing and shows date picker after loading', async () => {
      render(<DateTime />)

      // Wait for component to render date section
      await waitFor(() =>
        expect(screen.getByText('Pick a date')).toBeInTheDocument()
      )
    })
  })

  describe('Date selection', () => {
    test('allows user to select a date', async () => {
      render(<DateTime />)

      await waitFor(() =>
        expect(screen.getByText('Pick a date')).toBeInTheDocument()
      )
      const dateToSelect = new Date(firstDate).getDate()
      const dateCard = screen.getAllByText(new RegExp(`${dateToSelect}`))[0]

      fireEvent.click(dateCard)

      // Confirm time slot heading appears
      await waitFor(() =>
        expect(screen.getByText('Available time slots')).toBeInTheDocument()
      )
    })
  })

  describe('Time slot selection', () => {
    test('allows user to select a time slot after selecting date', async () => {
      render(<DateTime />)

      const dateToSelect = new Date(firstDate).getDate()

      // Wait and select date
      await waitFor(() => screen.getByText('Pick a date'))
      const dateCard = screen.getAllByText(new RegExp(`${dateToSelect}`))[0]
      fireEvent.click(dateCard)

      // Wait and select time
      await waitFor(() => screen.getByText(firstSlot))
      const timeSlot = screen.getByText(firstSlot)
      fireEvent.click(timeSlot)

      expect(timeSlot.parentElement).toHaveClass('bg-slate-400/20')
    })
  })
})
