import { Container, Paper, Stack, Typography } from '@mui/material'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { cartSelector } from '../../store/cart-slice'

export const Cart = () => {
  const cart = useSelector(cartSelector.selectCartItems)

  return (
    <Container>
      <Paper>
        <Typography variant="h4">{t('yourSelectedServices')}</Typography>
        <Stack></Stack>
      </Paper>
    </Container>
  )
}
