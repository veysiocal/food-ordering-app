import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Tekrar Dene</Button>}
      style={{height:'40%'}}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
