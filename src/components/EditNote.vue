<template>
  <div class="flex justify-center items-center h-screen">
    <div class="container mx-auto py-4 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Modifier le Post-it</h1>
      <form @submit.prevent="updateNote">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titre:</label>
          <input type="text" v-model="note.title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Contenu:</label>
          <textarea v-model="note.content[0]" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        title: '',
        content: ['']
      }
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
    updateNote() {
      let id = this.$route.params.id;
      fetch(`http://62.72.5.95:1999/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.note)
      })
      .then(response => response.json())
      .then(data => {
        this.$router.push('/');
      })
      .catch(error => console.error('Error updating note:', error));
    }
  }
};
</script>