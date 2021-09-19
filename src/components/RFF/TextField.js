import TextField from '@mui/material/TextField';
import { Field } from 'react-final-form';

export default function RFFTextField({ name, ...other }) {
  return (
    <Field name={name}>
      {(props) => (
        <TextField
          {...other}
          fullWidth
          name={props.input.name}
          value={props.input.value}
          onChange={props.input.onChange}
        />
      )}
    </Field>
  );
}
