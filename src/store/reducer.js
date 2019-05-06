const defaultState = {
  inputValue: 'aaf',
  list: [1,2]
};

// 限制：reducer 可以接收state，但是绝不能修改state
export default (state = defaultState, action) => {
  if(action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));  // 深拷贝
    newState.inputValue = action.value;
    return newState;  // 固定写法
  }
  if(action.type === 'add_todo_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  // console.log(state, action);
  return state;
}  
