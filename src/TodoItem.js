import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    console.log('child render');
    // {this.props.content} 等价于：
    const { content, test } = this.props;
    return (
      <div onClick={this.handleClick}>
        {/*{this.props.content}*/}
        {content} - {test}
      </div>
    )
  }

  handleClick () {  // 子组件调用父组件的方法(子传父)
    // this.props.removeItem(this.props.index) 等价于：
    const {removeItem, index} = this.props;
    removeItem(index);
  }

  // 一个组件要从父组件接收参数。
  // 只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行，即：
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps');
  }

  // 当这个组件即将被从页面中剔除的时候，会被执行
  componentWillUnmount() {
    console.log('child componentWillUnmount');
  }
}

TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  removeItem: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = {
  test: 'hello world'
}

export default TodoItem;
