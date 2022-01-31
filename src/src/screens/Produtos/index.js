import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles.css';

import Sidebar, { getCookie } from '../../components/Sidebar';

import PlusImage from '../../images/icons/plus.png';
import ProductImage from '../../images/icons/product.png';
import EditImage from '../../images/icons/editing.png';
import DeleteImage from '../../images/icons/delete.png';

import { host } from '../../../host';

const ProductCard = ({ data }) => {
  return (
    <div className="product-card">
      {
        data.banner === '' ? <img src="https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/1630/no-image.png" style={{ marginTop: '1vw', height: '100%', objectFit: 'contain' }} /> : <img src={data.banner} style={{ marginTop: '1vw' }} />
      }

      <div className="product-card-quantity">
        <img src={ProductImage} className="product-card-quantity-icon" />
        {data.quantity}
      </div>

      <div className="product-card-price">
        {data.price == null ? 'FREE' : data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </div>

      {data.name}

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        bottom: 0
      }}>
        <div className="edit-button" onClick={() => window.location.href = `/produtos/editar=${data.id}`}>
          <img src={EditImage} className="product-card-quantity-icon" />
          EDITAR
        </div>
        <div
          className="delete-button"
          onClick={() => Swal.fire({
            title: 'Você quer remover este produto do seu estoque?',
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `REMOVER`,
            denyButtonText: `CANCELAR`,
          }).then((result) => {
            if (result.isConfirmed) {
              const token = getCookie('real-auth-token');

              axios
                .delete(`${host}/products`, {
                  headers: {
                    'x-access-token': token,
                  },
                  data: {
                    'product': {
                      'id': data.id
                    }
                  }
                })
                .then(res => window.location.href = '/produtos')

              Swal.fire('Removido!', '', 'success');
            } else if (result.isDenied) {
              Swal.fire('Ação Cancelada', '', 'alert');
            }
          })}
        >
          <img src={DeleteImage} className="product-card-quantity-icon" />
          REMOVER
        </div>
      </div>
    </div>
  );
}

export default () => {
  const [render, setRender] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${host}/products/0/1000`)
      .then(res => {
        const response = res.data.docs;
        let temp = [];

        if (response.length == 0) {
          temp.push(<div className="box-alert">
            Não há produtos cadastrados, clique no botão no canto inferior direito da página para adicionar um produto.
          </div>);
        } else {
          response.map(item => temp.push(<ProductCard data={item} />));
        }

        setRender(temp);
      });
  }, []);

  return (
    <div className="content">
      <Sidebar page='Produtos' />

      <h1>Produtos</h1>

      <div className='wrapper' style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {
          render
        }
      </div>

      <div className="product-add-button" onClick={() => window.location.href = '/produtos/novo'}>
        <img src={PlusImage} />
      </div>
    </div>
  );
}