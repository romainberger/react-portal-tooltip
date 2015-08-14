import React from 'react'
import ToolTip from './../../src'

const Countries = [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "AR", name: "Arkansas"},
    { abbr: "CA", name: "California"},
    { abbr: "CO", name: "Colorado"},
    { abbr: "CT", name: "Connecticut"},
    { abbr: "DE", name: "Delaware"},
    { abbr: "FL", name: "Florida"},
    { abbr: "GA", name: "Georgia"},
    { abbr: "HI", name: "Hawaii"},
    { abbr: "ID", name: "Idaho"},
    { abbr: "IL", name: "Illinois"},
    { abbr: "IN", name: "Indiana"},
    { abbr: "IA", name: "Iowa"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "ME", name: "Maine"},
    { abbr: "MD", name: "Maryland"},
    { abbr: "MA", name: "Massachusetts"},
    { abbr: "MI", name: "Michigan"},
    { abbr: "MN", name: "Minnesota"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "MO", name: "Missouri"},
    { abbr: "MT", name: "Montana"},
    { abbr: "NE", name: "Nebraska"},
    { abbr: "NV", name: "Nevada"},
    { abbr: "NH", name: "New Hampshire"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "NC", name: "North Carolina"},
    { abbr: "ND", name: "North Dakota"},
    { abbr: "OH", name: "Ohio"},
    { abbr: "OK", name: "Oklahoma"},
    { abbr: "OR", name: "Oregon"},
    { abbr: "PA", name: "Pennsylvania"},
    { abbr: "RI", name: "Rhode Island"},
    { abbr: "SC", name: "South Carolina"},
    { abbr: "SD", name: "South Dakota"},
    { abbr: "TN", name: "Tennessee"},
    { abbr: "TX", name: "Texas"},
    { abbr: "UT", name: "Utah"},
    { abbr: "VT", name: "Vermont"},
    { abbr: "VA", name: "Virginia"},
    { abbr: "WA", name: "Washington"},
    { abbr: "WV", name: "West Virginia"},
    { abbr: "WI", name: "Wisconsin"},
    { abbr: "WY", name: "Wyoming"}
]

class List extends React.Component {
    state = {
        activeCountry: false
    }
    handleMouseEnter(abbr) {
        this.setState({activeCountry: abbr})
    }
    handleMouseLeave() {
        this.setState({activeCountry: false})
    }
    getList() {
        return Countries.map((country, key) => {
            return (
                <li key={key}>
                    <span style={{position: 'relative'}} id={`country-${key}`} onMouseEnter={this.handleMouseEnter.bind(this, country.abbr)} onMouseLeave={::this.handleMouseLeave}>{country.abbr}</span>
                    <ToolTip active={this.state.activeCountry === country.abbr} parent={`#country-${key}`}>
                        <div>{country.name}</div>
                    </ToolTip>
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
            <div>
                <h1>React Portal ToolTip Example</h1>
                <List />
                <button id="text" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Hover me</button>
                <ToolTip active={this.state.isTooltipActive} parent="#text">
                    <div>Hey I am a tooltip</div>
                </ToolTip>
            </div>
        )
    }
}
