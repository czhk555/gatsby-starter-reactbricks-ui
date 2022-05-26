require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const bluebird = require('bluebird')
const fetchPages = require('react-bricks/frontend').fetchPages
const fetchPage = require('react-bricks/frontend').fetchPage
const fetchTags = require('react-bricks/frontend').fetchTags

exports.createPages = async ({ actions: { createPage } }) => {
  const appId = process.env.GATSBY_APP_ID
  const apiKey = process.env.API_KEY

  if (!appId || !apiKey) {
    console.error(
      'App credentials not found. Please, set your GATSBY_APP_ID and API_KEY in your .env.development or .env.production file.'
    )
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: null, error: 'NOKEYS' },
    })
    return
  }

  const { items: tags } = await fetchTags(apiKey)
  tags.sort()

  const allPages = await fetchPages(apiKey, {
    pageSize: 1000,
    sort: '-publishedAt',
  })

  const homePage = await fetchPage('home', apiKey)

  if (!allPages || allPages.length === 0) {
    console.error(
      'No published page was found. Please, create at least one page from the /admin interface.'
    )
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: null, error: 'NOPAGE' },
    })
    return
  }

  const posts = allPages.filter((page) => page.type === 'blog')

  const popularPosts = allPages.filter(
    (page) => page.type === 'blog' && page.tags?.includes('popular')
  )
  const pages = allPages.filter(
    (page) => page.type !== 'blog' && page.slug !== 'home'
  )

  if (homePage) {
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: homePage },
    })
  }

  createPage({
    path: `/blog`,
    component: require.resolve('./src/templates/blog.tsx'),
    context: { posts, tags },
  })

  const allPagesWithContent = await bluebird.map(
    pages,
    (page) => {
      return fetchPage(page.slug, apiKey)
    },
    { concurrency: 2 }
  )

  // Other pages
  allPagesWithContent
    .filter((page) => page.slug !== 'home')
    .forEach((page) => {
      createPage({
        path: `/${page.slug}/`,
        component: require.resolve('./src/templates/page.tsx'),
        context: { page },
      })
    })

  tags.forEach((tag) => {
    const pagesByTag = posts.filter((page) => page.tags?.includes(tag))

    createPage({
      path: `/blog/tag/${tag}`,
      component: require.resolve('./src/templates/tag.tsx'),
      context: { posts: pagesByTag, filterTag: tag, popularPosts, tags },
    })
  })

  for (const { slug } of posts) {
    const page = await fetchPage(slug, apiKey)
    createPage({
      path: `/blog/${page.slug}/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page },
    })
  }
}
