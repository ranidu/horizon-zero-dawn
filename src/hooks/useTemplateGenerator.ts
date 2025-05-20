import { groupBy, map } from 'lodash'

const useTemplateGenerator = (response) => {
    if(!response) return {}
    const { menu: menuItems } = response
    const tabNames = map(menuItems, item => item.tabName)
    const tabs = groupBy(menuItems, 'tabName')

    return {
        tabNames,
        tabs
    }
}

export default useTemplateGenerator