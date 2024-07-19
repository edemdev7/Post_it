<template>
  <div class="bg-gray-900 min-h-screen">
    <Navbar />
    <Loader :loading="loading" />
    <div v-if="!loading" class="container mx-auto py-8">
      <div class="text-center mb-8">
        <router-link to="/" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">Retour à l'accueil</router-link>
      </div>
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-100">Titre: {{ note.title }}</h1>
      <div class="bg-gray-800 p-8 w-full max-w-2xl mx-auto rounded-lg shadow-lg">
        <p class="text-gray-100 mb-4">{{ note.content.join(' ') }}</p>
        <button @click="showModal = true" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition-colors">Modifier</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center text-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Modifier le Post-it</h2>
        <form @submit.prevent="updateNote">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Titre:</label>
            <input type="text" v-model="note.title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Contenu:</label>
            <textarea v-model="note.content[0]" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="showModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition-colors">Annuler</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/LoaderPage.vue';
import Navbar from '@/components/NavBar.vue';

export default {
  data() {
    return {
      note: null,
      loading: true,
      showModal: false,
    };
  },
  created() {
    this.fetchNote();
  },
  methods: {
    fetchNote() {
      let id = this.$route.params.id;
      fetch(`https://post-it.epi-bluelock.bj/notes/${id}`)
        .then(response => response.json())
        .then(data => {
          this.note = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching note:', error);
          this.loading = false;
        });
    },
    updateNote() {
      let id = this.$route.params.id;
      fetch(`https://post-it.epi-bluelock.bj/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.note)
      })
      .then(response => response.json())
      .then(data => {
        this.showModal = false;
        this.fetchNote();
      })
      .catch(error => console.error('Error updating note:', error));
    }
  },
  components: {
    Loader,
    Navbar
  }
};
</script>

<style scoped>
</style>
