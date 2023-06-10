import listToTreeComments from "src/utils/list-to-tree-comments";
import treeToList from "src/utils/tree-to-list";



export default {
  /**
   * Сохранение позиции редактора
   * @param _id
   * @return {Function}
   */
  setEditor: (_id) => {
    return (dispatch) => {

      dispatch({type: 'comments/set-text-editor', payload: {data: _id}});
    }
  },

  /**
   * Загрузка коментариев
   * @param _id
   * @return {Function}
   */
  loadComments: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent(_type,_id),author(profile(name),_id)&limit=*`});

        const comments = [...treeToList(
          listToTreeComments(json.data.result.items, _id),
          (item, level) => ({
            id: item._id,
            author: item.author.profile.name,
            authorId: item.author._id,
            level,
            text: item.text,
            dateCreate: item.dateCreate,
            textEditor: false,
          })
        )]

        dispatch({type: 'comments/load-success', payload: {data: comments}});

      } catch (e) {
        console.log(e)
      }
    }
  },

  /**
   * Создание коментария
   * @param _id
   * @param text
   * @param _type
   * @return {Function}
   */


  addComment: (_id, text, _type) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})
      const body = JSON.stringify({parent: {_id, _type}, text})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body
        });
        console.log(json)

        // Товар загружен успешно
        dispatch({type: 'comments/add-success'});

      } catch (e) {
      }
    }
  },
}
