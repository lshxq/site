import learnings from "./learning-routes.js";

export default [
  {
    path: "/",
    name: "index",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {},
    component: () => import("@/views/home/home-index.vue"),
  },
  {
    path: "/kanban",
    name: "kanban",
    meta: {},
    component: () => import("@/views/kanban/kanban-index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("@/views/login/login-index.vue"),
  },
  {
    path: "/blog/creation",
    name: "blog-creation",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/blog/blog-creation-index.vue"),
  },
  {
    path: "/blog/:id/update",
    name: "blog-update",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/blog/blog-update-index.vue"),
  },
  {
    path: "/blog/:id/viewer",
    name: "blog-viewer",
    component: () => import("@/views/blog/blog-viewer-index.vue"),
  },
  {
    path: "/personal",
    name: "personal",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/personal/personal-index.vue"),
  },
  {
    path: "/pano/list",
    name: "pano-list",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/pano/pano-list-index.vue"),
  },
  {
    path: "/pano/create",
    name: "pano-create",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/pano/pano-create-index.vue"),
  },
  {
    path: "/pano/:id/update",
    name: "pano-update",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/pano/pano-update-index.vue"),
  },
  {
    path: "/pano/:id/viewer",
    name: "pano-viewer",
    meta: {},
    component: () => import("@/views/pano/pano-viewer-index.vue"),
  },
  {
    path: "/pano/:id/editor",
    name: "pano-editor",
    meta: {
      loginNeeded: true,
    },
    component: () => import("@/views/pano/pano-editor-index.vue"),
  },
  ...learnings,
];
