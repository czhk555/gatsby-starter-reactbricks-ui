import React from 'react'
import { Link, navigate } from 'gatsby'
import { types } from 'react-bricks'

import bricks from './bricks'
import pageTypes from './pageTypes'
import GatsbyLink from './GatsbyLink'

const config: types.ReactBricksConfig = {
  appId: process.env.GATSBY_APP_ID,
  apiKey: process.env.API_KEY,
  pageTypes,
  bricks,
  logo: '/logo.svg',
  //contentClassName: 'content',
  renderLocalLink: GatsbyLink,
  navigate,
  loginPath: '/admin',
  editorPath: '/admin/editor',
  playgroundPath: '/admin/playground',
  appSettingsPath: '/admin/app-settings',
  useCssInJs: false,
  appRootElement: '#___gatsby',
}

export default config
