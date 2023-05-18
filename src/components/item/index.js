import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import {numberFormat} from "src/utils";

function Item({item, titleButton, onButton}){

  const callbacks = {
    onButton: useCallback(() => {
      onButton(item.code)
    }, [onButton, item.code])
  };

  return (
    <div className='Item'>
      <div className='Item-code'>
        {item.code}
      </div>

      <div className='Item-title'>
        <p>{item.title}</p>
        <p>{numberFormat(item.price)}</p>
      </div>

      {item.count && <div className='Item-amount'>{item.count} шт.</div>}

      <div className='Item-actions'>
        <button className='Item-button' onClick={callbacks.onButton}>
          {titleButton}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onButton: PropTypes.func.isRequired,
  titleButton: PropTypes.string.isRequired,
};

export default React.memo(Item);
