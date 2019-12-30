function filterRoute(tree) {
  return tree.map(({ children, attributes: { data } }) => {
    return {
      path: data.menuUrl,
      name: data.menuName,
      component: resolve => {
        require(['@/components/' + data.pathUrl], resolve)
      },
      meta: {
        title: data.menuName,
        com: data.pathUrl,
        menu: data.menuName,
        icon: data.icon
      },
      children: children ? filterRoute(children) : []
    }
  })
}
export function initRoute(tree, $router) {
  const children = filterRoute(tree)
  const filterTree = {
    path: '/home',
    name: 'home',
    hidden: true,
    component: () => import('@/components/home'),
    children
  }
  if (!$router.options.routes.find(route => route.name === 'home')) {
    $router.options.routes.push(filterTree)
  } else {
    const lastLength = $router.options.routes.length - 1
    $router.options.routes[lastLength] = filterTree
  }
  $router.addRoutes($router.options.routes)
  return children
}
