<template>
  <div class="container mx-auto py-8">
    <div v-if="note">
      <h1 class="text-2xl font-bold mb-4">{{ note.title }}</h1>
      <p class="mb-4">{{ note.content.join(' ') }}</p>
      <router-link :to="'/edit/' + note._id" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Modifier</router-link>
      <button @click="deleteNote" class="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
    </div>
    <div v-else>
      <p class="text-red-500">Post-it non trouvé.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: null
    };
  },
  created() {
    this.fetchNote();
  },
  methods: {
    fetchNote() {
      let id = this.$route.params.id;
      fetch(`http://62.72.5.95:1999/notes/${id}`)
        .then(response => response.json())
        .then(data => {
          this.note = data;
        })
        .catch(error => console.error('Error fetching note:', error));
    },
    deleteNote() {
      let id = this.$route.params.id;
      fetch(`http://62.72.5.95:1999/notes/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        this.$router.push('/');
      })
      .catch(error => console.error('Error deleting note:', error));
    }
  }
};
</script>
