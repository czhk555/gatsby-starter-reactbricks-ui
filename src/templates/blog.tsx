import { Link } from 'gatsby'
import React from 'react'
import { cleanPage, types, PageViewer } from 'react-bricks/frontend'
import { useReactBricksContext } from 'react-bricks/frontend'
import PostListItem from '../components/PostListItem'
import ErrorNoKeys from '../components/errorNoKeys'
import ErrorNoHeader from '../components/errorNoHeader'
import ErrorNoFooter from '../components/errorNoFooter'
import Layout from '../components/layout'
import Seo from '../components/seo'

interface ReactBricksPageProps {
  pageContext: {
    header: types.Page
    footer: types.Page
    tags: string[]
    posts: types.Page[]
    errorNoKeys: string
    errorPage: string
    errorHeader: string
    errorFooter: string
  }
}

const Page: React.FC<ReactBricksPageProps> = ({
  pageContext: {
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
          <Seo
            title="Blog List"
            description="React Bricks blog starter"
            lang="en"
          />
          {headerOk && !errorHeader ? (
            <PageViewer page={headerOk} />
          ) : (
            <ErrorNoHeader />
          )}
          <h1 className="text-center text-4xl sm:text-6xl lg:text-7xl leading-none font-black tracking-tight text-gray-900 pb-4 mt-10 sm:mt-12 mb-4">
            Blog
          </h1>
          <div className="max-w-6xl mx-auto px-8 py-16 flex space-x-24">
            <section className="flex-[2] space-y-8">
              <h2 className="text-pink-500 uppercase mb-8 tracking-widest font-bold">
                Recently published
              </h2>
              {posts?.map((post) => (
                <PostListItem
                  key={post.id}
                  title={post.name}
                  href={post.slug}
                  content={post.meta.description || ''}
                />
              ))}
            </section>
            <section className="flex-1 space-y-16">
              <div>
                <h2 className="text-pink-500 uppercase mb-8 tracking-widest font-bold">
                  Tags
                </h2>
                <div className="flex flex-wrap items-center">
                  {/* T A G  */}
                  {tags
                    ?.filter((tag) => tag !== 'popular')
                    .map((tag) => (
                      <Link
                        to={`/blog/tag/${tag}`}
                        key={tag}
                        className="inline-block text-sm font-bold mr-2 mb-2 transform duration-200 text-cyan-800 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900 rounded-md px-2 py-1"
                      >
                        <div className="" style={{ zIndex: -1 }} />
                        {tag}
                      </Link>
                    ))}
                  {/*  */}
                </div>
              </div>
              <div>
                <h2 className="text-pink-500 uppercase mb-8 tracking-widest font-bold">
                  Most Popular
                </h2>
                <ul>
                  {posts
                    ?.filter((post) =>
                      post.tags.find((tag) => tag === 'popular')
                    )
                    .map((post) => (
                      <li key={post.id}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-gray-900 hover:text-cyan-600 font-bold text-lg leading-10 transition-colors"
                        >
                          {post.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </section>
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

export default Page
