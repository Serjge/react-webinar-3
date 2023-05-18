import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, titleButton, onButton}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} titleButton={titleButton} onButton={onButton}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  onButton: PropTypes.func.isRequired,
  titleButton: PropTypes.string,
};

List.defaultProps = {
  list: [],
  onButton: () => {},
}

export default React.memo(List);
