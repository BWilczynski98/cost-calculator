import { Box, Button, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { serviceIsInTheCart } from '../../func/serviceIsInTheCart'
import { splitToYears } from '../../func/years'
import { cartSelector } from '../../store/cart-slice'
import type { CartItem, ServiceType } from '../../types/service'

type ServiceTileProps = ServiceType & {
  addingServiceToCart: (serviceAddedToCart: CartItem) => void
}

export const ServiceTile = ({ id, nameService, prices, addingServiceToCart }: ServiceTileProps) => {
  const cart = useSelector(cartSelector.selectCartItems)
  const years = splitToYears(prices)
  const existingService = serviceIsInTheCart(cart, id)
  const [duration, setDuration] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  const handleChangeServiceDuration = (event: React.MouseEvent<HTMLElement>, newServiceDuration: string[]) => {
    setDuration(newServiceDuration)
  }

  const calculatePrice = () => {
    const total = duration.reduce((acc, year) => {
      const summary = acc + prices[`year${year}`]
      return summary
    }, 0)

    setPrice(total)
  }

  useEffect(() => {
    calculatePrice()
  }, [duration])

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
        </Box>
        <Box sx={{ width: '250px', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="subtitle2">{t('serviceDuration')}</Typography>
          <ToggleButtonGroup
            value={!existingService && duration}
            onChange={handleChangeServiceDuration}
            aria-label="Years for choice"
            size="small"
            disabled={existingService}
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
          disabled={!duration.length || existingService}
          onClick={() => {
            const serviceSentToCart = {
              id,
              nameService,
              price,
              duration,
            }
            addingServiceToCart(serviceSentToCart)
          }}
        >
          {t('add')}
        </Button>
      </Stack>
    </Paper>
  )
}
