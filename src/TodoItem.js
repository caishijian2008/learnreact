import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
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
}

TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.number, PropTypes.string),
  removeItem: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = {
  test: 'hello world'
}

export default TodoItem;
