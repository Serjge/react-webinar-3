import propTypes from "prop-types";
import React, {useCallback, useEffect, useRef} from "react";
import {
  shallowEqual, useDispatch,
  useSelector as useSelectorRedux,
} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import LoginComments from "src/components/comments/login-comment";
import Level from "src/components/level";
import TextEditor from "src/components/text-editor";
import commentsActions from "src/store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";

function ProtectedComments({redirect, id}) {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    textEditorId: state.comments.textEditorId,
    textEditorLevel: state.comments.textEditorLevel,
    commentId: state.comments.commentId,
  }), shallowEqual);

  const _type = selectRedux.article._id === id ? 'article' : 'comment';

  useEffect(()=>{
   ref.current?.scrollIntoView(false)
  },[selectRedux.textEditorId])

  const callbacks = {
    onNavigate: useCallback(() => {
      navigate(redirect, {state: {back: location.pathname}});
    }, []),
    onBack: useCallback(() => dispatch(commentsActions.setEditor(selectRedux.article._id)), []),
    setText: useCallback((text) => dispatch(commentsActions.addComment(selectRedux.commentId, text, _type)), [selectRedux.commentId, _type]),
  };

  const level = _type === 'article' ? 0 : selectRedux.textEditorLevel + 1

  if (!select.exists && !select.waiting && selectRedux.textEditorId === id) {
    if (_type === 'article') {
      return (
        <div ref={ref}>
          <Level level={level}>
            <LoginComments text={' чтобы иметь возможность комментировать'}
                           onNavigate={callbacks.onNavigate}/>
          </Level>
        </div>
      )}

    if (_type === 'comment') {
      return (
        <div ref={ref}>
          <Level level={level}>
            <LoginComments text={' чтобы иметь возможность ответить. '}
                           onNavigate={callbacks.onNavigate}
                           onBack={callbacks.onBack}/>
          </Level>
        </div>
      )}
  }

  if (id === selectRedux.textEditorId && select.exists) {
    if (_type === 'article') {
      return (
        <div ref={ref}>
          <Level level={level}>
            <TextEditor onChange={callbacks.setText}/>
          </Level>
        </div>
      )}

    return (
      <div ref={ref}>
        <Level level={level}>
          <TextEditor onChange={callbacks.setText} onBack={callbacks.onBack}/>
        </Level>
      </div>
    )}

  return null;
}

ProtectedComments.propTypes = {
  redirect: propTypes.string,
  id: propTypes.string,
};

export default React.memo(ProtectedComments);
