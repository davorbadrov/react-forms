import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SimpleForm from './formik/01_simple-form';
import SimpleFormSimplified from './formik/02_simple-form_simplified';
import FormValidationWithYup from './formik/03_validation_using_yup';
import DynamicValidationForm from './formik/04_dynamic-validation';
import DynamicValidationFormWithYup from './formik/04a_dynamic-validation_with_yup';
import InlineForm from './formik/05_inline_form';

const Routes = () => (
    <Router>
      <div>
        <nav className="navigation">
            <h3><strong>Formik</strong></h3>
            <ul>
                <li><Link to="/formik-simple">Simple form</Link></li>
                <li><Link to="/formik-simple-simplified">Simple form (Simplified)</Link></li>
                <li><Link to="/formik-with-yup">Validation (Yup)</Link></li>
                <li><Link to="/formik-dynamic-validation">Dynamic validation form</Link></li>
                <li><Link to="/formik-dynamic-validation-with-yup">Dynamic validation form (Yup)</Link></li>
                <li><Link to="/formik-inline-form">Inline Form (Yup)</Link></li>
            </ul>
        </nav>

        <Route exact path="/" component={SimpleForm} />
        <Route exact path="/formik-simple" component={SimpleForm} />
        <Route exact path="/formik-simple-simplified" component={SimpleFormSimplified} />
        <Route exact path="/formik-with-yup" component={FormValidationWithYup} />        
        <Route exact path="/formik-dynamic-validation" component={DynamicValidationForm} />
        <Route exact path="/formik-dynamic-validation-with-yup" component={DynamicValidationFormWithYup} />
        <Route exact path="/formik-inline-form" component={InlineForm} />
      </div>
    </Router>
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header" style={{marginBottom: '10rem'}}>
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title"><strong>Formik</strong></h1>
                </header>

                <Routes />
            </div>
        );
    }
}

export default App;
