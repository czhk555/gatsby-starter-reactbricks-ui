import { types } from 'react-bricks/frontend'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    defaultLanguage: 'en',
    getDefaultContent: () => [],
    excludedBlockTypes: [
      'title',
      'paragraph',
      'quote',
      'video',
      'code-block',
      'tweet',
      'tweet-light',
      'image',
    ],
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    defaultLanguage: 'en',
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'quote',
      'video',
      'code-block',
      'tweet',
      'tweet-light',
      'image',
    ],
  },
]

export default pageTypes
