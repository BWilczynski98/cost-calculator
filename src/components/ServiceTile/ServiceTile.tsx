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

type ServiceTileProps = {
  id: number
  nameService: string
  prices: {
    currency: string
    year2023: number
    year2024: number
    year2025: number
  }
  promotionOptions: {
    status: boolean
    description: string
  }
}

export const ServiceTile = ({
  id,
  nameService,
  prices,
  promotionOptions,
}: ServiceTileProps) => {
  const years = Object.keys(prices)
    .filter((key) => key.startsWith('year'))
    .map((year) => year.slice(4))
  console.log(years)
  const [serviceDuration, setServiceDuration] = useState<string[]>([])

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newServiceDuration: string[]
  ) => {
    setServiceDuration(newServiceDuration)
  }

  return (
    <Paper sx={{ padding: 2 }}>
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
            value={serviceDuration}
            onChange={handleFormat}
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
        </Box>

        <Button disabled={!serviceDuration.length}>{t('add')}</Button>
      </Stack>
    </Paper>
  )
}
