import React from 'react';
import Sidebar from '../../components/Sidebar';
import './styles.css';

import PlusImage from '../../images/icons/plus.png';

export default () => {
  return (
    <div className="content">
      <Sidebar page='Eventos' />

      <h1>Eventos</h1>

      <div className="box-alert">
        Não há eventos cadastrados, clique no botão no canto inferior direito da página para adicionar um novo evento.
      </div>

      <div className="product-add-button" onClick={() => window.location.href = '/eventos/novo'}>
        <img src={PlusImage} />
      </div>
    </div>
  );
}