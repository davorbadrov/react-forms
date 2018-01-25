import React from 'react';
import {withFormik, Field} from 'formik';
import {submitData} from '../helpers';
import Yup from 'yup';

const ValidationUsingYupInnerForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
}) => (
    <form className="simple-form" onSubmit={handleSubmit} noValidate>
        <h2>Validation with yup</h2>

        <label className="m-t-lg">Name</label>
        <Field name="name" type="text" autoComplete="new-password" />
        {touched.name && errors.name && <div className="error">{errors.name}</div>}

        <label className="m-t-lg">Email</label>
        <Field name="email" type="text" autoComplete="new-password" />
        {touched.email && errors.email && <div className="error">{errors.email}</div>}

        <label className="m-t-lg">Age</label>
        <Field name="age" type="number" autoComplete="new-password" max={120} min={4} />
        {touched.age && errors.age && <div className="error">{errors.age}</div>}

        <label className="m-t-lg">
            <Field name="forceSubmissionFail" type="checkbox" className="m-r-md" autoComplete="new-password" />
            Force submission fail?
        </label>

        <button className="button m-t-xl" type="submit" disabled={isSubmitting}>
            Save
        </button>

        <hr />

        <h4>Values</h4>
        <pre>{JSON.stringify(values, null, 2)}</pre>

        <h4>Errors</h4>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
);

const emailValidation = Yup.string()
    .email('Invalid email format')
    .required('Email is required');

const schema = Yup.object({
    email: emailValidation,
    name: Yup.string().required('Your name is missing'),
    age: Yup.number()
        .typeError('Age must be a number') // Prevents NaN error message (after converting from null)
        .required('Your age is missing')
        .positive('Your age cannot be negative')
        .integer('Your age cannot be a decimal number')
        .min(18, 'You cannot be underage')
        .max(120, `Are you sure that's your age!?`)
});

function createValidation(values) {
    return Yup.object({
        email: emailValidation,
        name: Yup.string().required('Your name is missing'),
        age: Yup.number()
            .typeError('Age must be a number') // Prevents NaN error message (after converting from null)
            .required('Your age is missing')
            .positive('Your age cannot be negative')
            .integer('Your age cannot be a decimal number')
            .when('name', (name, schema) => {
                if (name === 'test') {
                    return schema
                        .min(30, 'You cannot be underage')
                        .max(40, `Are you sure that's your age!?`);
                }

                return schema
                    .min(18, 'You cannot be underage')
                    .max(120, `Are you sure that's your age!?`);
            })
    });
}

const ValidationYupForm = withFormik({
    mapPropsToValues: props => ({email: '', name: '', age: null, type: 'optional'}),
    validationSchema: createValidation,
    handleSubmit: (values, {props, setSubmitting, setErrors}) => {
        submitData(values)
            .then(({name, email, age}) => {
                alert(`
                    Submitted data:
                        name: ${name}
                        email: ${email}
                        age: ${age}
                `);
            })
            .catch(error => {
                alert('Data submission failed, error: ' + error);
            })
            .then(() => {
                setSubmitting(false);
            });
    },
    displayName: 'Dynamic validation form' // helps with React DevTools
})(ValidationUsingYupInnerForm);

const Form = () => {
    return (
        <div className="simple-form__outer">
            <ValidationYupForm />
        </div>
    );
};

export default Form;
