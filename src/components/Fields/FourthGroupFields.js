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
  calculateWaitTip,
  createArray,
  roundToThree,
  getEmployeesShareMap,
} from 'src/utils';

export default function FourthGroupFields({ values }) {
  const waitTip = roundToThree(calculateWaitTip(values));
  const numOfWaitStaff = Number(values.numOfWaitStaff) || 0;
  const kitchenStaffShareMap = getEmployeesShareMap(
    values,
    numOfWaitStaff,
    'waitStaff',
    waitTip
  );

  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Waitress
      </Typography>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label="Tip (Total * 0.6)"
            value={waitTip}
          />
        </Grid>
        <Grid item xs={3}>
          <RFFSelect label="Staff #" name="numOfWaitStaff">
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </RFFSelect>
        </Grid>
      </Grid>
      {createArray(numOfWaitStaff).map((_, idx) => {
        return (
          <Grid container key={idx} spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={5}>
              <RFFTextField
                label="Staff Name"
                name={`waitStaff#${idx}Name`}
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
                name={`waitStaff#${idx}Hour`}
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <RFFSelect label="Ratio" name={`waitStaff#${idx}Ratio`}>
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
        Wait Staff Tips
      </Typography>
      <Grid container spacing={1}>
        {createArray(numOfWaitStaff).map((_, idx) => {
          const staffTip = roundToThree(
            kitchenStaffShareMap[`waitStaff#${idx}`]
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
