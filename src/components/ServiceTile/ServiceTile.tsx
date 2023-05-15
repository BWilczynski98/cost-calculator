import {
  Paper,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { t } from 'i18next'
import type { ServiceType } from '../../types/service'
import { splitToYears } from '../../func/years'
import { useSelector } from 'react-redux'
import { cartSelector } from '../../store/cart-slice'

type ServiceTileProps = ServiceType & {
  addingServiceToCart: (newService: ServiceType, duration: string[]) => void
}

export const ServiceTile = ({
  id,
  nameService,
  prices,
  promotionOptions,
  addingServiceToCart,
}: ServiceTileProps) => {
  const cart = useSelector(cartSelector.selectCartItems)
  const allServicesInCart = cart.map((service) => service.id)
  console.log(allServicesInCart)
  const years = splitToYears(prices)
  const existingService = cart.find((service) => service.id === id)
  const [serviceDuration, setServiceDuration] = useState<string[]>([])

  const handleChangeServiceDuration = (
    event: React.MouseEvent<HTMLElement>,
    newServiceDuration: string[]
  ) => {
    setServiceDuration(newServiceDuration)
  }

  return (
    <Paper
      sx={{
        padding: 2,
        opacity: !!existingService ? 0.3 : 1,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        alignItems={'center'}
      >
        <Box sx={{ width: '250px', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h6">{nameService}</Typography>
          {promotionOptions.status && (
            <Typography variant="caption">
              {promotionOptions.description}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: '250px', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="subtitle2">{t('serviceDuration')}</Typography>
          <ToggleButtonGroup
            value={!existingService && serviceDuration}
            onChange={handleChangeServiceDuration}
            aria-label="Years for choice"
            size="small"
            disabled={!!existingService}
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
        </Box>
        <Button
          disabled={!serviceDuration.length || !!existingService}
          onClick={() => {
            const serviceSentToCart = {
              id,
              nameService,
              prices,
              promotionOptions,
            }
            addingServiceToCart(serviceSentToCart, serviceDuration)
          }}
        >
          {t('add')}
        </Button>
      </Stack>
    </Paper>
  )
}
