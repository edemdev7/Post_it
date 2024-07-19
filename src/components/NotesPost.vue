<template>
  <div class="bg-gray-900 min-h-screen text-white">
    <Navbar />
    <div class="flex justify-center items-center min-h-screen">
      <Loader :loading="loading" />
      <div v-if="!loading" class="container mx-auto w-screen">
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-100">Liste des Post-it</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          <div v-for="note in paginatedNotes" :key="note._id" :class="getRandomBackgroundStyle()" class="shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 h-42 w-96 relative text-white">
            <router-link :to="'/note/' + note._id" class="block text-2xl font-semibold text-blue-600 hover:underline mb-4">
              {{ note.title.slice(0, 20) + "..." }}
            </router-link>
            <p class="text-white overflow-hidden">{{ note.content[0].slice(0, 180) + "..." }}</p>
            <button @click="confirmDelete(note._id)" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
          </div>
        </div>
        <div class="mt-8 text-center">
          <button @click="prevPage" :disabled="currentPage === 1" class="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">Précédent</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">Suivant</button>
        </div>
      </div>
    </div>
  </div>
   <!-- Modale de confirmation -->
   <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class=" p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Confirmation</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce post-it ?</p>
        <div class="flex justify-end mt-4">
          <button @click="showConfirmModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition-colors">Annuler</button>
          <button @click="confirmDeleteNote" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Supprimer</button>
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
      notesPerPage: 12,
      showConfirmModal: false,
      noteToDelete: null,
      actionInProgress: false,  
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
    this.setupAutoRefresh();
  },
  methods: {
    fetchNotes() {
      if (!this.actionInProgress) {  
        this.loading = true;
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
      }
    },
    setupAutoRefresh() {
      setInterval(() => {
        this.fetchNotes();
      }, 5000);
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
    confirmDelete(id) {
      this.noteToDelete = id;
      this.showConfirmModal = true;
      this.actionInProgress = true;  
    },
    confirmDeleteNote() {
      fetch(`https://post-it.epi-bluelock.bj/notes/${this.noteToDelete}`, {
        method: 'DELETE'
      })
      .then(() => {
        this.notes = this.notes.filter(note => note._id !== this.noteToDelete);
        this.showConfirmModal = false;
        this.noteToDelete = null;
        this.actionInProgress = false;  
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        this.showConfirmModal = false;
        this.actionInProgress = false;  
      });
    },
    getRandomBackgroundStyle() {
      const colors = ['bg-yellow-500', 'bg-orange-500', 'bg-green-500', 'bg-gray-500'];
      return colors[Math.floor(Math.random() * colors.length)];
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
