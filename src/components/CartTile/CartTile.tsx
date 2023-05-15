import {
  Button,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import { splitToYears } from '../../func/years'

type Props = {
  id: number
  nameService: string
  prices: {
    currency: string
    [year: number]: number
  }
  duration: string[]
  deleteServiceFromCart: (serviceId: number) => void
}

export const CartTile = ({
  id,
  nameService,
  prices,
  duration,
  deleteServiceFromCart,
}: Props) => {
  const [editServiceDuration, setEditServiceDuration] = useState<boolean>(false)
  const [serviceDuration, setServiceDuration] = useState<string[]>([
    ...duration,
  ])

  const years = splitToYears(prices)

  const handleChangeServiceDuration = (
    event: React.MouseEvent<HTMLElement>,
    newServiceDuration: string[]
  ) => {
    if (newServiceDuration.length === 0) {
      return
    }
    const sortDurationArray = newServiceDuration.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    )
    setServiceDuration(sortDurationArray)
  }

  const handleToggleEditServiceDuration = () => {
    setEditServiceDuration((prev) => !prev)
    if (serviceDuration.length === 0) deleteServiceFromCart(id)
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {nameService}
        </TableCell>
        <TableCell align="right">
          {editServiceDuration ? (
            <ToggleButtonGroup
              value={serviceDuration}
              onChange={handleChangeServiceDuration}
              aria-label="Years for choice"
              size="small"
            >
              {years.map((year) => (
                <ToggleButton
                  key={year + Math.random()}
                  value={year}
                  aria-label={year}
                >
                  {year}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : (
            <>
              {serviceDuration.map((service, index, array) => {
                if (index + 1 === array.length) {
                  return <span>{service}</span>
                }

                return <span>{service}/</span>
              })}
            </>
          )}
        </TableCell>
        <TableCell align="right">
          <Button onClick={handleToggleEditServiceDuration}>
            {editServiceDuration ? 'Zatwierdz' : 'Edytuj'}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => deleteServiceFromCart(id)}>Usuń</Button>
        </TableCell>
      </TableRow>
    </>
  )
}
