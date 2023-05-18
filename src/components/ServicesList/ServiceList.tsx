import { Container, Paper, Typography, Stack } from '@mui/material'
import services from '../../api/services.json'
import { ServiceTile } from '../ServiceTile'
import { t } from 'i18next'
import { PriceType, ServiceType } from '../../types/service'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions, cartSelector } from '../../store/cart-slice'
import { ServicesKeys } from '../../types/servicesKeys'
// import { useDisclose } from '../../hooks/useDisclose'
// import { ConfirmationModal } from '../ConfirmationModal'
import { useState } from 'react'
import { ModalMessageOptionsType } from '../../types/confirmationModal'
import { serviceIsInTheCart } from '../../func/serviceIsInTheCart'

export const ServiceList = () => {
  // const { isOpen: modalIsOpen, onOpen: openModal, onClose: closeModal } = useDisclose()
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.selectCartItems)

  const [modalMessageOptions, setModalMessageOptions] = useState<ModalMessageOptionsType>({
    orderingServiceKey: null,
    inCartServiceKey: null,
    packageServiceKey: null,
  })

  const addingServiceToCart = (serviceAddedToCart: ServiceType, duration: string[]) => {
    const existingService = cart.find((service) => service.id === serviceAddedToCart.id)
    const durationOfTheAddedService = duration.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    const testArray = [ServicesKeys.TELEVISION, ServicesKeys.PACKAGE_INTERNET_TELEVISION]
    // const test = testArray.some()
    // czy moj koszyk bedzie mial telewizje
    console.log(cart.some((item) => testArray.includes(item.id)))

    if (existingService) {
      return
    }

    // Decoder Requirements
    if (serviceAddedToCart.id === ServicesKeys.DECODER_4K) {
      const decoderRequirements = [ServicesKeys.TELEVISION, ServicesKeys.PACKAGE_INTERNET_TELEVISION]

      const checkCartHasTelevision = decoderRequirements.some(() =>
        cart.map((item) => item.id).includes(ServicesKeys.TELEVISION)
      )
      const checkCartHasInternetAndTelevisionPackage = decoderRequirements.some(() =>
        cart.map((item) => item.id).includes(ServicesKeys.PACKAGE_INTERNET_TELEVISION)
      )

      if (checkCartHasTelevision || checkCartHasInternetAndTelevisionPackage) {
        dispatch(cartActions.addToCart({ duration: durationOfTheAddedService, ...serviceAddedToCart }))
        return
      } else {
        alert(t('decoderRequirementsAlert'))
        return
      }
    }

    // Proposal of packages for the Internet
    // if (
    //   serviceAddedToCart.id === ServicesKeys.INTERNET ||
    //   serviceAddedToCart.id === ServicesKeys.TELEVISION ||
    //   serviceAddedToCart.id === ServicesKeys.PHONE_SUBSCRIPTION
    // ) {
    //   const packageRequirements = [ServicesKeys.INTERNET, ServicesKeys.TELEVISION, ServicesKeys.PHONE_SUBSCRIPTION]

    //   const checkCartHasTelevision = packageRequirements.some(() =>
    //     cart.map((item) => item.id).includes(ServicesKeys.TELEVISION)
    //   )
    //   const checkCartHasPhoneSubscription = packageRequirements.some(() =>
    //     cart.map((item) => item.id).includes(ServicesKeys.PHONE_SUBSCRIPTION)
    //   )
    //   const checkCartHasInternet = packageRequirements.some(() =>
    //     cart.map((item) => item.id).includes(ServicesKeys.INTERNET)
    //   )

    //   if (!checkCartHasTelevision && checkCartHasPhoneSubscription) {
    //     const durationOfTheContractForPhoneSubscriptionService = cart
    //       .filter((item) => item.id === ServicesKeys.PHONE_SUBSCRIPTION)
    //       .flatMap(({ duration }) => duration)

    //     const durationOfTheInternetService = durationOfTheAddedService

    //     const durationOfTheContractsSame =
    //       durationOfTheContractForPhoneSubscriptionService.length === durationOfTheInternetService.length &&
    //       durationOfTheContractForPhoneSubscriptionService.every(
    //         (value, index) => value === durationOfTheInternetService[index]
    //       )

    //     if (durationOfTheContractsSame) {
    //       setModalMessageOptions({
    //         orderingServiceKey: 'Abonament telefoniczny',
    //         inCartServiceKey: 'Internet',
    //         packageServiceKey: 'Internet + Abonament telefoniczny',
    //       })
    //       openModal()
    //     }
    //   }

    //   if (checkCartHasTelevision && !checkCartHasPhoneSubscription) {
    //     const durationOfTheContractForTelevisionService = cart
    //       .filter((item) => item.id === ServicesKeys.TELEVISION)
    //       .flatMap(({ duration }) => duration)

    //     const durationOfTheInternetService = durationOfTheAddedService

    //     const durationOfTheContractsSame =
    //       durationOfTheContractForTelevisionService.length === durationOfTheInternetService.length &&
    //       durationOfTheContractForTelevisionService.every(
    //         (value, index) => value === durationOfTheInternetService[index]
    //       )

    //     if (durationOfTheContractsSame) {
    //       setModalMessageOptions({
    //         orderingServiceKey: 'Telewizji',
    //         inCartServiceKey: 'Internet',
    //         packageServiceKey: 'Internet + Telewizja',
    //       })
    //       openModal()

    //       const televisionPrices = cart.find((item) => item.id === ServicesKeys.TELEVISION)?.prices
    //       const internetPrices = cart.find((item) => item.id === ServicesKeys.INTERNET)?.prices
    //       const packageInternetAndTelevisionPrices: PriceType | undefined = services.find(
    //         (item) => item.id === ServicesKeys.PACKAGE_INTERNET_TELEVISION
    //       )?.prices
    //       let totalTelevisionCost = 0
    //       let totalInternetPrices = 0
    //       let totalPackageInternetAndTelevisionPrices = 0

    //       if (televisionPrices) {
    //         totalTelevisionCost = durationOfTheContractForTelevisionService.reduce((acc, currentValue) => {
    //           const year = `year${parseInt(currentValue, 10)}`
    //           const summary = acc + +televisionPrices[year]
    //           return summary
    //         }, 0)
    //       }

    //       if (internetPrices) {
    //         totalInternetPrices = durationOfTheInternetService.reduce((acc, currentValue) => {
    //           const year = `year${parseInt(currentValue, 10)}`
    //           const summary = acc + +internetPrices[year]
    //           return summary
    //         }, 0)
    //       }

    //       if (packageInternetAndTelevisionPrices) {
    //         totalPackageInternetAndTelevisionPrices = durationOfTheInternetService.reduce((acc, currentValue) => {
    //           const year = `year${parseInt(currentValue, 10)}`
    //           const summary = acc + +packageInternetAndTelevisionPrices[year]
    //           return summary
    //         }, 0)
    //       }
    //     }
    //   }
    // }

    dispatch(cartActions.addToCart({ duration: durationOfTheAddedService, ...serviceAddedToCart }))
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
                  promotionOptions={service.promotion}
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
