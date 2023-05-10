import { Container, Paper, Typography, Stack } from '@mui/material'
import services from '../../api/services.json'
import { ServiceTile } from '../ServiceTile'
import { t } from 'i18next'
import { ServiceType } from '../../types/service'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions, cartSelector } from '../../store/cart-slice'

export const ServiceList = () => {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.selectCartItems)

  const addingServiceToCart = (newService: ServiceType, duration: string[]) => {
    const existingService = cart.find((service) => service.id === newService.id)

    if (existingService) {
      return
    }

    dispatch(cartActions.addToCart({ duration, ...newService }))
  }

  return (
    <Container>
      <Paper sx={{ padding: 2 }} elevation={5}>
        <Typography variant="h4">{t('serviceChoice')}</Typography>
        <Stack spacing={2}>
          {services.length ? (
            services.map((service) => (
              <ServiceTile
                key={service.id}
                id={service.id}
                nameService={service.name}
                prices={service.priceList}
                promotionOptions={service.promotion}
                addingServiceToCart={addingServiceToCart}
              />
            ))
          ) : (
            <p>{t('somethingWentWrong')}</p>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}
