/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./tenants.css";
import Sidebar from "../../Menu/Menu";

import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
// import MaskedInput from "react-text-mask";
import ReactPaginate from "react-paginate";
import Navbar from "../../components/Navbar";
import variables from "../../variables";
import * as AiIcons from "react-icons/ai";

function Location() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxNzE5NjEyNX0.L86Vtb1FsZVna7Vshv_wu9nd3U6Q1HnieNYbbn6ZqpY";

  useEffect(() => {
    getLocatarios();
  }, []);

  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users

    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((users) => {
      return (
        <tr key={users.id}>
          <td className="border-bottom radius">{users.id}</td>
          <td className="border-bottom">{users.nome}</td>
          <td className="border-bottom">{users.celular}</td>
          <td className="border-bottom">{users.email}</td>
          <td className="td-shares border-bottom radius2">
            <button
              title="Editar"
              type="button"
              className="btn btn-primary btn-edit-users"
              onClick={() => selecionarUsers(users, "Editar")}
            >
              <MdIcons.MdEdit className="edit-users" />
            </button>
            <button
              title="Excluir"
              className="btn btn-danger btn-delete-users"
              onClick={() => selecionarUsers(users, "Excluir")}
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
      );
    });

  const getLocatarios = () => {
    fetch(variables.api + "/locatario", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      })
      .catch((err) => {});
  };

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const dataUsers = [
    {
      nome: "",
      rg: "",
      cpf: "",
      email: "",
      telefone: "",
      celular: "",
      fone: "",
    },
  ];

  const [data, setData] = useState(dataUsers);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const [tenant, setTenants] = useState({
    id: "",
    nome: "",
    rg: "",
    cpf: "",
    email: "",
    telefone: "",
    celular: "",
    fone: "",
  });

  const selecionarUsers = (elemento, caso) => {
    setTenants(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalExcluir(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenants((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = (e) => {
    e.preventDefault();

    fetch(variables.api + "/locatario", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tenant),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getLocatarios();
      })
      .catch((err) => {
        console.log(err);
      });

    var dataNova = data;
    dataNova.map((pais) => {
      if (pais.id === tenant.id) {
        pais.nome = tenant.nome;
        pais.rg = tenant.rg;
        pais.cpf = tenant.cpf;
        pais.email = tenant.email;
        pais.telefone = tenant.telefone;
        pais.celular = tenant.celular;
        pais.fone = tenant.fone;
      }
    });
    setData(dataNova);
    setModalEditar(false);
  };

  const excluir = () => {
    setData(data.filter((pais) => pais.id !== tenant.id));
    setModalExcluir(false);
  };

  const abrirModalAdd = () => {
    setTenants(null);
    setModalAdd(true);
  };

  const abrirModalVisualizar = () => {
    setTenants(null);
    setModalVisualizar(true);
  };

  const Add = (e) => {
    e.preventDefault();

    fetch(variables.api + "/locatario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tenant),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getLocatarios();
      })
      .catch((err) => {
        console.log(err);
      });

    var valorAdd = tenant;
    valorAdd.id = data[data.length - 1].id + 1;
    var dataNova = data;
    dataNova.push(valorAdd);
    setData(dataNova);
    setModalAdd(false);
  };

  return (
    <div>
      <Sidebar />
      <div className="Navbar-tenants">
        <Navbar title="Locatários" />
      </div>
      <main className="main-tenants">
        <div className="body-main tenants">
          <div className="Location main-location">
            <div className="header-users">
              <br />
              <button
                className="users-register"
                onClick={() => abrirModalAdd()}
              >
                <h4>+ Adicionar Novo Locatário</h4>{" "}
              </button>
              <br />
              <br />
            </div>
            <table className="table-dash">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Cidade</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>
            </table>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />

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
                      value={tenant && tenant.nome}
                      onChange={handleChange}
                    />

                    <br />
                    <label>E-mail:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={tenant && tenant.email}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Telefone:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="telefone"
                      value={tenant && tenant.telefone}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Celular:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="celular"
                      value={tenant && tenant.celular}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Telefone Comercial:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="comercial"
                      value={tenant && tenant.fone}
                      onChange={handleChange}
                    />
                    <br />
                    <label>CPF:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="cpf"
                      value={tenant && tenant.cpf}
                      onChange={handleChange}
                    />
                    <br />
                    <label>RG:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="rg"
                      value={tenant && tenant.rg}
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
                  onClick={editar}
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

            <Modal isOpen={modalVisualizar}>
              <ModalHeader className="headerModalVisualizar">
                <div className="modalVisu">
                  <div>
                    <h3>VER MAIS</h3>
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
                <div className="form-group">
                  <label>Nome:</label>

                  <br />

                  <label>Cidade:</label>

                  <br />
                  <label>E-mail:</label>

                  <br />
                  <label>Telefone:</label>

                  <br />
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
                  onClick={() => excluir()}
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

            <Modal isOpen={modalAdd}>
              <ModalHeader>
                <div>
                  <h3>Novo Locatário</h3>
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
                      onChange={(value) =>
                        setTenants({ ...tenant, nome: value.target.value })
                      }
                    />
                    <br />

                    <label>E-mail:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      onChange={(value) =>
                        setTenants({ ...tenant, email: value.target.value })
                      }
                    />
                    <br />
                    <label>Telefone:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="telefone"
                      onChange={(value) =>
                        setTenants({ ...tenant, telefone: value.target.value })
                      }
                    />
                    <br />
                    <label>Celular:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="celular"
                      onChange={(value) =>
                        setTenants({ ...tenant, celular: value.target.value })
                      }
                    />
                    <br />
                    <label>Telefone Comercial:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="comercial"
                      onChange={(value) =>
                        setTenants({
                          ...tenant,
                          fone_comercial: value.target.value,
                        })
                      }
                    />
                    <br />
                    <label>CPF:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="cpf"
                      onChange={(value) =>
                        setTenants({ ...tenant, cpf: value.target.value })
                      }
                    />
                    <br />
                    <label>RG:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="rg"
                      onChange={(value) =>
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
                      className="btn btn-danger btn-cancel-users"
                      onClick={() => setModalAdd(false)}
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

export default Location;
