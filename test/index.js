import React from 'react'
import assert from 'assert'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import CardWrapper  from '../src/CardWrapper'

const renderer = (Component) => {
  const shallowRenderer = new ReactShallowRenderer()
  shallowRenderer.render(Component)
  return shallowRenderer.getRenderOutput()
}

describe('React Portal Tooltip', () => {
  it('should export a react component', () => {
    assert.equal(typeof Tooltip, 'function')
  })

  it('should render null', () => {
    let tooltip = renderer(<CardWrapper parent="#hey" position="top" arrow="center" active={false}><span>Hey this is a tooltip</span></CardWrapper>)

    assert.equal(tooltip, null)
  })
})
