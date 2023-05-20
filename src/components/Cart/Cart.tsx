import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { contractDurationsAreTheSame } from '../../func/contractDurationsAreTheSame'
import { serviceIsInTheCart } from '../../func/serviceIsInTheCart'
import { cartActions, cartSelector } from '../../store/cart-slice'
import { ServicesKeys } from '../../types/servicesKeys'
import { CartTile } from '../CartTile'

export const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.selectCartItems)

  const deleteServiceFromCart = (serviceId: number) => {
    dispatch(cartActions.deleteServiceFromCart({ serviceId }))
  }
  const decoderContractDuration = cart.find((item) => item.id === ServicesKeys.DECODER_4K)?.duration
  const totalPrice = cart.reduce((sum, service) => sum + service.price, 0)
  const totalPriceWithPromotion = cart.reduce((sum, service) => {
    if (
      service.id === ServicesKeys.PACKAGE_INTERNET_TELEVISION &&
      serviceIsInTheCart(cart, ServicesKeys.DECODER_4K) &&
      contractDurationsAreTheSame(service.duration, decoderContractDuration)
    ) {
      const decoderPrice = cart.find((item) => item.id === ServicesKeys.DECODER_4K)?.price
      if (decoderPrice) {
        return sum + service.price - decoderPrice
      }
    }
    return sum + service.price
  }, 0)

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
                    <TableCell>{t('serviceName')}</TableCell>
                    <TableCell align="right">{t('serviceDuration')}</TableCell>
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
                      price={service.price}
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
              justifyContent="space-between"
              alignItems="center"
              spacing={0.2}
            >
              <div>
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
                  {totalPrice}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="subtitle1"
                  component={'span'}
                >
                  {t('costWithPromotions')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold' }}
                  component={'span'}
                >
                  {totalPriceWithPromotion}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
