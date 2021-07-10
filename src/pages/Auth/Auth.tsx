import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { useAuthStore } from '../../store/AuthContext';
import Spinner from '../../components/UI/Spinner/Spinner';
import { UserService } from '../../services';
import useAPIError from '../../hooks/useAPIError';

function Auth(props: any) {
  const [controls, setControls] = useState<any>({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Usuario',
      },
      value: '',
      validation: {
        required: true,
        isEmail: false,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Contraseña',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [loading, setLoading] = useState<any>(false);
  const authStore = useAuthStore();
  const { addErrorBack } = useAPIError();

  const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event: any, controlName: string) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const authStart = () => {
    setLoading(true);
  };

  const authSuccess = (token: string) => {
    authStore.setToken(token);
    setLoading(false);
    props.history.push('/home');
  };

  const logout = () => {
    sessionStorage.removeItem('userData');
    Cookies.remove('token');
    sessionStorage.clear();
    authStore.setToken('');
    props.history.push('/');
  };

  const checkAuthTimeout = (expirationTime: number) => {
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  const authFail = () => {
    setLoading(false);
  };

  const onAuth = (email: string, password: string) => {
    authStart();
    UserService.login(email, password)
      .then((response) => {
        if (response.data.error === true) {
          // eslint-disable-next-line no-console
          console.log('error  back');
          addErrorBack(response.data);
          authFail();
        } else {
          authSuccess(response.data);
          checkAuthTimeout(200000);
        }
      })
      .catch((e) => {
        console.log(e);
        authFail();
      });
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value);
  };

  const formElementsArray: any = [];

  Object.keys(controls).forEach(function (key) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  });

  let form: any = formElementsArray.map((formElement: any) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event: any) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  const disabled =
    !(controls.email.valid && controls.password.valid) || loading;

  return (
    <div style={{ marginTop: '10%' }}>
      <div className="Auth">
        <form onSubmit={submitHandler}>
          {form}
          <Button
            style={{ margin: '15px 0' }}
            classN="btn btn-primary "
            disabled={disabled}
            clicked={submitHandler}
          >
            ACEPTAR
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
