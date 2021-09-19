import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Field } from 'react-final-form';

export default function RFFSelect({ name, label, children, ...other }) {
  return (
    <Field name={name}>
      {(props) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            {...other}
            label={label}
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
          >
            {children}
          </Select>
        </FormControl>
      )}
    </Field>
  );
}
