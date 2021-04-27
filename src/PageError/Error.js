import React from 'react'
import NotFound from '../assets/notfound.gif';
import './Error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="body-error">
            <img src={NotFound} alt="assaas" />
            <Link className="link-redirect" to="/login">Voltar</Link>
        </div>
    )
}

export default Error;
