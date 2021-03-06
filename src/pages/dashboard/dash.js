import React, { useState, useMemo } from 'react';
import './dash.css';
import Sidebar from '../../Menu/Menu';
import Navbar from '../../components/Navbar';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Navbar from '../../components/Navbar'

import { UserTable } from '../../components/TableDash/Table';

function Dash() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Fruits = [
    { name: 'banana', cor: 'yellow', price: 287 },
    { name: 'cherry', cor: 'red', price: 3 }
  ];

  const total = useMemo(
    () => Fruits.reduce((a, b) => a + b.price, 0),
    [Fruits]
  );
  console.log(total);

  return (
    <>
      <Sidebar />
      <div className="Navbar-dash">
        <Navbar title="Painel de Controle" />
      </div>
      <main className="main-dash">
        <div className="card-dash">
          <div className="space-card">
            <div className="card-info total-immobile">
              <div className="text-info">
                <h1 style={{ fontSize: '16px' }}>Total de Imóveis</h1>
              </div>
              <div className="value-info">
                <h1>10</h1>
              </div>
            </div>
            <div className="card-info card-rented">
              <div className="text-info">
                <h1 style={{ fontSize: '14px' }}>Total de Imóveis alugados</h1>
              </div>
              <div className="value-info">
                <h1>10</h1>
              </div>
            </div>
            <div className="card-info rent-total">
              <div className="text-info">
                <h1 style={{ fontSize: '16px', color: 'white' }}>
                  Aluguel Mensal
                </h1>
              </div>
              <div className="value-info">
                <h1 style={{ color: 'white' }}>R$ {total} </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="text-ultima">
          <h1 className="h1-ultima">Últimas Locações</h1>
        </div>
        <div className="table-dash">
          <UserTable />
        </div>
      </main>
    </>
  );
}

export default Dash;
