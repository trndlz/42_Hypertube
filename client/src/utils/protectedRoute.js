import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../components/homepage/HomePage'
import { auth } from './auth'

export default function ProtectedRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated) {
          return <Component {...props} />
        } else {
          return <HomePage {...props} {...rest} />
        }
      }}
    />
  )
}
