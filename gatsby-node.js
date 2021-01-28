const bluebird = require('bluebird')
const fetchPages = require('react-bricks').fetchPages
const fetchPage = require('react-bricks').fetchPage

const appId = process.env.GATSBY_APP_ID
const apiKey = process.env.API_KEY

exports.createPages = async ({ actions: { createPage } }) => {
  console.warn(process.env.API_KEY)

  if (!appId || !apiKey) {
    console.error(
      'App credentials not found. Please, set your GATSBY_APP_ID and API_KEY in your .env.local file.'
    )
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: null },
    })
    return
  }

  const allPages = await fetchPages(apiKey)

  if (!allPages || allPages.length === 0) {
    console.error(
      'No published page was found. Please, create at least one page from the /admin interface.'
    )
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: null },
    })
    return
  }

  const allPagesWithContent = await bluebird.map(
    allPages,
    (page) => {
      return fetchPage(page.slug, apiKey)
    },
    { concurrency: 2 }
  )

  // Home Page
  const homePage = allPagesWithContent.find((page) => page.slug === 'home')
  if (homePage) {
    createPage({
      path: `/`,
      component: require.resolve('./src/templates/page.tsx'),
      context: { page: homePage },
    })
  }

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
}
