import { Grid, TextField, Typography } from '@mui/material';

import RFFTextField from 'src/components/RFF/TextField';
import { calculateCardTip, calculateTotalTip } from 'src/utils';

export default function SecondGroupFields({ values }) {
  const cardTip = calculateCardTip(values);
  const totalTip = calculateTotalTip(values);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Tips
      </Typography>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          <RFFTextField label="Cash Tip" name="cashTip" type="number" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Card Tip"
            value={cardTip}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Total Tip (Cash + Card)"
            value={totalTip}
          />
        </Grid>
      </Grid>
    </>
  );
}
