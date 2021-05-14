import React, { useState, useContext } from 'react';

import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import TenantsContext from '../../contexts/TenantsContext';
import variables from '../../variables';
import * as AiIcons from 'react-icons/ai';
import MaskedInput from 'react-text-mask';

export default function Tenancy({ locacoes }) {
  const token = sessionStorage.getItem('@T_A');

  const [tenantData, setTenantData] = useState({
    rg: locacoes.rg,
    cpf: locacoes.cpf,
    email: locacoes.email,
    telefone: locacoes.telefone,
    celular: locacoes.celular,
    fone_comercial: locacoes.fone_comercial
  });

  const { getLocation } = useContext(TenantsContext);

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

  const selecionarLocacoes = (elemento, caso) => {
    caso === 'Editar' ? setModalEditar(true) : setModalExcluir(true);
  };

  const editar = e => {
    e.preventDefault();

    fetch(variables.api + `/locatario/${locacoes.id}`, {
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
        getLocation();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const excluir = e => {
    e.preventDefault();

    fetch(variables.api + `/locatario/${locacoes.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(locacoes)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        getLocation();
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
      <tr key={locacoes.id}>
        <td className="border-bottom radius">{locacoes.nome}</td>
        <td className="border-bottom">{locacoes.celular}</td>
        <td className="border-bottom">{locacoes.email}</td>
        <td className="td-shares border-bottom radius2">
          <button
            title="Editar"
            type="button"
            className="btn btn-primary btn-edit-users"
            onClick={() => selecionarLocacoes(locacoes, 'Editar')}
          >
            <MdIcons.MdEdit className="edit-users" />
          </button>
          <button
            title="Excluir"
            className="btn btn-danger btn-delete-users"
            onClick={() => selecionarLocacoes(locacoes, 'Excluir')}
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
                defaultValue={locacoes && locacoes.nome}
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
                defaultValue={locacoes && locacoes.celular}
                onChange={handleChange}
              />

              <br />
              <label>E-mail:</label>
              <input
                className="form-control"
                type="text"
                name="email"
                defaultValue={locacoes && locacoes.email}
                onChange={handleChange}
              />
              <br />
              <label>Telefone:</label>
              <input
                className="form-control"
                type="text"
                name="telefone"
                defaultValue={locacoes && locacoes.telefone}
                onChange={handleChange}
              />
              <br />
              <label>Telefone Comercial:</label>
              <input
                className="form-control"
                type="text"
                name="fone_comercial"
                defaultValue={locacoes && locacoes.fone_comercial}
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
                defaultValue={locacoes && locacoes.cpf}
                onChange={handleChange}
              />
              <br />
              <label>RG:</label>
              <input
                className="form-control"
                type="text"
                name="rg"
                defaultValue={locacoes && locacoes.rg}
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
            <label>{locacoes.nome}</label>

            <span>E-mail:</span>
            <hr></hr>
            <label>{locacoes.email}</label>

            <span>Celular:</span>
            <hr></hr>
            <label>{locacoes.celular}</label>

            <span>RG:</span>
            <hr></hr>
            <label>{locacoes.rg}</label>

            <span>CPF:</span>
            <hr></hr>
            <label>{locacoes.cpf}</label>

            <span>Telefone:</span>
            <hr></hr>
            <label>{locacoes.telefone}</label>

            <span>Telefone Comercial:</span>
            <hr></hr>
            <label>{locacoes.fone_comercial}</label>
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
