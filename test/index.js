import React from 'react'
import assert from 'assert'
import TestUtils from 'react-addons-test-utils'
import Tooltip from '../src'

const renderer = (Component) => {
  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(Component)
  return shallowRenderer.getRenderOutput()
}

describe('React Portal Tooltip', () => {
  it('should export a react component', () => {
    assert.equal(typeof Tooltip, 'function')
  })

  it('should render null', () => {
    let tooltip = renderer(<Tooltip parent="#hey" position="top" arrow="center" active={false}><span>Hey this is a tooltip</span></Tooltip>)

    assert.equal(tooltip, null)
  })
})
