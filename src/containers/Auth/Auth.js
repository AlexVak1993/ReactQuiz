import React, { Component } from "react";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from 'axios'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {

  state = {
    isFromValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Input correct email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Input correct password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        },
      },
    },
  };

  loginHandler = () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsB5DGT0n8ETp7vXH9mYIaVOhpOqvg00A', authData)

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsB5DGT0n8ETp7vXH9mYIaVOhpOqvg00A', authData)

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls} //сделали копию стейта, которую будем менять
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control //изминили состояние стейта

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })

    return inputs
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authentication</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              Sign In
            </Button>
            <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
