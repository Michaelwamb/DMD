import React from 'react';
import './style.css';
import { Table } from 'reactstrap';


export const UserTable = () => {
    return (
      <Table white className="table-dash">
        <thead>
          <tr>
            <th>Imóvel</th>
            <th>Locatário</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="td-name radius">Casa</td>
            <td className="border-bottom">Maicon</td>
            <td className="border-bottom radius2">20/03/2021</td>
          </tr>
          <tr>
            <td className="border-bottom radius">Apartamento</td>
            <td className="border-bottom">João</td>
            <td className="border-bottom radius2">20/03/2021</td>
          </tr>
          <tr>
            <td className="radius">Casa</td>
            <td>Lucas</td>
            <td className="radius2">20/03/2021</td>
          </tr>
        </tbody>
      </Table>
    );
}