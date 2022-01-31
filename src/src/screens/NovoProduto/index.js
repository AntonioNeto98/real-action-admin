import React from 'react';
import Sidebar, { getCookie } from '../../components/Sidebar';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';

import { host } from '../../../host';

import './styles.css';
import Swal from 'sweetalert2';


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
  const [isChecked, setIsChecked] = React.useState(false);

  const [nomeProduto, setNomeProduto] = React.useState('');
  const [nomeFabricante, setNomeFabricante] = React.useState('');
  const [categoria, setCategoria] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [tamanho, setTamanho] = React.useState('');
  const [quantidade, setQuantidade] = React.useState('');
  const [descricao, setDescricao] = React.useState('');

  const [imagem1, setImagem1] = React.useState('');
  const [imagem2, setImagem2] = React.useState('');
  const [imagem3, setImagem3] = React.useState('');
  const [imagem4, setImagem4] = React.useState('');
  const [imagem5, setImagem5] = React.useState('');

  React.useEffect(() => {
  }, []);

  return (
    <div className="content">
      <Sidebar page='Produtos' />

      <h1>Novo Produto</h1>

      <div className="wrapper">

        <Input
          label="Nome do Produto"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setNomeProduto(e.target.value)}
        />

        <Input
          label="Nome do Fabricante"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setNomeFabricante(e.target.value)}
        />

        <Input
          label="Categoria"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setCategoria(e.target.value)}
        />

        <div className="new-product-input">
          <label for={`input-preco`}>Preço:</label>
          <CurrencyInput
            id={`input-preco`}
            placeholder="Insira aqui..."
            decimalsLimit={2}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            onValueChange={(value, name) => setPreco(value)}
          />
        </div>

        <div className="new-product-input">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <input
                type="checkbox"
                id={`input-dimensions-checkbox-1`}
                onChange={e => {
                  setIsChecked(document.getElementById(`input-dimensions-checkbox-1`).checked ? true : false);
                  document.getElementById(`input-dimensions-checkbox-2`).checked = false;
                }}
              />

              <label for={`input-dimensions-checkbox-1`} style={{ marginLeft: '2.5px' }}>
                Tamanho
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <input
                type="checkbox"
                id={`input-dimensions-checkbox-2`}
                onChange={e => {
                  setIsChecked(document.getElementById(`input-dimensions-checkbox-2`).checked ? false : true);
                  document.getElementById(`input-dimensions-checkbox-1`).checked = false;
                }}
              />

              <label for={`input-dimensions-checkbox-2`} style={{ marginLeft: '2.5px' }}>
                Dimensões
              </label>
            </div>
          </div>
          {
            isChecked == true ? (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`input-dimensions-checkbox-P`}
                    onChange={e => {
                      document.getElementById(`input-dimensions-checkbox-G`).checked = false;
                      document.getElementById(`input-dimensions-checkbox-M`).checked = false;

                      if (document.getElementById(`input-dimensions-checkbox-P`).checked == true) {
                        setTamanho('P')
                      }
                    }}
                  />

                  <label for={`input-dimensions-checkbox-P`} style={{ marginLeft: '2.5px' }}>
                    P
                  </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`input-dimensions-checkbox-M`}
                    onChange={e => {
                      document.getElementById(`input-dimensions-checkbox-P`).checked = false;
                      document.getElementById(`input-dimensions-checkbox-G`).checked = false;

                      if (document.getElementById(`input-dimensions-checkbox-M`).checked == true) {
                        setTamanho('M')
                      }
                    }}
                  />

                  <label for={`input-dimensions-checkbox-M`} style={{ marginLeft: '2.5px' }}>
                    M
                  </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`input-dimensions-checkbox-G`}
                    onChange={e => {
                      document.getElementById(`input-dimensions-checkbox-P`).checked = false;
                      document.getElementById(`input-dimensions-checkbox-M`).checked = false;

                      if (document.getElementById(`input-dimensions-checkbox-G`).checked == true) {
                        setTamanho('G')
                      }
                    }}
                  />

                  <label for={`input-dimensions-checkbox-G`} style={{ marginLeft: '2.5px' }}>
                    G
                  </label>
                </div>
              </div>
            ) :
              <input
                id={`input-dimensions`}
                placeholder="Insira aqui..."
                type="text"
                onChange={e => setTamanho(e.target.value)} />
          }
        </div>

        <Input
          label="Quantidade em Estoque"
          placeholder="Insira aqui..."
          type="text"
          onChange={e => setQuantidade(e.target.value)}
        />

      </div>

      <div className="new-product-input" style={{ marginTop: '1vw' }}>
        <label for={`input-descricao`}>Descrição do Produto:</label>

        <textarea
          id="input-descricao"
          placeholder="Insira a descrição aqui..."
          onChange={e => setDescricao(e.target.value)}
        ></textarea>
      </div>


      <div className="wrapper" style={{ marginTop: '1vw' }}>

        <Input
          label="Imagem 01"
          type="file"
          accept="image/*"
          onChange={async e => setImagem1(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />

        <Input
          label="Imagem 02"
          type="file"
          accept="image/*"
          onChange={async e => setImagem2(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />

        <Input
          label="Imagem 03"
          type="file"
          accept="image/*"
          onChange={async e => setImagem3(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />

        <Input
          label="Imagem 04"
          type="file"
          accept="image/*"
          onChange={async e => setImagem4(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />

        <Input
          label="Imagem 05"
          type="file"
          accept="image/*"
          onChange={async e => setImagem5(await toBase64(e.target.files[0]))}
          style={{ border: '1px solid #02394A', padding: '10px' }}
        />


        <div
          className="new-product-submit"
          onClick={() => {
            const token = getCookie('real-auth-token');

            axios
              .post(`${host}/products`, {
                'product': {
                  'banner': imagem1,
                  'images': [imagem2, imagem3, imagem4, imagem5],
                  'brand': nomeFabricante,
                  'size': tamanho,
                  'name': nomeProduto,
                  'category': categoria,
                  'description': descricao,
                  'price': parseFloat(preco),
                  'quantity': quantidade
                }
              }, {
                headers: {
                  'x-access-token': token,
                }
              })
              .then(res => res.data.success ? Swal.fire({
                title: 'FETIO!',
                text: 'Produto cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Cool'
              }).then(() => window.location.href = '/produtos') : Swal.fire({
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