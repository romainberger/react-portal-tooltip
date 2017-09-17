import React, {Component} from 'react'
import ListItems from './ListItems'
import CardWrapper from './../../src/CardWrapper'

 class Home extends Component {
  constructor(props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      isTooltipActive: false,
      isTooltipLoading: false,
      position: 'right',
      arrow: 'center',
      arrowOptions: null
    };
  }
  
  componentDidMount() {
    this.getArrowOptions()
  }

  showTooltip() {
    this.setState({isTooltipActive: true})
  }

  hideTooltip() {
    this.setState({isTooltipActive: false})
  }

  handleOnChange() {
    let arrow = this.refs.arrow.value === 'disable' ? null : this.refs.arrow.value
    this.setState({
      position: this.refs.position.value,
      arrow
    }, this.getArrowOptions)
  }

  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }

  getBasicExample() {
    return {
      __html: this.escape(`<CardWrapper active={true} parent="#parent" position="right" arrow="center">
              ToolTip content here
              </CardWrapper>`)
    }
  }

  getArrowOptions() {
    let node = this.refs.position
    let value = node ? node.value : 'right'
    let arrowOptions = [
      <option value="center" key="arrow-center">center</option>,
      <option value={null} key="arrow-null">disable</option>
    ]

    if (value === 'top' || value === 'bottom') {
      arrowOptions = arrowOptions.concat([
        <option value="right" key="arrow-right">right</option>,
        <option value="left" key="arrow-left">left</option>
      ])
    }
    else {
      arrowOptions = arrowOptions.concat([
        <option value="top" key="arrow-top">top</option>,
        <option value="bottom" key="arrow-bottom">bottom</option>
      ])
    }

    this.setState({arrowOptions})
  }

  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div style={{marginBottom: 20}}>
                Basic tooltip usage:
                <pre dangerouslySetInnerHTML={this.getBasicExample()}/>
              </div>
              <div style={{marginBottom: 20}}>
                Result:
                <span className="btn btn-default" id="result" onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip} style={{marginLeft: 10}}>Hover me!</span>
                <CardWrapper  className="react__portal__tooltip" active={this.state.isTooltipActive} parent="#result" position={this.state.position} group="result">

                { this.state.isTooltipLoading ? 'Loading...' : <div>Tooltip content here</div>}
                </CardWrapper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <label htmlFor="position-select" style={{marginRight: 10}}>Position:</label>
              <select id="position-select" onChange={this.handleOnChange} ref="position" defaultValue="right">
                <option value="top">top</option>
                <option value="right">right</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label htmlFor="arrow" style={{marginRight: 10}}>Arrow:</label>
              <select id="arrow" onChange={this.handleOnChange} ref="arrow" defaultValue="center">
                {this.state.arrowOptions}
              </select>
            </div>
          </div>
          <div className="row">
            <h4 className="col-lg-12">Hover the usernames to display the tooltips</h4>
          </div>
          <ListItems data={this.props.users.list.slice(0, 12)} position={this.state.position} arrow={this.state.arrow}/>
        </div>
      </div>
    )
  }
}

export default Home;
