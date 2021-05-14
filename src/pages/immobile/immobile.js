/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import './immobile.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../../Menu/Menu';
import Navbar from '../../components/Navbar';
import ReactPaginate from 'react-paginate';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import variables from '../../variables';
import Input from '../../components/Input';
import Select from '../../components/Select/Select';
import TextArea from '../../components/TextArea/TextArea';
import CurrencyInput from '../../currency/CurrencyInput';

import Imoveis from '../../components/Immobile/index';
import { lower } from './lower';

import { Form } from '@unform/web';
import ImmobileContext from '../../contexts/ImmobileContext';

const Immobile = props => {
  // const formRef = useRef(null);

  const token = sessionStorage.getItem('@T_A');

  const [users, setUsers] = useState([]);

  const [modalAdd, setModalAdd] = useState(false);
  const [tipoImovel, setTipoImovel] = useState([]);
  const [tipoCompra, setTipoCompra] = useState([]);

  const [immobileName, setImmobileName] = useState('');
  const [immobileCidade, setImmobileCidade] = useState('');
  const [immobileEstado, setImmobileEstado] = useState('');

  function searchChange(func) {
    return e => {
      func(e.target.value);
    };
  }

  let newDate = new Date();

  //format according to the computer's default locale
  Intl.DateTimeFormat().format(newDate);
  console.log(newDate);

  const [immobile, setImmobile] = useState({
    descricao: '',
    endereco: '',
    cidade: '',
    estado: '',
    area_servico: '',
    id_tipoimovel: '',
    id_tipocompra: '',
    banheiros: '',
    garagem: '',
    metros: '',
    motivo_baixa: '',
    observacoes: '',
    quartos: '',
    sala_estar: '',
    suites: '',
    valor_imovel: '',
    valoraluguel: '',
    baixa_imovel: '',
    data_compra: '',
    data_baixa: ''
  });

  // acumulador é a variável que mantem o valor da soma dos seus items, que neste caso começa de 0 e a cada iteração é somado o valor o objeto atual
  // const result = immobile.reduce(function (acumulador, objetoAtual) {
  //   return acumulador + objetoAtual.valoraluguel;
  // }, 0);

  // console.log(result);

  useEffect(() => {
    getImoveis();
    getTipoImovel();
    getTipoCompra();
  }, []);

  const abrirModalAdd = () => {
    setImmobile(null);
    setModalAdd(true);
  };

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  const getImoveis = () => {
    fetch(variables.api + '/imoveis', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setUsers(response);
      })
      .catch(err => {});
  };

  const getTipoImovel = () => {
    fetch(variables.api + '/tipoimoveis', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setTipoImovel(response);
      })
      .catch(err => {});
  };

  const getTipoCompra = () => {
    fetch(variables.api + '/tipocompra', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setTipoCompra(response);
      })
      .catch(err => {});
  };

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter(
      value =>
        lower(value.descricao).includes(lower(immobileName)) &&
        lower(value.cidade).includes(lower(immobileCidade)) &&
        lower(value.estado).includes(lower(immobileEstado))
    )
    .map(index => {
      return (
        <ImmobileContext.Provider
          key={Imoveis.id}
          value={{ getImoveis, tipoCompra, tipoImovel }}
        >
          <Imoveis imovel={index} />
        </ImmobileContext.Provider>
      );
    });
  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const Add = e => {
    fetch(variables.api + '/imoveis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(immobile)
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setModalAdd(false);
        getImoveis();
      })
      .catch(err => {
        // console.log(err);
      });
  };

  // const filtroTeclas = function (event) {
  //   return (
  //     (event.charCode >= 48 && event.charCode <= 57) ||
  //     event.keyCode == 45 ||
  //     event.charCode == 46
  //   );
  // };

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
                    value={immobileName}
                    onChange={searchChange(setImmobileName)}
                    className="fa fa-search txtbusca outline-none"
                    placeholder="Nome do Imóvel"
                  ></input>
                </div>
              </div>
              <div className="input-block" id="cidade">
                <input
                  placeholder="Cidade..."
                  className="outline-none txtbusca"
                  value={immobileCidade}
                  onChange={searchChange(setImmobileCidade)}
                ></input>
              </div>

              <div className="input-block" id="estado">
                <input
                  className="txtbusca outline-none"
                  placeholder="Estado..."
                  value={immobileEstado}
                  onChange={searchChange(setImmobileEstado)}
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
                    shrink: true
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
                    shrink: true
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
            {displayUsers}
            {/* {data.map(index => (
            ))} */}
          </div>
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
                <h3>Novo Imóvel</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <Form id="fImovel" onSubmit={Add}>
                  <label>Descrição do Imóvel</label>
                  <Input
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="descricao"
                    type="text"
                    onChange={value =>
                      setImmobile({
                        ...immobile,
                        descricao: value.nativeEvent.target.value
                      })
                    }
                  />
                  <label style={{ width: '47%' }}>Endereço do Imóvel</label>
                  <Input
                    onChange={value =>
                      setImmobile({
                        ...immobile,
                        endereco: value.nativeEvent.target.value
                      })
                    }
                    style={{ outline: 'none' }}
                    width="100%"
                    height="42px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="endereco"
                    type="text"
                    placeholder="Endereço Imóvel"
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
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          cidade: value.nativeEvent.target.value
                        })
                      }
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
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          estado: value.nativeEvent.target.value
                        })
                      }
                    />
                  </label>
                  <label style={{ width: '47%' }}>
                    Aluguel do Imóvel
                    <CurrencyInput
                      className="inputCurrency"
                      name="valoraluguel"
                      type="text"
                      placeholder="R$ 0.00"
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          valoraluguel: value.nativeEvent.target.value
                        })
                      }
                    />
                  </label>
                  <label style={{ width: '47%', marginLeft: '26px' }}>
                    Valor da compra
                    <CurrencyInput
                      className="inputCurrency"
                      name="valor_imovel"
                      type="text"
                      placeholder="R$ 0.00"
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          valor_imovel: value.nativeEvent.target.value
                        })
                      }
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
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            quartos: value.nativeEvent.target.value
                          })
                        }
                      />
                    </label>
                    <label style={{ width: '30%', marginLeft: '22px' }}>
                      Suítes
                      <Input
                        style={{ outline: 'none' }}
                        width="100%"
                        height="42px"
                        padding="5px 10px"
                        margin="0px 22px 10px 0px"
                        name="suites"
                        type="text"
                        placeholder="Suítes"
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            suites: value.nativeEvent.target.value
                          })
                        }
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
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            garagem: value.nativeEvent.target.value
                          })
                        }
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
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            banheiros: value.nativeEvent.target.value
                          })
                        }
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
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            sala_estar: value.nativeEvent.target.value
                          })
                        }
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
                        placeholder="Área de Serviço"
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            area_servico: value.nativeEvent.target.value
                          })
                        }
                      />
                    </label>
                  </div>
                  <label style={{ width: '47%' }}>
                    Tipo de Imóvel
                    <Select
                      style={{ outline: 'none' }}
                      width="100%"
                      height="42px"
                      padding="5px 10px"
                      margin="0px 0px 10px 0px"
                      name="id_tipoimovel"
                      type="text"
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          id_tipoimovel: value.nativeEvent.target.value
                        })
                      }
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
                      onChange={value =>
                        setImmobile({
                          ...immobile,
                          id_tipocompra: value.nativeEvent.target.value
                        })
                      }
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
                        <option value="1">Disponível</option>
                        <option value="2">Alugado</option>
                        <option value="3">Em Manutenção</option>
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
                        placeholder="Metros²"
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            metros: value.nativeEvent.target.value
                          })
                        }
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
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            data_compra: value.nativeEvent.target.value
                          })
                        }
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
                        defaultValue="dd/mm/yyyy"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={value =>
                          setImmobile({
                            ...immobile,
                            data_baixa: value.nativeEvent.target.value
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <label> Observações </label>
                  <TextArea
                    style={{ outline: 'none' }}
                    width="100%"
                    height="100px"
                    padding="5px 10px"
                    margin="0px 0px 10px 0px"
                    name="observacoes"
                    type="text"
                    placeholder="Observações"
                    onChange={value =>
                      setImmobile({
                        ...immobile,
                        observacoes: value.nativeEvent.target.value
                      })
                    }
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
                    onChange={value =>
                      setImmobile({
                        ...immobile,
                        motivo_baixa: value.nativeEvent.target.value
                      })
                    }
                  />
                  <div className="buttonsModalImmobile">
                    <button
                      className="btn btnModalImmobile btn-primary btn-add-users"
                      type="submit"
                      // onClick={() => Add()}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn btnModalImmobile btn-danger btn-cancel-users"
                      onClick={() => setModalAdd(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Form>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Immobile;
