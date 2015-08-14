import React from 'react'
import ToolTip from './../../src'

const Countries = [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "FL", name: "Florida"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "TX", name: "Texas"},
]

class Country extends React.Component {
    state = {
        isTooltipActive: false
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    render() {
        return (
            <div>
                <span style={{position: 'relative'}} id={`country-${this.props.abbr}`} onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>{this.props.abbr}</span>
                <ToolTip active={this.state.isTooltipActive} parent={`#country-${this.props.abbr}`}>
                    <div>{this.props.name}</div>
                </ToolTip>
            </div>
        )
    }
}

class List extends React.Component {
    getList() {
        return Countries.map((country, key) => {
            return (
                <li key={key}>
                    <Country {...country}/>
                </li>
            )
        })
    }
    render() {
        return <ul>{this.getList()}</ul>
    }
}

export default class App extends React.Component {
    state = {
        isTooltipActive: false
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    render() {
        return (
            <div className="row">
                <List className="col-lg-6" />
                <div className="col-lg-6">
                    <button id="text2" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Hover me</button>
                    <ToolTip active={this.state.isTooltipActive} parent="#text2">
                        <div>Hey I am a tooltip too</div>
                    </ToolTip>
                </div>
            </div>
        )
    }
}
