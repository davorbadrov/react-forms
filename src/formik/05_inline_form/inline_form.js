import React from 'react';
import {Formik, Field} from 'formik';
import {submitData} from '../helpers';
import Yup from 'yup';
import Loader from '../../loader';

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

const validationSchema = Yup.object().shape({
    // type: Yup.string(),
    email: emailValidation.when('type', {
        is: 'required',
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

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    renderError(error) {
        if (!error) return null;

        return (
            <div className="error-block">
                Error happened: {error}
            </div>
        )
    }

    onSubmit = (values, {props, setSubmitting, setErrors}) => {
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
                this.setState({error});
            })
            .then(() => {
                setSubmitting(false);
            });
    }

    render() {
        return (
            <div className="simple-form__outer">
                <Formik
                    initialValues={{email: '', name: '', age: '', type: 'optional'}}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                    render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form className="form simple-form" onSubmit={handleSubmit} noValidate>
                            <h2>
                                Inline form
                                {isSubmitting && <Loader />}
                            </h2>

                            {this.renderError(this.state.error)}

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
                                <Field
                                    name="forceSubmissionFail"
                                    type="checkbox"
                                    className="m-r-md"
                                    autoComplete="new-password"
                                />
                                Force submission fail?
                            </label>

                            <button className="button m-t-xl" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default Form;
