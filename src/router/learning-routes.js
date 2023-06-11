export default [
  {
    path: "/learning/001",
    name: "learning-001",
    meta: {
      title: 'background-clip: text'
    },
    component: () => import("@/views/learning/a-001.vue"),
  },
  {
    path: "/learning/002",
    name: "learning-002",
    meta: {
      title: 'EyeDropper 取色器'
    },
    component: () => import("@/views/learning/a-002.vue"),
  },
  {
    path: "/learning/003",
    name: "learning-003",
    meta: {
      title: 'grid 布局 1'
    },
    component: () => import("@/views/learning/a-003.vue"),
  },
  {
    path: "/learning/004",
    name: "learning-004",
    meta: { 
      title: 'grid 布局 2'
    },
    component: () => import("@/views/learning/a-004.vue"),
  },
  {
    path: "/learning/005",
    name: "learning-005",
    meta: {
      title: 'Web animation api'
    },
    component: () => import("@/views/learning/a-005.vue"),
  },
  {
    path: "/learning/006",
    name: "learning-006",
    meta: {
      title: 'IntersectionObserver 1'
    },
    component: () => import("@/views/learning/a-006.vue"),
  },
  {
    path: "/learning/007",
    name: "learning-007",
    meta: {
      title: 'Houdini'
    },
    component: () => import("@/views/learning/a-007.vue"),
  },
];
