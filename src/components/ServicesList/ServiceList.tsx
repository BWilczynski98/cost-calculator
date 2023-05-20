import { Container, Paper, Stack, Typography } from '@mui/material'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import services from '../../api/services.json'
import { contractDurationsAreTheSame } from '../../func/contractDurationsAreTheSame'
import { serviceIsInTheCart } from '../../func/serviceIsInTheCart'
import { cartActions, cartSelector } from '../../store/cart-slice'
import { CartItem } from '../../types/service'
import { ServicesKeys } from '../../types/servicesKeys'
import { ServiceTile } from '../ServiceTile'

export const ServiceList = () => {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.selectCartItems)

  const addingServiceToCart = (serviceAddedToCart: CartItem) => {
    if (serviceIsInTheCart(cart, serviceAddedToCart.id)) {
      alert(t('serviceInTheCartAlert'))
      return
    }

    // Decoder Requirements
    if (serviceAddedToCart.id === ServicesKeys.DECODER_4K) {
      const decoderContractDuration = serviceAddedToCart.duration
      const televisionContractDuration = cart.find((service) => service.id === ServicesKeys.TELEVISION)?.duration
      const packageInternetAndTelevisionContractDuration = cart.find(
        (service) => service.id === ServicesKeys.PACKAGE_INTERNET_TELEVISION
      )?.duration
      const errorAlert = (alertDescription: string): void => alert(t(`${alertDescription}`))

      if (
        !serviceIsInTheCart(cart, ServicesKeys.TELEVISION) &&
        !serviceIsInTheCart(cart, ServicesKeys.PACKAGE_INTERNET_TELEVISION)
      ) {
        errorAlert('decoderRequirementsAlert')
        return
      }

      if (
        serviceIsInTheCart(cart, ServicesKeys.TELEVISION) &&
        !contractDurationsAreTheSame(decoderContractDuration, televisionContractDuration)
      ) {
        errorAlert('decoderRequirementsAlert')
        return
      }

      if (
        serviceIsInTheCart(cart, ServicesKeys.PACKAGE_INTERNET_TELEVISION) &&
        !contractDurationsAreTheSame(decoderContractDuration, packageInternetAndTelevisionContractDuration)
      ) {
        errorAlert('decoderRequirementsAlert')
        return
      }
    }

    dispatch(cartActions.addToCart({ ...serviceAddedToCart }))
  }

  return (
    <Container>
      <Paper
        sx={{ padding: 2 }}
        elevation={5}
      >
        <Stack spacing={2}>
          <Typography variant="h4">{t('serviceChoice')}</Typography>
          <Stack spacing={2}>
            {services.length ? (
              services.map((service) => (
                <ServiceTile
                  key={service.id + Math.random()}
                  id={service.id}
                  nameService={service.name}
                  prices={service.prices}
                  addingServiceToCart={addingServiceToCart}
                />
              ))
            ) : (
              <p>{t('somethingWentWrong')}</p>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
