import { Grid, TextField, Typography } from '@mui/material';

import RFFTextField from 'src/components/RFF/TextField';
import { calculateCash, calculateCardTip } from 'src/utils';

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

export default function FirstGroupFields({ values }) {
  const cash = calculateCash(values);
  const cardTip = calculateCardTip(values);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Today's Revenue ({year}-{month}-{day})
      </Typography>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <RFFTextField fullWidth label="Total" name="total" type="number" />
        </Grid>
        <Grid item xs={6}>
          <RFFTextField label="Credit" name="credit" type="number" />
        </Grid>
        <Grid item xs={6}>
          <RFFTextField label="Debit" name="debit" type="number" />
        </Grid>
        <Grid item xs={6}>
          <RFFTextField label="Coupon" name="coupon" type="number" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Cash"
            value={cash}
          />
        </Grid>
        <Grid item xs={6}>
          <RFFTextField label="Till" name="till" type="number" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Card Tip (Cash + Till)"
            value={cardTip}
          />
        </Grid>
      </Grid>
    </>
  );
}
