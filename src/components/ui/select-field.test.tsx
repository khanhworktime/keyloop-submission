import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SelectField } from './select-field'

describe('SelectField', () => {
  it('exposes an accessible value and translates its empty option to null', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SelectField
        label="Make"
        value="Aster"
        emptyOptionLabel="All makes"
        options={[{ label: 'Aster', value: 'Aster' }]}
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('combobox', { name: 'Make' }))
    await user.click(await screen.findByRole('option', { name: 'All makes' }))
    expect(onValueChange).toHaveBeenCalledWith(null)
  })
})
