import React from 'react';
import propTypes from 'prop-types';

function Level({level, children}) {

  return (
    <div style={{paddingLeft: level < 10 ?`${String(level * 30)}px` : `${String(10 * 30)}px`}}>
      {children}
    </div>
  );
}

Level.propTypes = {
  level: propTypes.number,
  children: propTypes.node,
}

Level.defaultProps = {
  level: 0,
}

export default React.memo(Level);
