import { Paper, Divider } from '@mui/material';
import { Form as RFFForm } from 'react-final-form';

import FirstGroupFields from 'src/components/Fields/FirstGroupFields';
import SecondGroupFields from 'src/components/Fields/SecondGroupFields';
import ThirdGroupFields from 'src/components/Fields/ThirdGroupFields';
import FourthGroupFields from 'src/components/Fields/FourthGroupFields';
import {
  AFTERNOON_KITCHEN_PART_TIME_HOUR,
  AFTERNOON_WAIT_PART_TIME_HOUR,
  DEFAULT_TIP_RATIO,
  EVENING_KITCHEN_PART_TIME_HOUR,
  EVENING_WAIT_PART_TIME_HOUR,
} from 'src/constants';
import { createArray, getIsEveningShift } from 'src/utils';

const isDevelopment = process.env.NODE_ENV === 'development';

const getInitialValues = () => {
  const isEveningShift = getIsEveningShift();

  const values = {
    numOfKitchenStaff: 4,
    numOfWaitStaff: 2,
  };

  if (isEveningShift) {
    values['numOfKitchenStaff'] = 6;
    values['numOfWaitStaff'] = 3;
  }

  createArray(values.numOfKitchenStaff).forEach((_, idx) => {
    values[`kitchenStaff#${idx}Hour`] = isEveningShift
      ? EVENING_KITCHEN_PART_TIME_HOUR
      : AFTERNOON_KITCHEN_PART_TIME_HOUR;
    values[`kitchenStaff#${idx}Ratio`] = DEFAULT_TIP_RATIO;
  });

  createArray(values.numOfWaitStaff).forEach((_, idx) => {
    values[`waitStaff#${idx}Hour`] = isEveningShift
      ? EVENING_WAIT_PART_TIME_HOUR
      : AFTERNOON_WAIT_PART_TIME_HOUR;
    values[`waitStaff#${idx}Ratio`] = DEFAULT_TIP_RATIO;
  });

  return values;
};

export default function Form() {
  return (
    <RFFForm
      onSubmit={() => {}}
      initialValues={getInitialValues()}
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
