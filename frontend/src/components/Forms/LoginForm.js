import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid/Grid'
import Button from 'material-ui/Button/Button'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Typography from 'material-ui/Typography/Typography'
import * as formHelpers from './helpers'

const styles = theme => ({
  container: {
      heigth: "100%",
      marginTop: "10%"
  }
})

const validate = values => {
    const errors = {}
    const requiredFields = [
      'username',
      'password'
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

let LoginForm = (props) => {

    const { handleSubmit, pristine, submitting, classes, errorMsg } = props

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
                            name="username"
                            id="username" 
                            type='text'
                            component={formHelpers.renderTextField}
                            label="Username"
                            autoComplete="username"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="password"
                            id="password"
                            type='password'
                            component={formHelpers.renderTextField}
                            label="Password"
                            autoComplete="current-password"
                        />
                    </Grid>

                    <Grid item>
                        <Typography color='error'>
                            {errorMsg ? errorMsg : ' '}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            type='sumbit'
                            raised 
                            color="accent"
                            disabled={pristine || submitting}
                        >
                            Login 
                        </Button>
                        <Link style={{marginLeft: '16px'}} to='/register'>
                            Register
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </Grid>
    );
}



LoginForm = reduxForm({
    form: 'login',
    destroyOnUnmount: false,
    validate
  })(LoginForm)

export default withStyles(styles)(LoginForm);
