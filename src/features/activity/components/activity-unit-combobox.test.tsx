import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ActivityUnitCombobox } from './activity-unit-combobox'

const units = [
  {
    id: 'IU-2048',
    stockNumber: 'STK-2048',
    vin: 'WDD2231861A002048',
    label: 'Aster A7 Touring',
  },
  {
    id: 'IU-1934',
    stockNumber: 'STK-1934-EXTENDED-IDENTITY',
    vin: 'NTH48277P18',
    label: 'Northstar E2 Motion',
  },
]

describe('ActivityUnitCombobox', () => {
  it('filters searchable identities and emits multiple selected stock numbers', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const ControlledCombobox = (): React.JSX.Element => {
      const [value, setValue] = useState<string[]>([])
      return <ActivityUnitCombobox id="inventory-unit" label="Inventory unit (optional)" units={units} value={value} onChange={(next) => { setValue(next); onChange(next) }} />
    }
    render(<ControlledCombobox />)

    const input = screen.getByRole('combobox', { name: 'Inventory unit (optional)' })
    await user.click(input)
    const firstOption = await screen.findByRole('option', { name: /STK-2048.*Aster A7 Touring/i })
    await user.click(firstOption)
    await user.type(input, 'Northstar')
    const option = await screen.findByRole('option', { name: /STK-1934-EXTENDED-IDENTITY.*Northstar E2 Motion/i })

    expect(option).toHaveClass('grid-cols-[40px_minmax(0,1fr)_20px]')
    expect(within(option).getByText('E2', { exact: true })).toHaveClass('h-10', 'w-10')
    expect(within(option).getByText('STK-1934-EXTENDED-IDENTITY')).toHaveClass('truncate')

    await user.click(option)
    expect(onChange).toHaveBeenLastCalledWith(['STK-2048', 'STK-1934-EXTENDED-IDENTITY'])
    expect(screen.getAllByText('STK-2048').length).toBeGreaterThan(0)
    expect(screen.getAllByText('STK-1934-EXTENDED-IDENTITY').length).toBeGreaterThan(0)
    expect(within(input.parentElement!).queryByText('STK-2048')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Selected inventory units')).toContainElement(screen.getByRole('button', { name: 'Remove STK-2048' }))

    await user.clear(input)
    await user.type(input, 'No such inventory unit')
    expect(await screen.findByText('No matching inventory unit.')).toBeVisible()
  })
})
