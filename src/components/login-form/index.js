import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import TextField from "src/components/text-field";
import './style.css';

function LoginForm({errorMessage, onLogin, t}) {

  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(login, password);
  }

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <h2 className={cn('title')}>{t('auth.title')}</h2>

      <TextField label={t('auth.login')} value={login} onChange={setLogin}/>
      <TextField type={'password'} label={t('auth.password')} value={password}
                 onChange={setPassword}/>

      {errorMessage ? <p className={cn('error')}>{errorMessage}</p> : null}
      <button>{t('auth.signIn')}</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: propTypes.func,
  errorMessage: propTypes.string,
  t: propTypes.func,
}

LoginForm.defaultProps = {}

export default React.memo(LoginForm);
