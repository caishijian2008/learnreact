import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
// import Test from './Test'
import './TodoList.css'

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    // 当组件的state或者props发生改变时，render函数就会重新执行
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }
  
  // 在组件即将被挂载到页面的时刻自动执行
  componentWillMount() {
    console.log('componentWillMount');
  }

  render() {
    console.log('parent render');
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
            onChange={this.handleInputChange}
            ref={(inputEle) => {this.input = inputEle}}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul ref={(ul) => {this.ul = ul}}>
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
        {/*<Test content={this.state.inputValue}/>*/}
      </Fragment>
    )
  }

  // 组件被挂载到页面之后，自动被执行
  componentDidMount() {
    console.log('componentDidMount');
  }

  // 组件被更新之前，它会自动被执行
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  // 组件被更新之前，它会自动执行，但是它在shouldComponentUpdate之后执行，
  // 如果shouldComponentUpdate返回true它才会执行
  // 如果返回false，这个函数就不会执行后续生命周期函数了
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  // 组件更新完成之后，它会被执行
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          {/* 父传子(属性传值)，子传父（父方法传给子，子调用父方法） */}
          <TodoItem 
            index={item}
            content={item} 
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
    // const value = e.target.value;
    const value = this.input.value;  // 采用ref，不建议！动画可用
    this.setState(() => ({
      inputValue: value
    }));
  }

  handleBtnClick() {
    // 改写前：
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''  // 清空输入框内容
    // })

    // 改写后：
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }), () => { // 获取DOM
      console.log(this.ul.querySelectorAll('div').length)
    });
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
