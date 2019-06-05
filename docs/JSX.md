# React代码规范
## Basic Rules(基本原则)
每个文件中只包含一个React组件。

尽可能地使用JSX语法。

除非不用JSX语法创建一个应用，否则不要使用React.createElement方法。

每个文件只包含一个React组件 （联系紧密的组件可以使用{命名空的形式}）；

始终使用JSX语法，不要使用 React.creatElement 创建 ReactElement, 以提高编写速度、可读性、可维护性（没有 JSX 转换的特殊场景例外，如在 console 中测试组件）；

使用 ES6 .

命名规范

扩展名：使用 .js 作为 React 组件的扩展名；

文件名： 使用大驼峰命名法， 如 MyComponent.js ；

组件命名：组件名称和文件名一致，如MyComponent.js里的组件名应该是MyComponent；一个目录的根组件使用index.js命名，以目录名称作为组件名称；

引用命名：React 组件使用大驼峰命名法， HTML标签、组件使用小驼峰命名法



带命名空间的组件

如果一个组件有许多关联子组件，可以以该组件作为命名空间编写、调用子组件。

varMyFormComponent=React.createClass({...});MyFormComponent.Row=React.createClass({...});MyFormComponent.Label=React.createClass({...});MyFormComponent.Input=React.createClass({...});varForm=MyFormComponent;varApp=();

组件声明

不要使用 displayName 来命名组件，通过引用来命名。

引用来命名的写法

const ReservationCard = React.creatClass({

}）；

export defalut ReservationCard;

属性

属性命名

React组件的属性使用小驼峰命名法

使用 className 代替 class 属性

使用 htmlFor 代替 for 属性

传递给 HTML 的属性

传递给 HTML 元素的自定义属性， 需要添加 data- 前缀， React 不会渲染非标准属性；

无障碍属性 aria- 可以正常使用。

## Component(组件规范)
### Class 与 React.createClass方法
尽可能地使用ES6中的类的语法，除非有特殊的对于Mixin的需求。

```
// bad
const Listing = React.createClass({
  render() {
    return <div />;
  }
});

// good
class Listing extends React.Component {
  render() {
    return <div />;
  }
}
```

### 组件命名
扩展名：使用.js作为React组件的扩展名。

文件名：使用帕斯卡命名法命名文件，譬如ReservationCard.jsx。

引用命名：使用帕斯卡命名法命名组件和camelCase命名实例。
```
// bad
const reservationCard = require('./ReservationCard');

// good
const ReservationCard = require('./ReservationCard');

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

### Declaration(声明)
不要使用displayName来命名组件，而使用引用。
```
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```

### Props
对于Props的命名使用camelCase。

```
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```
将Props的声明写在类外。State以es6写法写在construct

```
import React, { Component } from 'react';
import PropTypes from 'prop-types'

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

export default class Link extends Component {
  static methodsAreOk() {
    return true;
  }
  state = {
    name: zn
  }
  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
```

## JSX(JSX规范)
### Alignment(对齐)
跟随如下的JSX的语法
```
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Spazz />
</Foo>

```

### Quotes
对于JSX的属性用双引号表示，对于其他属性，用单引号表示。
```
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Spacing(空格)
在自闭合的标签中仅使用单空格。

```
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

### 多段
当JSX包含多行代码时，将它们包含在小括号中。

```
/// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

## Methods
### Naming(方法命名)
对于一个React组件的内部方法，不要使用下划线作为前缀。
```
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  }

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
});
```

## 顺序
### Ordering for class extends 
```
React.Component:
optional static methods
constructor
getChildContext
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
getter methods for render like getSelectReason() or getFooterContent()
optional render methods like renderNavigation() or renderProfilePicture()
render
```
### Ordering for React.createClass: eslint: react/sort-comp
```
displayName
propTypes
contextTypes
childContextTypes
mixins
statics
defaultProps
getDefaultProps
getInitialState
getChildContext
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
getter methods for render like getSelectReason() or getFooterContent()
optional render methods like renderNavigation() or renderProfilePicture()
render
```
## isMounted
### 不要使用 isMounted. eslint: react/no-is-mounted

为什么这样做? isMounted是一种反模式，当使用 ES6 类风格声明 React 组件时该属性不可用，并且即将被官方弃用。

# 参考
[airbnb](https://github.com/airbnb/javascript/tree/master/react)

[ES6英文版](https://github.com/airbnb/javascript)

[ES6中文版](https://github.com/yuche/javascript)
