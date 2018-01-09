import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid/Grid'
import Button from 'material-ui/Button/Button'
import { MenuItem } from 'material-ui/Menu'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import * as formHelpers from './helpers'
import red from 'material-ui/colors/red';

const styles = theme => ({
  container: {
      heigth: "100%",
      marginTop: "10%"
  }
})

const validate = values => {
    const errors = {}
    const requiredFields = [
      'currency'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
  

let SettingsForm = (props) => {

    const { handleSubmit, pristine, submitting, classes, currency } = props

    return (
        <Grid
        container
        className={classes.container}
        alignItems='center'
        direction='row'
        justify='center'
        >
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid direction='column' spacing={8} container>

                    <Grid item>
                        <Field
                            name="currency"
                            props={{
                                prev: currency
                            }}
                            component={formHelpers.renderSelectField}
                            label="Currency"
                        >
                            <MenuItem value="GBP">GBP</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="PLN">PLN</MenuItem>
                        </Field>
                    </Grid>

                    <Grid item>
                        <Button
                            type='sumbit'
                            raised 
                            color="primary"
                            disabled={pristine || submitting}
                        >
                            Save 
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Grid>
    );
}



SettingsForm = reduxForm({
    // a unique name for the form
    form: 'settings',
    validate
  })(SettingsForm)

export default withStyles(styles)(SettingsForm);
