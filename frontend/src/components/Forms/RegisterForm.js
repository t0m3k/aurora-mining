import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid/Grid'
import Button from 'material-ui/Button/Button'
import { MenuItem } from 'material-ui/Menu'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import * as formHelpers from './helpers'

const styles = theme => ({
    button: {
        marginRight: theme.spacing.unit,
    },
    container: {
        heigth: "100%",
        marginTop: "10%"
    }
})

const validate = values => {
    const errors = {}
    const requiredFields = [
      'username',
      'password',
      'email',
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
  

let RegisterForm = (props) => {

    const { handleSubmit, pristine, submitting, classes } = props

    return (
        <Grid
        container
        className={classes.container}
        alignItems='center'
        direction='row'
        justify='center'
        >
            <form onSubmit={handleSubmit} noValidate >
                <Grid direction='column' spacing={8} container>
                    <Grid item>
                        <Field
                            name="username"
                            component={formHelpers.renderTextField}
                            label="Username"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="email"
                            component={formHelpers.renderTextField}
                            label="E-mail"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="password"
                            type="password"
                            component={formHelpers.renderTextField}
                            label="Password"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="currency"
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
                            className={classes.button}
                            type='sumbit'
                            raised 
                            color="primary"
                            disabled={pristine || submitting}
                        >
                            Register 
                        </Button>
                        <Button
                            className={classes.button}
                            component={Link}
                            to='/login'
                            color="accent"
                        >
                            Login
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Grid>
    );
}



RegisterForm = reduxForm({
    form: 'register',
    validate
  })(RegisterForm)

export default withStyles(styles)(RegisterForm);
