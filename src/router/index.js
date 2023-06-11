import { createRouter, createWebHistory } from 'vue-router'
import _ from 'lodash'
import utils from '@/utils.js'
import routes from "./routes.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loginNeeded = _.get(to, 'meta.loginNeeded')
  if (loginNeeded) {
    const user = utils.getCurrentUser()
    if (user) {
      next()
    } else {
      utils.getCurrentUserAsync().then(next).catch(() => {
        next("/login")
      })
    }
  } else {
    next()
  }
});

export default router
