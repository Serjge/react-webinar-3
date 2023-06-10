const initialState = {
  data: [],
  waiting: false,
  rerender: false,
  textEditorLevel: 0,
  textEditorId: null,
  commentId: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/load":
      return {...state, waiting: true, rerender: false};

    case "comments/set-text-editor":
      return {...state, textEditorId: action.payload.textEditorId,
        textEditorLevel: action.payload.level,
        commentId: action.payload.commentId,
        waiting: false};

    case "comments/load-success":
      return {...state, data: action.payload.data};

    case "comments/add-success": {
      const {comment} = action.payload
      const copyState = { ...state };
      const indexComment = state.data.findIndex(id=> id.id === state.textEditorId)

      const newComment = {
        id: comment._id,
        author: comment.author.profile.name,
        authorId: comment.author._id,
        level: state.textEditorLevel < 10 ? state.textEditorLevel + 1 : 10,
        text: comment.text,
        dateCreate: comment.dateCreate,
        children: [],
      }

      copyState.data.splice(indexComment + 1, 0, newComment)
      copyState.data.map((item)=>item.id === state.commentId?  item.children.push(comment) : item )
      return {...copyState, waiting: false};
    }

    default:
      // Нет изменений
      return state;
  }
}
