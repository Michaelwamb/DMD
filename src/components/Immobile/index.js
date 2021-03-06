import React, { useState, useContext } from 'react';
import ImmobileContext from '../../contexts/ImmobileContext';

import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import Image from '../../assets/dmd_massa.png';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import variables from '../../variables';
// import { format, parseISO } from 'data-fns';

import Input from '../Input/index';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import CurrencyInput from '../../currency/CurrencyInput';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { Form } from '@unform/web';

export default function Imoveis({ imovel }) {
  const token = sessionStorage.getItem('@T_A');
  const { getImoveis, tipoCompra, tipoImovel } = useContext(ImmobileContext);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  // const [tipoImovel, setTipoImovel] = useState([]);
  // const [tipoCompra, setTipoCompra] = useState([]);

  const [immobileData, setImmobileData] = useState({
    descricao: imovel.descricao,
    endereco: imovel.endereco,
    cidade: imovel.cidade,
    estado: imovel.estado,
    area_servico: imovel.area_servico,
    id_tipoimovel: imovel.id_tipoimovel,
    id_tipocompra: imovel.id_tipocompra,
    banheiros: imovel.banheiros,
    garagem: imovel.garagem,
    metros: imovel.metros,
    motivo_baixa: imovel.motivo_baixa,
    observacoes: imovel.observacoes,
    quartos: imovel.quartos,
    sala_estar: imovel.sala_estar,
    suites: imovel.suites,
    valor_imovel: imovel.valor_imovel,
    valoraluguel: imovel.valoraluguel,
    baixa_imovel: imovel.baixa_imovel,
    data_compra: imovel.data_compra,
    data_baixa: imovel.data_baixa
  });

  const selecionarImmobile = (elemento, caso) => {
    setImmobileData(elemento);
    caso === 'Editar' ? setModalEditar(true) : setModalExcluir(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setImmobileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const Editar = e => {
    e.preventDefault();
    console.log(imovel, 'gfgfgfg');
    fetch(variables.api + `/imoveis/${imovel.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(immobileData)
    })
      .then(response => response.json())
      .then(response => {
        setModalEditar(false);
        getImoveis();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const Excluir = e => {
    e.preventDefault();

    fetch(variables.api + `/imoveis/${imovel.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(imovel)
    })
      .then(response => response.json())
      .then(response => {
        setModalExcluir(false);
        getImoveis();
      })
      .catch(err => {
        // console.log(err);
      });
  };

  const abrirModalVisualizar = () => {
    setModalVisualizar(true);
  };

  const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
  console.log(new Intl.DateTimeFormat('pt-BR').format(date));

  return (
    <>
      <div key={imovel.id} className="immobile-box">
        <img src={Image} alt="" />

        <div className="text-box break">
          <label className="label-box">{imovel.descricao}</label>
          <h3>{imovel.endereco}</h3>
          <h3>
            {imovel.cidade} - {imovel.estado}
          </h3>
        </div>

        <div className="users-buttons">
          <div className="edit">
            <button
              title="Editar"
              className="buttonEdit"
              type="submit"
              onClick={() => selecionarImmobile(imovel, 'Editar')}
            >
              <MdIcons.MdEdit className="IconEdit" />
            </button>
          </div>
          <div className="trash">
            <button
              title="Excluir"
              className="buttonTrash"
              type="submit"
              onClick={() => selecionarImmobile(imovel, 'Excluir')}
            >
              <MdIcons.MdDelete style={{ fontSize: 25, color: '#fff' }} />
            </button>
          </div>
          <div className="more">
            <button
              title="Ver mais"
              className="buttonMore"
              onClick={() => abrirModalVisualizar()}
            >
              <IoIcons.IoMdAdd style={{ color: '#fff', fontSize: 30 }} />
            </button>
          </div>
        </div>
      </div>

      <Modal scrollable={true} isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>EDITAR</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={Editar}>
            <div className="form-group">
              <label>Descri????o do Im??vel</label>
              <Input
                width="100%"
                height="42px"
                padding="5px 10px"
                margin="0px 0px 10px 0px"
                name="descricao"
                type="text"
                defaultValue={imovel && imovel.descricao}
                onChange={handleChange}
              />
              <label style={{ width: '47%' }}>Endere??o do Im??vel</label>
              <Input
                style={{ outline: 'none' }}
                width="100%"
                height="42px"
                padding="5px 10px"
                margin="0px 0px 10px 0px"
                name="endereco"
                type="text"
                placeholder="Endere??o Im??vel"
                defaultValue={imovel && imovel.endereco}
                onChange={handleChange}
              />
              <label style={{ width: '47%' }}>
                Cidade
                <Input
                  style={{ outline: 'none' }}
                  width="100%"
                  height="42px"
                  padding="5px 10px"
                  margin="0px 26px 10px 0px"
                  name="cidade"
                  type="text"
                  placeholder="Cidade"
                  defaultValue={imovel && imovel.cidade}
                  onChange={handleChange}
                />
              </label>
              <label style={{ width: '47%', marginLeft: '26px' }}>
                Estado
                <Input
                  style={{ outline: 'none' }}
                  width="100%"
                  height="42px"
                  padding="5px 10px"
                  margin="0px"
                  name="estado"
                  type="text"
                  placeholder="Estado"
                  defaultValue={imovel && imovel.estado}
                  onChange={handleChange}
                />
              </label>
              <label style={{ width: '47%' }}>
                Aluguel do Im??vel
                <CurrencyInput
                  className="inputCurrency"
                  name="valoraluguel"
                  type="text"
                  placeholder="Valor do aluguel"
                  defaultValue={imovel && imovel.valoraluguel}
                  onChange={handleChange}
                />
              </label>
              <label style={{ width: '47%', marginLeft: '26px' }}>
                Valor da compra
                <CurrencyInput
                  className="inputCurrency"
                  name="valor_imovel"
                  type="text"
                  placeholder="Valor da Compra"
                  defaultValue={imovel && imovel.valor_imovel}
                  onChange={handleChange}
                />
              </label>

              <div>
                <label style={{ width: '30%' }}>
                  Quartos
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 22px 10px 0px"
                    name="quartos"
                    type="text"
                    placeholder="Quartos"
                    defaultValue={imovel && imovel.quartos}
                    onChange={handleChange}
                  />
                </label>
                <label style={{ width: '30%', marginLeft: '22px' }}>
                  Su??tes
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 22px 10px 0px"
                    name="suites"
                    type="text"
                    placeholder="Su??tes"
                    defaultValue={imovel && imovel.suites}
                    onChange={handleChange}
                  />
                </label>
                <label style={{ width: '30%', marginLeft: '22px' }}>
                  Garagens
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="garagem"
                    type="text"
                    placeholder="Garagem"
                    defaultValue={imovel && imovel.garagem}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div>
                <label style={{ width: '30%' }}>
                  Banheiros
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 22px 10px 0px"
                    name="banheiros"
                    type="text"
                    placeholder="Banheiros"
                    defaultValue={imovel && imovel.banheiros}
                    onChange={handleChange}
                  />
                </label>
                <label style={{ width: '30%', marginLeft: '22px' }}>
                  {' '}
                  Sala de estar
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 22px 10px 0px"
                    name="sala_estar"
                    type="text"
                    placeholder="Sala de Estar"
                    defaultValue={imovel && imovel.sala_estar}
                    onChange={handleChange}
                  />
                </label>
                <label style={{ width: '30%', marginLeft: '22px' }}>
                  Area
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="area_servico"
                    type="text"
                    placeholder="??rea de Servi??o"
                    defaultValue={imovel && imovel.area_servico}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <label style={{ width: '47%' }}>
                Tipo de Im??vel
                <Select
                  style={{ outline: 'none' }}
                  width="100%"
                  height="42px"
                  padding="5px 10px"
                  margin="0px 0px 10px 0px"
                  name="id_tipoimovel"
                  type="text"
                  defaultValue={imovel && imovel.id_tipoimovel}
                  onChange={handleChange}
                >
                  {tipoImovel.map(tipo => (
                    <option value={tipo.id} key={tipo.id}>
                      {tipo.descricao}
                    </option>
                  ))}
                </Select>
              </label>

              <label style={{ width: '47%', marginLeft: '26px' }}>
                Tipo de Compra
                <Select
                  style={{ outline: 'none' }}
                  width="100%"
                  height="42px"
                  padding="5px 10px"
                  margin="0px 0px 10px 0px"
                  name="id_tipocompra"
                  type="text"
                  defaultValue={imovel && imovel.id_tipocompra}
                  onChange={handleChange}
                >
                  {tipoCompra.map(tipo => (
                    <option value={tipo.id} key={tipo.id}>
                      {tipo.descricao}
                    </option>
                  ))}
                </Select>
              </label>

              <div>
                <label style={{ width: '47%' }}>
                  Status
                  <Select
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="status"
                    type="text"
                  >
                    <option value="1">Dispon??vel</option>
                    <option value="2">Alugado</option>
                    <option value="3">Em Manuten????o</option>
                  </Select>
                </label>

                <label style={{ width: '47%', marginLeft: '26px' }}>
                  {' '}
                  Metros
                  <Input
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="metros"
                    type="text"
                    placeholder="Metros??"
                    defaultValue={imovel && imovel.metros}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <Grid container spacing={3} className="grid">
                <Grid item xs={6} className="gridF">
                  <label>Data da Compra:</label>
                  <TextField
                    className="date-add"
                    variant="outlined"
                    id="date"
                    type="date"
                    name="data_compra"
                    defaultValue="yyyy-MM-dd"
                    Value={imovel && imovel.data_compra}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid
                  style={{ marginBottom: '20px' }}
                  item
                  xs={6}
                  className="gridF"
                >
                  <label>Data da Venda:</label>
                  <TextField
                    className="date-add"
                    variant="outlined"
                    id="date"
                    type="date"
                    defaultValue="yyyy-MM-dd"
                    Value={imovel && imovel.data_compra}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <label> Observa????es </label>
              <TextArea
                style={{ outline: 'none' }}
                width="100%"
                height="100px"
                padding="5px 10px"
                margin="0px 0px 10px 0px"
                name="observacoes"
                type="text"
                placeholder="Observa????es"
                defaultValue={imovel && imovel.observacoes}
                onChange={handleChange}
              />
              <label> Motivo da Venda </label>
              <TextArea
                style={{ outline: 'none' }}
                width="100%"
                height="100px"
                padding="5px 10px"
                margin="0px 0px 10px 0px"
                name="motivo_baixa"
                type="text"
                placeholder="Motivo Venda"
                defaultValue={imovel && imovel.motivo_baixa}
                onChange={handleChange}
              />
            </div>
          </Form>
          <div className="btnModalEdit">
            <button
              className="btn btn-primary btn-att"
              type="submit"
              onClick={e => Editar(e)}
            >
              Atualizar
            </button>
            <button
              className="btn btn-danger btn-cancel"
              onClick={() => setModalEditar(false)}
            >
              Cancelar
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalExcluir}>
        <ModalBody className="modal-message-delete">
          Tem certeza que deseja excluir esse Im??vel ?
        </ModalBody>
        <ModalFooter className="modal-message-delete">
          <button
            type="submit"
            className="btn btnModalimmobile btn-danger yes-modal-delete"
            onClick={e => Excluir(e)}
          >
            SIM
          </button>
          <button
            className="btn btnModalImmobile btn-secondary no-modal-delete"
            onClick={() => setModalExcluir(false)}
          >
            N??O
          </button>
        </ModalFooter>
      </Modal>
      <Modal
        className="modalPropertiesView"
        scrollable={true}
        isOpen={modalVisualizar}
      >
        <ModalHeader className="headerModalVisualizar">
          <div className="modalHeader">
            <div>
              <h3>Dados do Im??vel</h3>
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
            <span>Descri????o do Im??vel:</span>
            <hr></hr>
            <label>{imovel.descricao}</label>

            <span>Endere??o:</span>
            <hr></hr>
            <label>{imovel.endereco}</label>

            <span>Cidade:</span>
            <hr></hr>
            <label>{imovel.cidade}</label>

            <span>Estado:</span>
            <hr></hr>
            <label>{imovel.estado}</label>

            <span>Valor do Aluguel:</span>
            <hr></hr>
            <label>{imovel.valoraluguel}</label>

            <span>Valor Compra:</span>
            <hr></hr>
            <label>{imovel.valor_imovel}</label>

            <span>Observa????es:</span>
            <hr></hr>
            <label>{imovel.observacoes}</label>

            <span>Motivo da baixa:</span>
            <hr></hr>
            <label>{imovel.motivo_baixa}</label>

            <span>Metros??</span>
            <hr></hr>
            <label>{imovel.metros}</label>
            <span>Data da Compra</span>
            <hr></hr>
            <label>{imovel.data_compra}</label>

            <span>Data da Venda</span>
            <hr></hr>
            <label>{imovel.data_baixa}</label>

            <div className="comodosImmobile">
              <div>
                <span>C??modos</span>
                <hr></hr>
              </div>
              <div className="comodos1 ">
                <label>Quartos: {imovel.quartos}</label>
                <label>Suites: {imovel.suites}</label>
                <label>Banheiros: {imovel.banheiros}</label>
              </div>
              <div className="comodos2">
                <label>Ar??a de Servi??o: {imovel.area_servico}</label>
                <label>Garagens: {imovel.garagem}</label>
                <label>Sala de Estar: {imovel.sala_estar}</label>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

// descricao: '',
//     endereco: '',
//     cidade: '',
//     estado: '',
//     area_servico: '',
//     id_tipoimovel: '',
//     id_tipocompra: '',
//     banheiros: '',
//     garagem: '',
//     metros: '',
//     motivo_baixa: '',
//     observacoes: '',
//     quartos: '',
//     sala_estar: '',
//     suites: '',
//     valor_imovel: '',
//     valoraluguel: '',
//     baixa_imovel: '',
//     data_compra: ''
