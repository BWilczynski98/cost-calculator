import { Container, Paper, Typography, Stack } from '@mui/material'
import services from '../../api/services.json'
import { ServiceTile } from '../ServiceTile'
import { t } from 'i18next'

export const ServiceList = () => {
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
