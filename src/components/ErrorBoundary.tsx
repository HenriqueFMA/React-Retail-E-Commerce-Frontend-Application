import React from 'react'

type State = { error: Error | null }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <pre className="text-sm text-red-600">{String(this.state.error)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children as React.ReactElement
  }
}
