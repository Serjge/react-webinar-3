import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import Level from "src/components/level";
import treeToList from "src/utils/tree-to-list";

function Comment({comment, setEditor, textEditor, isActiveAuthor}) {
  const {dateCreate, level, author, text, id} = comment;
  const cn = bem('Comment');

  const dateConvert = new Date(dateCreate)
  const date = dateConvert.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = dateConvert.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const lastComment = treeToList(comment.children)
  const textEditorId = lastComment.length !==0 ? lastComment[lastComment.length -1]._id : comment.id

  const callbacks = {
    setEditor: useCallback(() => setEditor(textEditorId, comment.level, comment.id), [])
  };

  return (
    <Level level={level}>
      <div className={cn('container')}>

        <p className={cn('author', {active: isActiveAuthor})}>{author}</p>
        <p className={cn('data')}>{date} в {time}</p>

      </div>
      <p className={cn('text')}>{text}</p>
      {id === textEditor ? null :
        <div onClick={callbacks.setEditor} className={cn('answer')}>Ответить</div>}
    </Level>
  );
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  setEditor: propTypes.func.isRequired,
  textEditor: propTypes.string.isRequired,
  isActiveAuthor: propTypes.bool,
}

Comment.defaultProps = {
  comment: {},
}

export default React.memo(Comment);
