import * as React from 'react'
import ToolTip, { StatefulToolTip, TooltipStyle, ToolTipProps, StatefulToolTipProps } from '../lib'

// --- TooltipStyle ---
const style: TooltipStyle = {
  style: {
    background: 'rgba(0,0,0,.8)',
    padding: 20,
  },
  arrowStyle: {
    color: 'rgba(0,0,0,.8)',
    borderColor: false,
  },
}

// --- ToolTip: all valid props ---
const tooltipAllProps: ToolTipProps = {
  parent: '#my-element',
  active: true,
  position: 'top',
  arrow: 'center',
  align: 'left',
  group: 'group-a',
  tooltipTimeout: 300,
  useHover: true,
  style,
}

// ToolTip with DOM element as parent
declare const el: HTMLDivElement
const tooltipWithRef: ToolTipProps = {
  parent: el,
  active: false,
}

// ToolTip with no arrow
const tooltipNoArrow: ToolTipProps = {
  parent: '#btn',
  arrow: null,
}

// ToolTip rendered as JSX
const tooltipJsx = (
  <ToolTip parent="#btn" active={true} position="bottom" arrow="center">
    <span>Tooltip content</span>
  </ToolTip>
)

// --- StatefulToolTip: valid props ---
const statefulProps: StatefulToolTipProps = {
  parent: <span>Hover me</span>,
  className: 'my-wrapper',
  position: 'right',
  arrow: 'top',
  tooltipTimeout: 500,
  style,
}

const statefulJsx = (
  <StatefulToolTip parent={<button>Hover me</button>} position="top" arrow="center">
    <p>Stateful tooltip content</p>
  </StatefulToolTip>
)

// --- Type guards: these should cause TS errors if uncommented ---

// @ts-expect-error parent is required
const missingParent: ToolTipProps = { active: true }

// @ts-expect-error invalid position value
const badPosition: ToolTipProps = { parent: '#el', position: 'diagonal' }

// @ts-expect-error invalid arrow value
const badArrow: ToolTipProps = { parent: '#el', arrow: 'sideways' }

// @ts-expect-error active should not exist on StatefulToolTip (it's managed internally)
const statefulWithActive: StatefulToolTipProps = { parent: <span/>, active: true }

export {}
