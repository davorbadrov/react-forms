import React from 'react';
import {withFormik, Field} from 'formik';
import {login} from '../helpers';

const LogInInnerForm = ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
    <form className="simple-form" onSubmit={handleSubmit} noValidate>
        <h2>Log in</h2>
        <h3>Using &lt;Field /&gt; components</h3>

        <label>Email</label>
        <Field name="email" type="email" autoComplete="new-password" />
        {touched.email && errors.email && <div className="error">{errors.email}</div>}

        <label className="m-t-xl">Password</label>
        <Field name="password" type="password" autoComplete="new-password" />
        {touched.password && errors.password && <div className="error">{errors.password}</div>}

        <button className="button m-t-xl" type="submit" disabled={isSubmitting}>
            Login
        </button>

        <hr />

        <h4>Values</h4>
        <pre>{JSON.stringify(values, null, 2)}</pre>

        <h4>Errors</h4>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
);

const LogInForm = withFormik({
    mapPropsToValues: props => ({email: '', password: ''}),
    validate: (values, props) => {
        const errors = {};
        const emailValidateRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.email) {
            errors.email = 'Required';
        } else if (!emailValidateRegex.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    },
    handleSubmit: (values, {props, setSubmitting, setErrors}) => {
        login(values.email, values.password)
            .then(userData => {
                alert('successfuly logged in!');
            })
            .catch(error => {
                setErrors({email: 'Seems your login credentials are invalid!'});
            })
            .then(() => {
                setSubmitting(false);
            });
    }
})(LogInInnerForm);

const SimpleForm = () => {
    return (
        <div className="simple-form__outer">
            <LogInForm />
        </div>
    );
};

export default SimpleForm;
