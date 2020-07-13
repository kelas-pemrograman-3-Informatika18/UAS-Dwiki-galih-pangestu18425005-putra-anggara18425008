
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/Index.vue') },
      { path: 'input', name: 'inputBarang', component: () => import('pages/admin/inputhotel.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('pages/admin/datauser.vue') },
      { path: 'datadvd', name: 'dataDVD', component: () => import('pages/admin/datahotel.vue') },
      { path: 'formedit/:id', name: 'formedit', component: () => import('pages/admin/formedit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/userlayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/index.vue') },
      { path: 'MyOrder', name: 'MyOrder', component: () => import('pages/user/MyOrder.vue') },
      { path: 'about', name: 'about', component: () => import('pages/user/about.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginpage',
    component: () => import('pages/guest/login.vue')
  },
  {
    path: '/register',
    name: 'registerpage',
    component: () => import('pages/guest/register.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
