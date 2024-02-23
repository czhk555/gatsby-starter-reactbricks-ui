import classNames from 'classnames'
import { Link } from 'gatsby'
import React from 'react'
import { cleanPage, PageViewer, types } from 'react-bricks/frontend'
import { useReactBricksContext } from 'react-bricks/frontend'
import PostListItem from '../components/PostListItem'
import TagListItem from '../components/TagListItem'
import ErrorNoKeys from '../components/errorNoKeys'
import ErrorNoHeader from '../components/errorNoHeader'
import ErrorNoFooter from '../components/errorNoFooter'
import Layout from '../components/layout'
import Seo from '../components/seo'

interface PageProps {
  pageContext: {
    posts: types.Page[]
    popularPosts: types.Page[]
    filterTag: string
    errorNoKeys: string
    errorPage: string
    errorHeader: string
    errorFooter: string
    tags: string[]
    header: types.Page
    footer: types.Page
  }
}

const tagPage: React.FC<PageProps> = ({
  pageContext: {
    filterTag,
    posts,
    tags,
    header,
    footer,
    errorNoKeys,
    errorHeader,
    errorFooter,
  },
}) => {
  const { pageTypes, bricks } = useReactBricksContext()

  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null
  return (
    <Layout>
      {!errorNoKeys && (
        <>
          <Seo title={filterTag} description={filterTag} lang="en" />
          {headerOk && !errorHeader ? (
            <PageViewer page={headerOk} />
          ) : (
            <ErrorNoHeader />
          )}
          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <div className="flex items-center justify-between  text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight">
                  {filterTag} articles
                </h1>

                <Link
                  to="/blog"
                  className="hover:-translate-x-2 transition-transform duration-300"
                >
                  &laquo; Return to blog
                </Link>
              </div>

              <div className="flex flex-wrap items-center">
                {tags?.map((tag) => (
                  <TagListItem tag={tag} key={tag} />
                ))}
              </div>

              <hr className="mt-6 mb-10 dark:border-gray-600" />

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
                {posts?.map((post) => (
                  <PostListItem
                    key={post.id}
                    title={post.meta.title || ''}
                    href={post.slug}
                    content={post.meta.description || ''}
                    author={post.author}
                    date={post.publishedAt || ''}
                    featuredImg={post.meta.image}
                  />
                ))}
              </div>
            </div>
          </div>
          {footerOk && !errorFooter ? (
            <PageViewer page={footerOk} />
          ) : (
            <ErrorNoFooter />
          )}
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </Layout>
  )
}

export default tagPage
