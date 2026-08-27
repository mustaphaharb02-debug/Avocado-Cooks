import React from 'react'

/** Keeps one broken component from turning the whole site into a blank page. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[app] crashed:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="app-crash">
        <span className="app-crash__icon">🥑</span>
        <h1>Something went wrong</h1>
        <p>Refreshing the page usually fixes it.</p>
        <button className="app-crash__btn" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    )
  }
}
