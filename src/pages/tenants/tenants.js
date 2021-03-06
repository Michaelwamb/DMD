/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import './tenants.css';
import Sidebar from '../../Menu/Menu';

import TenantsContext from '../../contexts/TenantsContext';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar';
import variables from '../../variables';
import Tenant from '../../components/Tenant';
import { lower } from '../immobile/lower';

function Tenants() {
  const token = sessionStorage.getItem('@T_A');

  useEffect(() => {
    getLocatarios();
  }, []);

  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [tenantsNome, setTenantsNome] = useState('');
  const [tenantsCelular, setTenantsCelular] = useState('');
  const [tenantsEmail, setTenantsEmail] = useState('');

  function searchChange(func) {
    return e => {
      func(e.target.value);
    };
  }

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const getLocatarios = () => {
    fetch(variables.api + '/locatario', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setUsers(response);
      })
      .catch(err => {});
  };

  const displayUsers = users

    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter(
      value =>
        lower(value.nome).includes(lower(tenantsNome)) &&
        lower(value.celular).includes(lower(tenantsCelular)) &&
        lower(value.email).includes(lower(tenantsEmail))
    )
    .map(Index => {
      return (
        <TenantsContext.Provider value={{ getLocatarios }}>
          <Tenant tenant={Index} />
        </TenantsContext.Provider>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [modalAdd, setModalAdd] = useState(false);

  const [tenant, setTenants] = useState({
    id: '',
    nome: '',
    rg: '',
    cpf: '',
    email: '',
    telefone: '',
    celular: '',
    fone_comercial: ''
  });

  // const [ busca, setBusca ] = useState('');

  // const tenantsFilter = tenant.filter(tenants => {
  //   return tenants.name.toLowerCase().includes( busca.toLowerCase() )
  // })

  const abrirModalAdd = () => {
    setModalAdd(true);
  };

  const Add = e => {
    e.preventDefault();

    fetch(variables.api + '/locatario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tenant)
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        getLocatarios();

        setModalAdd(false);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Sidebar />
      <div className="Navbar-tenants">
        <Navbar title="Locat??rios" />
      </div>
      <main className="main-tenants">
        <div className="body-main tenants">
          <div className="Location">
            <div className="bodyFilter">
              <div className="filterTenants">
                <form className="formFilterTenants tenantsForm">
                  <div className="inputFilterTenants filterName">
                    <input onChange={searchChange(setTenantsNome)} />
                  </div>
                  <div className="inputFilterTenants filterEmail">
                    <input onChange={searchChange(setTenantsCelular)} />
                  </div>
                  <div className="inputFilterTenants filterCelular">
                    <input onChange={searchChange(setTenantsEmail)} />
                  </div>
                </form>
              </div>
              <div className="header-users">
                <br />
                <button
                  className="users-register"
                  onClick={() => abrirModalAdd()}
                >
                  <h4>+ Adicionar Novo Locat??rio</h4>{' '}
                </button>
                <br />
              </div>
            </div>
            <table className="table-dash">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Celular</th>
                  <th>E-mail</th>
                  <th>A????es</th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>
            </table>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns'}
              previousLinkClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              activeClassName={'paginationActive'}
            />

            <Modal scrollable={true} isOpen={modalAdd}>
              <ModalHeader>
                <div>
                  <h3>Novo Locat??rio</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <form onSubmit={Add}>
                    <label>Nome:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nome"
                      onChange={value =>
                        setTenants({ ...tenant, nome: value.target.value })
                      }
                    />
                    <br />
                    <label>Celular:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="celular"
                      onChange={value =>
                        setTenants({ ...tenant, celular: value.target.value })
                      }
                    />
                    <br />

                    <label>E-mail:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      onChange={value =>
                        setTenants({ ...tenant, email: value.target.value })
                      }
                    />
                    <br />
                    <label>Telefone:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="telefone"
                      onChange={value =>
                        setTenants({ ...tenant, telefone: value.target.value })
                      }
                    />
                    <br />
                    <label>Telefone Comercial:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="comercial"
                      onChange={value =>
                        setTenants({
                          ...tenant,
                          fone_comercial: value.target.value
                        })
                      }
                    />
                    <br />
                    <label>CPF:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="cpf"
                      onChange={value =>
                        setTenants({ ...tenant, cpf: value.target.value })
                      }
                    />
                    <br />
                    <label>RG:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="rg"
                      onChange={value =>
                        setTenants({ ...tenant, rg: value.target.value })
                      }
                    />
                    <br />

                    <button
                      className="btn btn-primary btn-add-users"
                      type="submit"
                    >
                      Adicionar
                    </button>
                    <button
                      className="btn btn-cancel btn-danger btn-cancel-users"
                      onClick={() => setModalAdd(false)}
                      type="button"
                    >
                      Cancelar
                    </button>
                  </form>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tenants;
