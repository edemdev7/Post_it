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
        <p class="text-gray-100 mb-4">Contenu: {{ note.content.join(' ') }}</p>
        <router-link :to="'/edit/' + note._id" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition-colors">Modifier</router-link>
        <button @click="deleteNote" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Supprimer</button>
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
      loading: true
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
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching note:', error);
          this.loading = false;
        });
    },
    deleteNote() {
      let id = this.$route.params.id;
      fetch(`http://62.72.5.95:1999/notes/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error deleting note:', error);
        });
    }
  },
  components: {
    Loader,
    Navbar
  }
};
</script>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
</style>
