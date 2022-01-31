import React from 'react';
import Sidebar, { getCookie } from '../../components/Sidebar';
import CurrencyInput from 'react-currency-input-field';
import Swal from 'sweetalert2';
import axios from 'axios';
import './styles.css';

import { host } from '../../../host';

const Input = ({ label, ...rest }) => {
  return (
    <div className="new-product-input">
      <label for={`input-${label}`}>{label}:</label>
      <input id={`input-${label}`} {...rest} />
    </div>
  );
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default () => {
  const [nomeEvento, setNomeEvento] = React.useState('');
  const [localizacao, setLocalizacao] = React.useState('');
  const [data, setData] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [imagem, setImagem] = React.useState('');

  return (
    <div className="content">
      <Sidebar page='Eventos' />

      <h1>Novo Evento</h1>

      <div className="wrapper" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>

        <Input
          label="Nome do Evento"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setNomeEvento(e.target.value)}
        />

        <Input
          label="Localização"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setLocalizacao(e.target.value)}
        />

        <Input
          label="Data"
          placeholder="Insira aqui..."
          type="date"
          onChange={e => setData(e.target.value)}
        />

        <div className="new-product-input">
          <label for={`input-preco`}>Preço da Entrada:</label>
          <CurrencyInput
            id={`input-preco`}
            placeholder="Insira aqui..."
            decimalsLimit={2}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            onValueChange={(value, name) => setPreco(value)}
          />
        </div>

      </div>

      <div className="new-product-input" style={{ marginTop: '1vw' }}>
        <label for={`input-descricao`}>Descrição do Evento:</label>

        <textarea
          id="input-descricao"
          placeholder="Insira a descrição aqui..."
          onChange={e => setDescricao(e.target.value)}
        ></textarea>
      </div>


      <div className="wrapper" style={{ marginTop: '1vw', gridTemplateColumns: 'repeat(2, 1fr)' }}>

        <Input
          label="Imagem"
          type="file"
          accept="image/*"
          onChange={async e => setImagem(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />

        <div
          className="new-product-submit"
          onClick={() => {
            const token = getCookie('real-auth-token');

            axios
              .post(`${host}/events`, {
                'name': nomeEvento,
                'description': descricao,
                'image': imagem,
                'price': parseFloat(preco),
                'location': localizacao,
                'date': data,
              }, {
                headers: {
                  'x-access-token': token,
                }
              })
              .then(res => res.data.success ? Swal.fire({
                title: 'FETIO!',
                text: 'Evento cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Cool'
              }).then(() => window.location.href = '/eventos') : Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              }));

          }}
        >
          CONCLUIR CADASTRO
        </div>
      </div>

    </div>
  );
}