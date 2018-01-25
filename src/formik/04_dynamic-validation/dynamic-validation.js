import React from 'react';
import {withFormik, Field} from 'formik';
import {submitData} from '../helpers';

const DynamicValidationInnerForm = ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
    <form className="simple-form" onSubmit={handleSubmit} noValidate>
        <h2>Dynamic validation</h2>

        <label htmlFor="ageRangeField">Form type</label>
        <Field name="type" component="select">
            <option value="required">Required</option>
            <option value="optional">Optional</option>
        </Field>
        
        <label className="m-t-lg">Name</label>
        <Field name="name" type="text" autoComplete="new-password"/>
        {touched.name && errors.name && <div className="error">{errors.name}</div>}


        <label className="m-t-lg">Email</label>
        <Field name="email" type="text" autoComplete="new-password"/>
        {touched.email && errors.email && <div className="error">{errors.email}</div>}

        <label className="m-t-lg">Age</label>
        <Field name="age" type="number" autoComplete="new-password" />
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

const isEmailFormatValid = email => {
    if (!email) return true;
    const emailValidateRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailValidateRegex.test(email)
}
const isAgeFormatValid = age => {
    if (!age) return;
    
    const ageValidateRegex = /^[0-9]+$/;
    return ageValidateRegex.test(age);
}

const isOldEnough = age => age >= 18;

const DynamicValidationForm = withFormik({
    mapPropsToValues: props => ({email: '',name: '', age: null, type: 'optional'}),
    validate: (values, props) => {
        const errors = {};

        if (values.type === 'required') {
            if (!values.name) {
                errors.name = 'Name is required';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            }

            if (!values.age) {
                errors.age = 'Age is required';
            }
        }

        if (values.email && !isEmailFormatValid(values.email)) {
            errors.email = 'Invalid email format';
        }

        if (values.age && !isAgeFormatValid(values.age)) {
            errors.age = 'Invalid age format';
        }

        if (values.age && !errors.age && !isOldEnough(values.age)) {
            errors.age = 'You cannot be underage';
        }

        return errors;
    },
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
    }
})(DynamicValidationInnerForm);

const Form = () => {
    return (
        <div className="simple-form__outer">
            <DynamicValidationForm />
        </div>
    );
};

export default Form;
