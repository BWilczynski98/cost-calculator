import { Button, TableCell, TableRow } from '@mui/material'
import { t } from 'i18next'
import type { CartItem } from '../../types/service'

type Props = Omit<CartItem, 'promotionOptions'> & {
  deleteServiceFromCart: (serviceId: number) => void
}

export const CartTile = ({ id, nameService, price, duration, deleteServiceFromCart }: Props) => {
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell
          component="th"
          scope="row"
        >
          {nameService}
        </TableCell>
        <TableCell align="right">
          {duration.map((year, index, array) => {
            if (index + 1 === array.length) {
              return <span key={index + Math.random()}>{year}</span>
            }
            return <span key={index + Math.random()}>{year}/</span>
          })}
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => deleteServiceFromCart(id)}>{t('delete')}</Button>
        </TableCell>
      </TableRow>
    </>
  )
}
