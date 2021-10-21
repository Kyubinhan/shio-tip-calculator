import { Paper, Divider } from '@mui/material';
import { Form as RFFForm } from 'react-final-form';

import FirstGroupFields from 'src/components/Fields/FirstGroupFields';
import SecondGroupFields from 'src/components/Fields/SecondGroupFields';
import ThirdGroupFields from 'src/components/Fields/ThirdGroupFields';
import FourthGroupFields from 'src/components/Fields/FourthGroupFields';
import { DEFAULT_PART_TIME_HOUR, DEFAULT_TIP_RATIO } from 'src/constants';
import { createArray } from 'src/utils';

const isDevelopment = process.env.NODE_ENV === 'development';

const getInitialValues = (numOfKitchenStaff, numOfWaitStaff) => {
  const values = {
    numOfKitchenStaff,
    numOfWaitStaff,
  };

  createArray(numOfKitchenStaff).forEach((_, idx) => {
    values[`kitchenStaff#${idx}Hour`] = DEFAULT_PART_TIME_HOUR;
    values[`kitchenStaff#${idx}Ratio`] = DEFAULT_TIP_RATIO;
  });

  createArray(numOfWaitStaff).forEach((_, idx) => {
    values[`waitStaff#${idx}Hour`] = DEFAULT_PART_TIME_HOUR;
    values[`waitStaff#${idx}Ratio`] = DEFAULT_TIP_RATIO;
  });

  return values;
};

export default function Form() {
  return (
    <RFFForm
      onSubmit={console.log}
      initialValues={getInitialValues(6, 4)}
      render={({ values }) => {
        return (
          <form noValidate>
            <Paper sx={{ padding: 2 }}>
              <FirstGroupFields values={values} />
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              <SecondGroupFields values={values} />
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              <ThirdGroupFields values={values} />
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              <FourthGroupFields values={values} />
            </Paper>
            {isDevelopment && <pre>{JSON.stringify(values, 0, 2)}</pre>}
          </form>
        );
      }}
    />
  );
}
