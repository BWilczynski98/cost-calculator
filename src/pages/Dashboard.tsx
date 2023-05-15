import Grid from '@mui/material/Unstable_Grid2'
import { Cart } from '../components/Cart'
import { ServiceList } from '../components/ServicesList'

export const Dashboard = () => {
  return (
    <Grid container sx={{ padding: 2 }} rowSpacing={2}>
      <Grid xs={12}>
        <ServiceList />
      </Grid>
      <Grid xs={12}>
        <Cart />
      </Grid>
    </Grid>
  )
}
