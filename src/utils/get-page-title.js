import defaultSettings from '@/settings'

const title = defaultSettings.title || 'vue-element-multi-tags-template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
