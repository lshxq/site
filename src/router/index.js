import { createRouter, createWebHistory } from 'vue-router'
import _ from 'lodash'
import utils from '@/utils.js'
import routes from "./routes.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const loginNeeded = _.get(to, 'meta.loginNeeded')
  if (loginNeeded) {
    const user = utils.getCurrentUser()
    if (!user) {
      const user = await utils.getCurrentUserAsync()
      if(!user) {
        return {
          name: 'login'
        }
      } 
    }
  }
});

export default router
