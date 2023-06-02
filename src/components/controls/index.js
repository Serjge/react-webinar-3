import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {Link} from "react-router-dom";

function Controls({isLogin, onLogout, onLogin, userName, link}){

  const cn = bem('Controls');

  if(!isLogin) {
    return  (
      <div className={cn()}>
        <button onClick={onLogin}>Войти</button>
      </div>
    )
  }

  return (
    <div className={cn()}>
      {link ? <Link className={cn('link')} to={link}>{userName}</Link> : null}
      <button className={cn('button')} onClick={onLogout}>Выйти</button>
    </div>
  )
}

Controls.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onProfile: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  userName: PropTypes.string,
  link: PropTypes.string,
}

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
