import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function LayoutModal({title, onClose, children}) {

  const onStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='LayoutModal-modal' onClick={onClose}>
      <div className='LayoutModal-content' onClick={onStopPropagation}>
        <div className='LayoutModal-head'>
          <h2 className='LayoutModal-title'>{title}</h2>
          <button className='LayoutModal-buttonClose' onClick={onClose}>
            Закрыть
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default React.memo(LayoutModal);
