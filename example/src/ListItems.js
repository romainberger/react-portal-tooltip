import React, { Component } from 'react'
import User from './User'

class ListItems extends Component {
  constructor(props) {
    super(props);
  }

  split(data, n) {
    let result = [],
        set = []

    data.forEach((item) => {
      if (set.length === n) {
        result.push(set)
        set = []
      }

      set.push(item)
    })

    if (set.length) {
      result.push(set)
    }

    return result
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data || this.props.position !== nextProps.position || this.props.arrow !== nextProps.arrow
  }

  getList() {
    let list = []
    this.split(this.props.data, 4).forEach((set, i) => {
      list.push(<div className="row" style={{marginBottom: 20}} key={i}>
        {set.map((user, key) => (<User className="col-lg-3" {...user} key={key} position={this.props.position} arrow={this.props.arrow} group={this.props.group}/>))}
      </div>)
    })

    return list
  }
  
  render() {
    return <div>{this.getList()}</div>
  }
};

export default ListItems;
