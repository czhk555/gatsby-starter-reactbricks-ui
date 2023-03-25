import React, { useContext } from 'react'
import { PageProps } from 'gatsby'
import {
  PageViewer,
  cleanPage,
  ReactBricksContext,
  types,
} from 'react-bricks/frontend'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ErrorNoKeys from '../components/errorNoKeys'
import ErrorNoPage from '../components/errorNoPage'
import ErrorNoHeader from '../components/errorNoHeader'
import ErrorNoFooter from '../components/errorNoFooter'

interface ReactBricksPageProps {
  pageContext: {
    page: types.Page
    header: types.Page
    footer: types.Page
    errorKeys: string
    errorPage: string
    errorHeader: string
    errorFooter: string
  }
}

const Page: React.FC<ReactBricksPageProps> = ({
  pageContext: {
    page,
    header,
    footer,
    errorKeys,
    errorPage,
    errorHeader,
    errorFooter,
  },
}) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)

  // Clean the received content
  // Removes unknown or not allowed bricks
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null

  return (
    <Layout>
      {pageOk && !errorPage ? (
        <Seo
          title={page.meta.title}
          description={page.meta.description}
          lang={page.meta.language}
        />
      ) : (
        <></>
      )}
      {headerOk && !errorHeader ? (
        <PageViewer page={headerOk} />
      ) : (
        <ErrorNoHeader />
      )}
      {pageOk && !errorPage ? <PageViewer page={pageOk} /> : <ErrorNoPage />}
      {footerOk && !errorFooter ? (
        <PageViewer page={footerOk} />
      ) : (
        <ErrorNoFooter />
      )}

      {errorKeys === 'NOKEYS' && <ErrorNoKeys />}
    </Layout>
  )
}

export default Page
