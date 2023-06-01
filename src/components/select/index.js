import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}
            style={{width: `${props.width}px`|| 'auto'}}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  width:PropTypes.number,
};

Select.defaultProps = {
  onChange: () => {}
}

export default memo(Select);
