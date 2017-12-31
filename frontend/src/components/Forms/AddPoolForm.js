import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid/Grid'
import Button from 'material-ui/Button/Button'
import { MenuItem } from 'material-ui/Menu'
import { Field, reduxForm } from 'redux-form'
import * as formHelpers from './helpers'

const styles = theme => ({
  container: {
  },
  textField: {
    width: '350px'
  }
})

const validate = values => {
    const errors = {}
    const requiredFields = [
      'address',
      'name',
      'pool'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    return errors
  }
  

let AddPoolForm = (props) => {

    const { handleSubmit, pristine, submitting, classes, handleClose } = props
    return (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid direction='column' spacing={8} container>
                    <Grid item>
                        <Field
                            name="address"
                            className={classes.textField}
                            component={formHelpers.renderTextField}
                            label="Wallet address"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="name"
                            component={formHelpers.renderTextField}
                            label="Pool Name"
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name="pool"
                            component={formHelpers.renderSelectField}
                            label="Choose pool"
                        >
                            <MenuItem value="flypool">Flypool</MenuItem>
                            <MenuItem value="nicehash">NiceHash</MenuItem>
                        </Field>
                    </Grid>

                    <Grid item>
                        <Button
                            type='sumbit'
                            raised 
                            color="accent"
                            disabled={pristine || submitting}
                        >
                            Add 
                        </Button>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </Grid>

                </Grid>
            </form>
    );
}



AddPoolForm = reduxForm({
    // a unique name for the form
    form: 'addPool',
    validate
  })(AddPoolForm)

export default withStyles(styles)(AddPoolForm);
