import React from 'react';
import './styles.css'

import LogoImage from '../../images/logo2.png';
import ProductImage from '../../images/icons/product.png';
import EventsImage from '../../images/icons/event.png';
import ViewImage from '../../images/icons/view.png';
import LogoutImage from '../../images/icons/logout.png';
import GearImage from '../../images/icons/gear.png';
import ListImage from '../../images/icons/list.png';

export const getCookie = (name) => {
  const escape = (s) => s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

export default ({ page }) => {
  React.useEffect(() => getCookie('real-auth-token') == null ? window.location.href = '/' : null, []);

  return (
    <div className='sidebar-container'>
      <img src={LogoImage} />

      <div
        className='sidebar-button'
        id="sidebar-null"
      >
        <span>Visualizar Site</span>
        <img src={ViewImage} />
      </div>

      <div
        className='sidebar-button'
        id={
          page === 'Produtos' ? 'sidebar-active' : 'sidebar-null'
        }
        style={
          page === 'Produtos' ? {
            borderBottom: '1px solid rgba(255, 255, 255, .5)'
          } : null
        }
        onClick={() => window.location.href = '/produtos'}
      >
        <span>Produtos</span>
        <img src={ProductImage} />
      </div>

      <div
        className='sidebar-button'
        id={
          page === 'Pedidos' ? 'sidebar-active' : 'sidebar-null'
        }
        style={
          page === 'Pedidos' ? {
            borderBottom: '1px solid rgba(255, 255, 255, .5)'
          } : null
        }
      >
        <span>Pedidos</span>
        <img src={ListImage} />
      </div>

      <div
        className='sidebar-button'
        id={
          page === 'Eventos' ? 'sidebar-active' : 'sidebar-null'
        }
        style={
          page === 'Eventos' ? {
            borderBottom: '1px solid rgba(255, 255, 255, .5)'
          } : null
        }
        onClick={() => window.location.href = '/eventos'}
      >
        <span>Eventos</span>
        <img src={EventsImage} />
      </div>

      <div
        className='sidebar-button'
        id={
          page === 'Configurações' ? 'sidebar-active' : 'sidebar-null'
        }
        style={
          page === 'Configurações' ? {
            borderBottom: '1px solid rgba(255, 255, 255, .5)'
          } : null
        }
      >
        <span>Configurações</span>
        <img src={GearImage} />
      </div>

      <div
        className='sidebar-button'
        id="sidebar-null"
        onClick={() => {
          window.cookie = 'real-auth-token=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=localhost;';
          //window.location = '/';
        }}
      >
        <span>Encerrar Sessão</span>
        <img src={LogoutImage} />
      </div>
    </div>
  );
}