import {cn as bem} from '@bem-react/classname';
import PropsType from 'prop-types';
import React from 'react';
import './style.css';

function ProfileUser({user, t}) {

  const cn = bem('ProfileUser');

  return (
    <div className={cn()}>
      <h2>{t('profile.title')}</h2>
      <p className={cn('description')}>{t('profile.name')}: <span>{user?.username}</span></p>
      <p className={cn('description')}>{t('profile.phone')}: <span>{user.profile?.phone}</span></p>
      <p className={cn('description')}>email: <span>{user?.email}</span></p>
    </div>
  )
}

ProfileUser.propTypes = {
  user: PropsType.object.isRequired,
  t: PropsType.func,
};

ProfileUser.defaultProps = {
  user: {},
};

export default React.memo(ProfileUser);
