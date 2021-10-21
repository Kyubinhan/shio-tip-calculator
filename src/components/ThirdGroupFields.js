import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
} from '@mui/material';

import RFFSelect from 'src/components/RFF/Select';
import RFFTextField from 'src/components/RFF/TextField';
import {
  calculateKitchenTip,
  createArray,
  getEmployeesShareMap,
  roundToThree,
} from 'src/utils';

export default function ThirdGroupFields({ values }) {
  const kitchenTip = roundToThree(calculateKitchenTip(values));
  const numOfKitchenStaff = Number(values.numOfKitchenStaff) || 0;
  const kitchenStaffShareMap = getEmployeesShareMap(
    values,
    numOfKitchenStaff,
    'kitchenStaff',
    kitchenTip
  );

  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Kitchen
      </Typography>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Tip (Total * 0.4)"
            value={kitchenTip}
          />
        </Grid>
        <Grid item xs={3}>
          <RFFSelect label="Staff #" name="numOfKitchenStaff">
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </RFFSelect>
        </Grid>
      </Grid>
      {createArray(numOfKitchenStaff).map((_, idx) => {
        return (
          <Grid container key={idx} spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={5}>
              <RFFTextField
                label="Staff Name"
                name={`kitchenStaff#${idx}Name`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{idx + 1}.</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <RFFTextField
                label="Hour"
                name={`kitchenStaff#${idx}Hour`}
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <RFFSelect label="Ratio" name={`kitchenStaff#${idx}Ratio`}>
                <MenuItem value={1}>100%</MenuItem>
                <MenuItem value={0.8}>80%</MenuItem>
                <MenuItem value={0.7}>70%</MenuItem>
                <MenuItem value={0.5}>50%</MenuItem>
              </RFFSelect>
            </Grid>
          </Grid>
        );
      })}
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ marginTop: 2, marginBottom: 1 }}
      >
        Kitchen Staff Tips
      </Typography>
      <Grid container spacing={1}>
        {createArray(numOfKitchenStaff).map((_, idx) => {
          const staffTip = roundToThree(
            kitchenStaffShareMap[`kitchenStaff#${idx}`]
          );

          return (
            <Grid item key={idx} xs={6}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">{idx + 1}.</InputAdornment>
                  ),
                }}
                value={staffTip}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
