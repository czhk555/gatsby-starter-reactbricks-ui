import React from 'react'
import { Helmet } from 'react-helmet'

interface SeoProps {
  title?: string
  description?: string
  lang?: string
  meta?: HTMLMetaElement[]
}

const Seo: React.FC<SeoProps> = ({
  title = '',
  description = '',
  lang = 'en',
  meta = [],
}) => {
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | React Bricks`}
      meta={[
        description
          ? {
              name: `description`,
              content: description,
            }
          : {},
      ].concat(meta)}
    />
  )
}

export default Seo
