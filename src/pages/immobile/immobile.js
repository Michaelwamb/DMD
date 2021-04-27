/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./immobile.css";
import * as MdIcons from "react-icons/md";
import Image from "../../assets/dmd_massa.png";
import * as IoIcons from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../../Menu/Menu";
import Navbar from "../../components/Navbar";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import variables from "../../variables";
import Input from "../../components/Input";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";

import { Form } from "@unform/web";

const Immobile = (props) => {
  // const formRef = useRef(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxNzE5NjEyNX0.L86Vtb1FsZVna7Vshv_wu9nd3U6Q1HnieNYbbn6ZqpY";

  const { buttonLabel } = props;

  const [modalEditar, setModalEditar] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

  const [tipoImovel, setTipoImovel] = useState([]);
  const [tipoCompra, setTipoCompra] = useState([]);

  const [immobile, setImmobile] = useState({
    nomeImovel: "",
    endereço: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    getImoveis();
    getTipoImovel();
    getTipoCompra();
  }, []);

  const abrirModalAdd = () => {
    setImmobile(null);
    setModalAdd(true);
  };

  const Add = (e) => {
    e.preventDefault();

    fetch(variables.api + "/locatario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(immobile),
    })
      .then((response) => response.json())
      .then((response) => {
        getImoveis();
      })
      .catch((err) => {
        console.log(err);
      });

    var valorAdd = immobile;
    valorAdd.id = data[data.length - 1].id + 1;
    var dataNova = data;
    dataNova.push(valorAdd);
    setData(dataNova);
    setModalAdd(false);
  };

  const getImoveis = () => {
    fetch(variables.api + "/imoveis", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const getTipoImovel = () => {
    fetch(variables.api + "/tipoimoveis", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTipoImovel(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTipoCompra = () => {
    fetch(variables.api + "/tipocompra", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTipoCompra(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postImmobiles = (data) => {
    console.log(data);

    fetch(variables.api + "/imoveis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="Navbar-immobile">
        <Navbar title="Imóveis" />
      </div>
      <main className="main-immobile">
        <div className="menu-heard">
          <div className="buttonNovo">
            {/* <button class="MuiButtonBase-root MuiButton-root MuiButton-contained jss5 MuiButton-containedPrimary"
            tabindex="0" type="button"> */}
            <button className="confirm-button-filter" id="button">
              <span className="MuiButton-label">
                <h5 onClick={() => abrirModalAdd()}>+ Adicionar Novo Imóvel</h5>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
          </div>
        </div>
        <div className="immobile">
          <div className="form-body">
            <form className="filter-form form">
              <div className="input-block">
                <div className="input-search label-float">
                  <input
                    className="fa fa-search txtbusca outline-none"
                    placeholder="Nome do Imóvel"
                  ></input>
                </div>
              </div>
              <div className="input-block" id="cidade">
                <input
                  placeholder="Cidade..."
                  className="outline-none txtbusca"
                ></input>
              </div>

              <div className="input-block" id="estado">
                <input
                  className="txtbusca outline-none"
                  placeholder="Estado..."
                />
              </div>

              <div className="input-block input-status">
                <select
                  className="select-status outline-none"
                  placeholder="Status..."
                >
                  <option value="0">Nenhum</option>
                  <option value="1">Locado</option>
                  <option value="2">Vago</option>
                </select>
              </div>

              <div className="date-picker">
                <label className="label-date">DATA DA COMPRA</label>
                <TextField
                  className="date-form"
                  id="date"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="date-picker">
                <label className="label-picker">ATÉ</label>
                <TextField
                  className="date-form"
                  id="date"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div className="filter-btn">
                  <button
                    className="btn confirm-button-filter"
                    id="button1"
                    type="submit"
                  >
                    Filtrar
                  </button>
                </div>
              </div>
            </form>
          </div>

          <hr></hr>

          <div className="box-user">
            {data.map((elemento) => (
              <div className="immobile-box">
                <img src={Image} alt="" />

                <div className="text-box break">
                  <label className="label-box">{elemento.nomeImovel}</label>
                  <h3>{elemento.endereço}</h3>
                  <h3>
                    {elemento.cidade} - {elemento.estado}
                  </h3>
                </div>

                <div className="users-buttons">
                  <div className="edit">
                    <button
                      title="Editar"
                      className="buttonEdit"
                      type="submit"
                      onClick={toggle}
                    >
                      {buttonLabel}
                      <MdIcons.MdEdit className="IconEdit" />
                    </button>
                  </div>
                  <div className="trash">
                    <button
                      title="Excluir"
                      className="buttonTrash"
                      type="submit"
                    >
                      <MdIcons.MdDelete
                        style={{ fontSize: 25, color: "#fff" }}
                      />
                    </button>
                  </div>
                  <div className="more">
                    <button title="Ver mais" className="buttonMore">
                      <IoIcons.IoMdAdd
                        style={{ color: "#fff", fontSize: 30 }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal scrollable={true} isOpen={modalAdd}>
            <ModalHeader>
              <div>
                <h3>Novo Imóvel</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={Add}>
                <div className="form-group">
                  <Form id="fImovel" onSubmit={postImmobiles}>
                    <label>Descrição do Imóvel</label>
                    <Input
                      width="100%"
                      height="42px"
                      padding="5px 10px"
                      margin="0px 0px 10px 0px"
                      name="nomeImovel"
                      type="text"
                      onChange={(value) =>
                        setImmobile({
                          ...immobile,
                          nomeImovel: value.target.value,
                        })
                      }
                    />
                    <label style={{ width: "47%" }}>Endereço do Imóvel</label>
                    <Input
                      onChange={(value) =>
                        setImmobile({
                          ...immobile,
                          endereço: value.target.value,
                        })
                      }
                      style={{ outline: "none" }}
                      width="100%"
                      height="42px"
                      padding="5px 10px"
                      margin="0px 0px 10px 0px"
                      name="enderecoImovel"
                      type="text"
                      placeholder="Endereço Imóvel"
                    />
                    <label style={{ width: "47%" }}>
                      Cidade
                      <Input
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px 26px 10px 0px"
                        name="cidadeImovel"
                        type="text"
                        placeholder="Cidade"
                      />
                    </label>
                    <label style={{ width: "47%", marginLeft: "26px" }}>
                      Estado
                      <Input
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px"
                        name="estadoImovel"
                        type="text"
                        placeholder="Estado"
                      />
                    </label>
                    <label style={{ width: "47%" }}>
                      Aluguel do Imóvel
                      <Input
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px 26px 10px 0px"
                        name="aluguelImovel"
                        type="text"
                        placeholder="Valor do aluguel"
                      />
                    </label>
                    <label style={{ width: "47%", marginLeft: "26px" }}>
                      Valor da compra
                      <Input
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px"
                        name="compraImovel"
                        type="text"
                        placeholder="Valor da Compra"
                      />
                    </label>

                    <div>
                      <label style={{ width: "30%" }}>
                        Quartos
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 22px 10px 0px"
                          name="quartosImovel"
                          type="text"
                          placeholder="Quartos"
                        />
                      </label>
                      <label style={{ width: "30%", marginLeft: "22px" }}>
                        Suítes
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 22px 10px 0px"
                          name="suitesImovel"
                          type="text"
                          placeholder="Suítes"
                        />
                      </label>
                      <label style={{ width: "30%", marginLeft: "22px" }}>
                        Garagens
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 0px 10px 0px"
                          name="garagemImovel"
                          type="text"
                          placeholder="Garagem"
                        />
                      </label>
                    </div>

                    <div>
                      <label style={{ width: "30%" }}>
                        Banheiros
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 22px 10px 0px"
                          name="banheirosImovel"
                          type="text"
                          placeholder="Banheiros"
                        />
                      </label>
                      <label style={{ width: "30%", marginLeft: "22px" }}>
                        {" "}
                        Sala de estar
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 22px 10px 0px"
                          name="salaEstarImovel"
                          type="text"
                          placeholder="Sala de Estar"
                        />
                      </label>
                      <label style={{ width: "30%", marginLeft: "22px" }}>
                        Area
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 0px 10px 0px"
                          name="areaServicoImovel"
                          type="text"
                          placeholder="Área de Serviço"
                        />
                      </label>
                    </div>
                    <label style={{ width: "47%" }}>
                      Tipo de Imóvel
                      <Select
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px 0px 10px 0px"
                        name="tipoImovel"
                        type="text"
                      >
                        {tipoImovel.map((tipo) => (
                          <option value={tipo.id} key={tipo.id}>
                            {tipo.descricao}
                          </option>
                        ))}
                      </Select>
                    </label>

                    <label style={{ width: "47%", marginLeft: "26px" }}>
                      Tipo de Compra
                      <Select
                        style={{ outline: "none" }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px 0px 10px 0px"
                        name="tipoCompra"
                        type="text"
                      >
                        {tipoCompra.map((tipo) => (
                          <option value={tipo.id} key={tipo.id}>
                            {tipo.descricao}
                          </option>
                        ))}
                      </Select>
                    </label>

                    <div>
                      <label style={{ width: "47%" }}>
                        Status
                        <Select
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 0px 10px 0px"
                          name="status"
                          type="text"
                        ></Select>
                      </label>

                      <label style={{ width: "47%", marginLeft: "26px" }}>
                        {" "}
                        Metros
                        <Input
                          style={{ outline: "none" }}
                          width="100%"
                          height="42px"
                          padding="5px 10px"
                          margin="0px 0px 10px 0px"
                          name="metros"
                          type="text"
                          placeholder="Metros²"
                        />
                      </label>
                    </div>
                    <Grid container spacing={3} className="grid">
                      <Grid item xs={6} className="gridF">
                        <label>Data da Compra:</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          id="date"
                          type="date"
                          defaultValue="2017-05-24"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid
                        style={{ marginBottom: "20px" }}
                        item
                        xs={6}
                        className="gridF"
                      >
                        <label>Data da Venda:</label>
                        <TextField
                          className="input"
                          variant="outlined"
                          id="date"
                          type="date"
                          defaultValue="2017-05-24"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <label> Observações </label>
                    <TextArea
                      style={{ outline: "none" }}
                      width="100%"
                      height="100px"
                      padding="5px 10px"
                      margin="0px 0px 10px 0px"
                      name="observacao"
                      type="text"
                      placeholder="Observações"
                    />
                    <label> Motivo da Venda </label>
                    <TextArea
                      style={{ outline: "none" }}
                      width="100%"
                      height="100px"
                      padding="5px 10px"
                      margin="0px 0px 10px 0px"
                      name="motivoVenda"
                      type="text"
                      placeholder="Motivo Venda"
                    />
                    <div className="buttonsModalImmobile">
                      <button
                        className="btn btn-primary btn-add-users"
                        style={{ height: "50px", backgroundColor: "#37C56F" }}
                        type="submit"
                        onClick={() => Add()}
                      >
                        Salvar
                      </button>
                      <button
                        style={{ height: "50px" }}
                        className="btn btn-danger btn-cancel-users"
                        onClick={() => setModalAdd(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Form>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>EDITAR</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Nome Imóvel:</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="Nome"
                />
                <br />

                <label>Endereço:</label>
                <input className="form-control" type="text" name="endereço" />
                <br />

                <label>Cidade:</label>
                <input className="form-control" type="text" name="cidade" />
                <br />
                <label>Estado:</label>
                <input className="form-control" type="text" name="estado" />
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary btn-att">Atualizar</button>
              <button
                className="btn btn-danger btn-cancel"
                onClick={() => setModalEditar(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Immobile;
