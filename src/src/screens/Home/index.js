import React from 'react';
import './styles.css';

import { host } from '../../../host';

import LogoImage from '../../images/logo2.png';
import axios from 'axios';

const Input = ({ label, ...rest }) => {
  return (
    <div className="new-product-input" style={{ marginBottom: '.3vw' }}>
      <label for={`input-${label}`}>{label}:</label>
      <input id={`input-${label}`} {...rest} />
    </div>
  );
}

const getCookie = (name) => {
  const escape = (s) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

export default () => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => getCookie('real-auth-token') != null ? window.location.href = '/produtos' : null, []);

  return (
    <div className="home-content">
      <div className="home-login-box">
        <img src={LogoImage} />

        <Input
          label="Usuário"
          type="text"
          onChange={e => setUser(e.target.value)}
          placeholder="insira aqui..."
        />

        <Input
          label="Senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="insira aqui..."
        />

        <div
          className="new-product-submit"
          style={{
            height: '2.5vw',
            marginTop: '.8vw'
          }}
          onClick={() => {
            axios
              .post(`${host}/login`, {
                'email': user,
                'password': password
              })
              .then(res => {
                if (res.data.success == true) {
                  document.cookie = 'real-auth-token=' + res.data.token;
                  window.location.href = '/';
                } else {
                  window.alert('Email ou senha incorretos.');
                }
              });
          }}
        >
          CONECTAR-SE
        </div>
      </div>
    </div>
  );
}