import React, { Component, Fragment } from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }
  render() {
    return (
      <Fragment>
        <div>
          {/*此处是注释*/}
          {/* label 的for属性被htmlFor替代了 */}
          <label htmlFor="insertArea">输入内容</label>
          <input  
            type="text" 
            id="insertArea"
            className='input' 
            value={this.state.inputValue}
            onChange={this.handleInputChange}/>
          <button onClick={this.handleButtonClick}>提交</button>
        </div>
        <ul>
          { this.getTodoItem() }
          {
            /* 使用 dangerouslySetInnerHTML 属性时可以不转义html标签，有被XSS攻击危险
            <li 
              key={index} 
              onClick={this.handleItemDelete.bind(this, index)}
              dangerouslySetInnerHTML={{__html: item}}>
            </li>
            */
          }
        </ul>
      </Fragment>
    )
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          {/* 父传子(属性传值)，子传父（父方法传给子，子调用父方法） */}
          <TodoItem 
            content={item} 
            index={index}
            removeItem = {this.handleItemDelete}  // bind：强制指定this的指向
          />
          {
            /*<li 
            key={index} 
            onClick={this.handleItemDelete.bind(this, index)}>
            {item}
          </li>*/
          }
        </div>
      )
    })
  }

  handleInputChange(e) {
    // 改写前：
    // this.setState({
    //   inputValue: e.target.value
    // });

    // 改写后的异步写法：
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
  }

  handleButtonClick() {
    // 改写前：
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''  // 清空输入框内容
    // })

    // 改写后：
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
  }

  handleItemDelete(index) {
    // immutable：
    // state 不允许直接做任何的改变，即
    // this.state.list.splice(index,1)是不被允许的
    // 改写前：
    // const list = [...this.state.list];  // 拷贝list副本
    // list.splice(index, 1);  // 删除一项
    // this.setState({
    //   list  // 等价于 list: list， es6语法
    // });

    // 改写后：
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list }
    })
  }
}
