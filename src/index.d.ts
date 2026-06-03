import * as React from 'react'

export interface TooltipArrowStyle {
  /** Background color of the arrow */
  color?: string
  /** Border color of the arrow. Use false to remove the border entirely */
  borderColor?: string | false
  [key: string]: any
}

export interface TooltipStyle {
  /** Style applied to the tooltip container */
  style?: React.CSSProperties
  /** Style applied to the arrow */
  arrowStyle?: TooltipArrowStyle
}

export interface ToolTipProps {
  /** CSS selector string (e.g. "#my-id") or a DOM element to position the tooltip against */
  parent: string | Element
  /** Controls visibility of the tooltip */
  active?: boolean
  /** Placement of the tooltip relative to the parent */
  position?: 'top' | 'right' | 'bottom' | 'left'
  /** Arrow position. Omit for no arrow */
  arrow?: 'center' | 'top' | 'right' | 'bottom' | 'left' | null
  /** Alignment of the tooltip relative to the parent */
  align?: 'center' | 'right' | 'left' | null
  /** Unique group name — use different values for multiple independent tooltips */
  group?: string
  /** Fade-out delay in milliseconds */
  tooltipTimeout?: number
  /** When true, tooltip stays visible when hovered */
  useHover?: boolean
  /** Style overrides for the tooltip and arrow */
  style?: TooltipStyle
  children?: React.ReactNode
}

export interface StatefulToolTipProps extends Omit<ToolTipProps, 'active' | 'parent'> {
  /** The element that triggers the tooltip on hover */
  parent: React.ReactNode
  /** Class name applied to the wrapper span around the parent */
  className?: string
  children?: React.ReactNode
}

declare class ToolTip extends React.Component<ToolTipProps> {}

export class StatefulToolTip extends React.Component<StatefulToolTipProps> {}

export default ToolTip
