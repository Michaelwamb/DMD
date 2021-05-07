import React, { useState, useContext } from 'react';

import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import TenantsContext from '../../contexts/TenantsContext';
import variables from '../../variables';
import * as AiIcons from 'react-icons/ai';
import MaskedInput from 'react-text-mask';

export default function Tenant({ tenant }) {
  const token = sessionStorage.getItem('@T_A');

  const [tenantData, setTenantData] = useState({
    nome: tenant.nome,
    rg: tenant.rg,
    cpf: tenant.cpf,
    email: tenant.email,
    telefone: tenant.telefone,
    celular: tenant.celular,
    fone_comercial: tenant.fone_comercial
  });

  const { getLocatarios } = useContext(TenantsContext);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    console.log(name, value, 'ijasdsia');
    setTenantData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const selecionarTenants = (elemento, caso) => {
    caso === 'Editar' ? setModalEditar(true) : setModalExcluir(true);
  };

  const editar = e => {
    e.preventDefault();

    fetch(variables.api + `/locatario/${tenant.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tenantData)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setModalEditar(false);
        getLocatarios();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const excluir = e => {
    e.preventDefault();

    fetch(variables.api + `/locatario/${tenant.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tenant)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        getLocatarios();
      })
      .catch(err => {
        console.log(err);
      });

    setModalExcluir(false);
  };

  const abrirModalVisualizar = () => {
    setModalVisualizar(true);
  };

  return (
    <>
      <tr key={tenant.id}>
        <td className="border-bottom radius">{tenant.nome}</td>
        <td className="border-bottom">{tenant.celular}</td>
        <td className="border-bottom">{tenant.email}</td>
        <td className="td-shares border-bottom radius2">
          <button
            title="Editar"
            type="button"
            className="btn btn-primary btn-edit-users"
            onClick={() => selecionarTenants(tenant, 'Editar')}
          >
            <MdIcons.MdEdit className="edit-users" />
          </button>
          <button
            title="Excluir"
            className="btn btn-danger btn-delete-users"
            onClick={() => selecionarTenants(tenant, 'Excluir')}
          >
            <MdIcons.MdDelete className="delete-users" />
          </button>
          <button
            title="visualizar"
            className="btn btn-secondary btnnn"
            onClick={() => abrirModalVisualizar()}
          >
            <IoIcons.IoMdAdd className="more-users" />
          </button>
        </td>
      </tr>

      <Modal scrollable={true} isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>EDITAR</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={editar}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                className="form-control"
                type="text"
                name="nome"
                defaultValue={tenant && tenant.nome}
                onChange={handleChange}
              />
              <br />
              <label>Celular:</label>
              <MaskedInput
                className="form-control"
                type="text"
                name="celular"
                mask={[
                  '(',
                  /[1-9]/,
                  /\d/,
                  ')',
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/
                ]}
                defaultValue={tenant && tenant.celular}
                onChange={handleChange}
              />

              <br />
              <label>E-mail:</label>
              <input
                className="form-control"
                type="text"
                name="email"
                defaultValue={tenant && tenant.email}
                onChange={handleChange}
              />
              <br />
              <label>Telefone:</label>
              <input
                className="form-control"
                type="text"
                name="telefone"
                defaultValue={tenant && tenant.telefone}
                onChange={handleChange}
              />
              <br />
              <label>Telefone Comercial:</label>
              <input
                className="form-control"
                type="text"
                name="fone_comercial"
                defaultValue={tenant && tenant.fone_comercial}
                onChange={handleChange}
              />
              <br />
              <label>CPF:</label>
              <MaskedInput
                className="form-control"
                type="text"
                name="cpf"
                mask={[
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  '.',
                  /\d/,
                  /\d/,
                  /\d/,
                  '.',
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/
                ]}
                defaultValue={tenant && tenant.cpf}
                onChange={handleChange}
              />
              <br />
              <label>RG:</label>
              <input
                className="form-control"
                type="text"
                name="rg"
                defaultValue={tenant && tenant.rg}
                onChange={handleChange}
              />
              <br />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary btn-att"
            type="submit"
            onClick={e => editar(e)}
          >
            Atualizar
          </button>
          <button
            className="btn btn-danger btn-cancel"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal className="ModalView" scrollable={true} isOpen={modalVisualizar}>
        <ModalHeader className="headerModalVisualizar">
          <div className="modalHeader">
            <div>
              <h3>Dados do Locatário</h3>
            </div>

            <button
              className="btn-cancel modal-btnVisu"
              onClick={() => setModalVisualizar(false)}
            >
              <AiIcons.AiOutlineClose />
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="modalBodyView">
            <span>Nome:</span>
            <hr></hr>
            <label>{tenant.nome}</label>

            <span>E-mail:</span>
            <hr></hr>
            <label>{tenant.email}</label>

            <span>Celular:</span>
            <hr></hr>
            <label>{tenant.celular}</label>

            <span>RG:</span>
            <hr></hr>
            <label>{tenant.rg}</label>

            <span>CPF:</span>
            <hr></hr>
            <label>{tenant.cpf}</label>

            <span>Telefone:</span>
            <hr></hr>
            <label>{tenant.telefone}</label>

            <span>Telefone Comercial:</span>
            <hr></hr>
            <label>{tenant.fone_comercial}</label>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody className="modal-message-delete">
          Tem certeza que deseja excluir esse usuário ?
        </ModalBody>
        <ModalFooter className="modal-message-delete">
          <button
            type="submit"
            className="btn btn-danger yes-modal-delete"
            onClick={e => excluir(e)}
          >
            SIM
          </button>
          <button
            className="btn btn-secondary no-modal-delete"
            onClick={() => setModalExcluir(false)}
          >
            NÃO
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
