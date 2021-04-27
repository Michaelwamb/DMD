import React, { useState } from 'react';
import Modal from 'react-modal'
import * as BsIcons from 'react-icons/bs'

function Register() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalBody = (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-header">
          <button id="closeModal" onClick={() => setModalIsOpen(false)}>
            <BsIcons.BsX style={{ fontSize: 47, color: 'black' }} />
          </button>
        </div>
        <div className="edit-form">
          <form>
            <div>
              <label>Hello</label>
              <input>
              </input>
            </div>

          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Limpar</button>
          <button type="button" className="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="trash">
      <button onClick={() => setModalIsOpen(true)}>button</button>
        <BsIcons.BsTrash style={{ fontSize: 27, color: 'white' }} />
        <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        >
          {modalBody}
          <div>
            <button onClick={() => setModalIsOpen(false)}>close</button>
          </div>
        </Modal>
      
    </div>
  );
}

export default Register;
