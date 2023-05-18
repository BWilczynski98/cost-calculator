import {
  Container,
  Paper,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import { t } from 'i18next'
import { useSelector, useDispatch } from 'react-redux'
import { cartSelector } from '../../store/cart-slice'
import { CartTile } from '../CartTile'
import { cartActions } from '../../store/cart-slice'

export const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.selectCartItems)
  console.log(cart)
  const deleteServiceFromCart = (serviceId: number) => {
    dispatch(cartActions.deleteServiceFromCart({ serviceId }))
  }

  return (
    <Container>
      <Paper
        sx={{ padding: 2 }}
        elevation={5}
      >
        <Stack spacing={2}>
          <Typography variant="h4">{t('yourSelectedServices')}</Typography>
          <div>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nazwa usługi</TableCell>
                    <TableCell align="right">Okres trwania</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((service) => (
                    <CartTile
                      key={service.id + Math.random()}
                      id={service.id}
                      nameService={service.nameService}
                      prices={service.prices}
                      duration={service.duration}
                      deleteServiceFromCart={deleteServiceFromCart}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.2}
            >
              <Typography
                variant="subtitle1"
                component={'span'}
              >
                {t('costWithoutPromotions')}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold' }}
                component={'span'}
              >
                255
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
