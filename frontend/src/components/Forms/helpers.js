import React from 'react'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import FormHelperText from 'material-ui/Form/FormHelperText';

export const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
    }) => (
    <TextField
        label={label}
        helperText={error ? error : ' '}
        error={(!!touched && !!error)}
        {...input}
        {...custom}
    />
)
  
export const renderSelectField = ({
    input,
    label,
    name,
    meta,
    prev,
    meta: { touched, error },
    children,
    ...custom
    }) => {
        let value = ''
        if (input.value && input.value.length > 0){
            value = input.value
        } else if(prev && prev.length > 0) {
            value = prev
        }
    return (
        <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
                label={label}
                error={!!touched && !!error}
                value={value}
                style={{minWidth: 120}}
                onChange={(value) => input.onChange(value)}
                children={children}
            />
            <FormHelperText>{error ? error : ' '}</FormHelperText>

        </FormControl>
    )
}
