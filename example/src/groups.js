import React from 'react'
import List from './list'

export default class Groups extends React.Component {
  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              The <code>group</code> props will allow you to have multiple groups of tooltip. Hover the following usernames to see the result.
            </div>
          </div>
          <div className="row">
            <h2>first group</h2>
            <div className="col-lg-12">
              <List data={this.props.users.list.slice(0, 10)} group="first"/>
            </div>
          </div>
          <div className="row">
            <h2>second group</h2>
            <div className="col-lg-12">
              <List data={this.props.users.list.slice(10, 20)} group="second"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
