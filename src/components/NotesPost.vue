<template>
  <div class="bg-gray-900 min-h-screen">
    <Navbar />
    <div class="flex justify-center items-center min-h-screen">
      <Loader :loading="loading" />
      <div v-if="!loading" class="container mx-auto w-screen">
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-100">Liste des Post-it</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          <div v-for="note in paginatedNotes" :key="note._id" :style="getRandomBackgroundStyle()" class="  bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 h-42 w-96  relative">
            <router-link :to="'/note/' + note._id" class="block text-2xl font-semibold text-blue-600 hover:underline mb-4">
              {{ note.title.slice(0, 40) + "..." }}
            </router-link>
            <p class="text-gray-700 overflow-hidden">{{ note.content[0].slice(0, 180) + "..." }}</p>
            <button @click="deleteNote(note._id)" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
          </div>
        </div>
        <div class="mt-8 text-center">
          <button @click="prevPage" :disabled="currentPage === 1" class="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">Précédent</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">Suivant</button>
        </div>
        <div class="mt-8 text-center">
          <router-link to="/add" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Ajouter un nouveau Post-it
          </router-link>
        </div>
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
      notes: [],
      loading: true,
      currentPage: 1,
      notesPerPage: 12
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.notes.length / this.notesPerPage);
    },
    paginatedNotes() {
      const start = (this.currentPage - 1) * this.notesPerPage;
      const end = start + this.notesPerPage;
      return this.notes.slice(start, end);
    }
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      fetch('https://post-it.epi-bluelock.bj/notes')
        .then(response => response.json())
        .then(data => {
          this.notes = data.notes;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching notes:', error);
          this.loading = false;
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    deleteNote(id) {
      fetch(`https://post-it.epi-bluelock.bj/notes/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.notes = this.notes.filter(note => note._id !== id);
        })
        .catch(error => {
          console.error('Error deleting note:', error);
        });
    },
    getRandomBackgroundStyle() {
      const colors = ['bg-blue-200', 'bg-orange-200', 'bg-green-200', 'bg-gray-900'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        backgroundColor: randomColor
      };
    }
  },
  components: {
    Loader,
    Navbar
  }
};
</script>

<style scoped>
.clip-polygon {
  clip-path: polygon(100% 0%, 100% 50%, 50% 100%, 0% 50%);
}
</style>
