import { addNavPrefix } from './route'

const nav = [
  {
    text: '首页',
    activeMatch: '',
    link: '/'
  },
  {
    text: '指南',
    activeMatch: '^/docs/',
    link: '/docs/installation'
  },
  {
    text: '组件库',
    activeMatch: '^/components/',
    link: '/components/button'
  }
]

const navEN = [
  {
    text: 'Home',

    activeMatch: '',
    link: '/'
  },
  {
    text: 'Guide',
    activeMatch: '^/en-US/docs/',
    link: '/docs/installation'
  },
  {
    text: 'Component',
    activeMatch: '^/en-US/components/',
    link: '/components/button'
  }
]

export const getNavRouter = (langPrefix: string = '/') => {
  return langPrefix === '/'
    ? addNavPrefix(langPrefix, nav)
    : addNavPrefix(langPrefix, navEN)
}
