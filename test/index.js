const React = require('react')
const assert = require('assert')
const ReactShallowRenderer = require('react-test-renderer/shallow')
const TestRenderer = require('react-test-renderer')
const Tooltip = require('../src').default
const { StatefulToolTip } = require('../src')

// ─── helpers ────────────────────────────────────────────────────────────────

const shallowRender = (Component) => {
  const renderer = new ReactShallowRenderer()
  renderer.render(Component)
  return renderer.getRenderOutput()
}

// ─── exports ────────────────────────────────────────────────────────────────

describe('Exports', () => {
  it('default export is a React component', () => {
    assert.equal(typeof Tooltip, 'function')
  })

  it('StatefulToolTip is a named export', () => {
    assert.equal(typeof StatefulToolTip, 'function')
  })
})

// ─── ToolTip render ─────────────────────────────────────────────────────────

describe('ToolTip render', () => {
  it('renders null', () => {
    const output = shallowRender(
      React.createElement(Tooltip, { parent: '#el', active: false })
    )
    assert.equal(output, null)
  })

  it('renders null when active', () => {
    const output = shallowRender(
      React.createElement(Tooltip, { parent: '#el', active: true })
    )
    assert.equal(output, null)
  })
})

// ─── ToolTip default props ───────────────────────────────────────────────────

describe('ToolTip default props', () => {
  it('active defaults to false', () => {
    assert.equal(Tooltip.defaultProps.active, false)
  })

  it('group defaults to "main"', () => {
    assert.equal(Tooltip.defaultProps.group, 'main')
  })

  it('tooltipTimeout defaults to 500', () => {
    assert.equal(Tooltip.defaultProps.tooltipTimeout, 500)
  })
})

// ─── SSR safety ─────────────────────────────────────────────────────────────
//
// Node.js has no document or window — this IS the SSR environment.
// These tests call full lifecycle methods (componentDidMount, componentWillUnmount)
// and verify nothing crashes when document/window are undefined.

describe('SSR safety (no document, no window in Node.js)', () => {
  it('typeof document is undefined in this environment', () => {
    assert.equal(typeof document, 'undefined')
  })

  it('typeof window is undefined in this environment', () => {
    assert.equal(typeof window, 'undefined')
  })

  it('ToolTip with active=false mounts and unmounts without crashing', () => {
    let renderer
    assert.doesNotThrow(() => {
      renderer = TestRenderer.create(
        React.createElement(Tooltip, { parent: '#el', active: false },
          React.createElement('span', null, 'content')
        )
      )
    })
    assert.doesNotThrow(() => renderer.unmount())
  })

  it('ToolTip with active=true mounts and unmounts without crashing', () => {
    let renderer
    assert.doesNotThrow(() => {
      renderer = TestRenderer.create(
        React.createElement(Tooltip, { parent: '#el', active: true },
          React.createElement('span', null, 'content')
        )
      )
    })
    assert.doesNotThrow(() => renderer.unmount())
  })

  it('ToolTip toggling active true→false does not crash', () => {
    let renderer
    assert.doesNotThrow(() => {
      renderer = TestRenderer.create(
        React.createElement(Tooltip, { parent: '#el', active: false })
      )
      renderer.update(
        React.createElement(Tooltip, { parent: '#el', active: true })
      )
      renderer.update(
        React.createElement(Tooltip, { parent: '#el', active: false })
      )
      renderer.unmount()
    })
  })

  it('ToolTip with group prop mounts and unmounts without crashing', () => {
    assert.doesNotThrow(() => {
      const renderer = TestRenderer.create(
        React.createElement(Tooltip, { parent: '#el', active: true, group: 'ssr-group' })
      )
      renderer.unmount()
    })
  })

  it('ToolTip with string parent does not crash', () => {
    assert.doesNotThrow(() => {
      const renderer = TestRenderer.create(
        React.createElement(Tooltip, { parent: '#my-button', active: true })
      )
      renderer.unmount()
    })
  })

  it('StatefulToolTip mounts and unmounts without crashing', () => {
    assert.doesNotThrow(() => {
      const renderer = TestRenderer.create(
        React.createElement(
          StatefulToolTip,
          { parent: React.createElement('span', null, 'hover me') },
          React.createElement('p', null, 'tooltip content')
        )
      )
      renderer.unmount()
    })
  })
})

// ─── StatefulToolTip ─────────────────────────────────────────────────────────

describe('StatefulToolTip', () => {
  it('renders a Fragment with the parent element', () => {
    const renderer = TestRenderer.create(
      React.createElement(
        StatefulToolTip,
        { parent: React.createElement('span', null, 'hover me') },
        React.createElement('p', null, 'content')
      )
    )
    const json = renderer.toJSON()
    assert.ok(json !== null)
    renderer.unmount()
  })

  it('className defaults to empty string', () => {
    assert.equal(StatefulToolTip.defaultProps.className, '')
  })
})
