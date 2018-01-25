import React from 'react';
import {withFormik, Field} from 'formik';
import {submitData} from '../helpers';
import Yup from 'yup';

const DynamicValidationInnerForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
}) => (
    <form className="simple-form" onSubmit={handleSubmit} noValidate>
        <h2>Dynamic validation via Yup</h2>

        <label htmlFor="ageRangeField">Form type</label>
        <Field name="type" component="select">
            <option value="required">Required</option>
            <option value="optional">Optional</option>
        </Field>

        <label className="m-t-lg">Name</label>
        <Field name="name" type="text" autoComplete="new-password" />
        {touched.name && errors.name && <div className="error">{errors.name}</div>}

        <label className="m-t-lg">Email</label>
        <Field name="email" type="text" autoComplete="new-password" />
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

// Validation can be externalized for reuse (and testing)
const isTypeRequired = type => type === 'required';
const emailValidation = Yup.string().email('Invalid email format');
const nameValidation = Yup.string().min(3);
const ageValidation = Yup.number()
    .typeError('Age must be a number') // Prevents NaN error message (after converting from null)
    .positive('Your age cannot be negative')
    .integer('Your age cannot be a decimal number')
    .min(18, 'You cannot be underage')
    .max(120, `Are you sure that's your age!?`);

const nestedNameValidation = Yup.string().when('type', (type, schema) => {
    if (type === 'required') {
        return schema.required('Name is needed');
    }

    return schema;
});

const validationSchema = Yup.object().shape({
    type: Yup.string(),
    email: emailValidation.when('type', {
        is: isTypeRequired,
        then: emailValidation.required('Email is required'),
        otherwise: emailValidation
    }),
    name: nameValidation.when('type', {
        is: isTypeRequired,
        then: nameValidation.required('Name is required'),
        otherwise: nameValidation
    }),
    age: ageValidation.when('type', {
        is: isTypeRequired,
        then: ageValidation.required('Age is required'),
        otherwise: ageValidation
    })
});

// alternative
// const validationSchema = Yup.object().when('type', {
//     is: isTypeRequired,
//     type: Yup.string(),
//     then: Yup.object().shape({
//         type: Yup.string(),
//         email: emailValidation.required('Email is required'),
//         name: nameValidation.required('Name is required'),
//         age: ageValidation.required('Age is required')
//     }),
//     otherwise: Yup.object().shape({
//         type: Yup.string(),
//         email: emailValidation,
//         name: nameValidation,
//         age: ageValidation
//     })
// });

const DynamicValidationForm = withFormik({
    mapPropsToValues: props => ({email: '', name: '', age: '', type: 'optional'}),
    validationSchema,
    handleSubmit: (values, {props, setSubmitting, setErrors}) => {
        return submitData(values)
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
                this.props.onError(error);
            })
            .then(() => {
                setSubmitting(false);
            });
    },
    displayName: 'Dynamic validation form' // helps with React DevTools
})(DynamicValidationInnerForm);

const Form = () => {
    return (
        <div className="simple-form__outer">
            <DynamicValidationForm />
        </div>
    );
};

export default Form;
