<template>
  <nav class="bg-blue-600 p-4 w-screen">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-xl font-bold">Post-it App</router-link>
      <div>
        <router-link to="/" class="text-white mx-2 hover:underline">Home</router-link>
        <button @click="showAddModal = true" class="text-white mx-2 hover:underline">Ajouter un Post-it</button>
      </div>
    </div>

    <!-- Modal pour ajouter un post-it -->
    <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Ajouter un nouveau Post-it</h2>
        <form @submit.prevent="addNote">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Titre:</label>
            <input type="text" v-model="title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Contenu:</label>
            <textarea v-model="content" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="showAddModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition-colors">Annuler</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showAddModal: false,
      title: '',
      content: ''
    };
  },
  methods: {
    addNote() {
      const newNote = {
        title: this.title,
        content: [this.content],
      };
      fetch('https://post-it.epi-bluelock.bj/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
      .then(response => response.json())
      .then(data => {
        this.showAddModal = false;
        this.$router.push('/');
      })
      .catch(error => console.error('Error adding note:', error));
    }
  }
};
</script>

<style scoped>
</style>
