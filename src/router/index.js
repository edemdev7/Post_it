import { createRouter, createWebHistory } from 'vue-router'
import Notes from '@/components/NotesPost.vue';
import Note from '@/components/NotePost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Notes
    },
    {
      path: '/note/:id',
      name: 'Note',
      component: Note
    }
  ]
})

export default router
