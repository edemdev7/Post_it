<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="container mx-auto w-screen">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-100">Liste des Post-it</h1>
      <div class="grid grid-cols-4 gap-4 mx-auto">
        <div v-for="note in paginatedNotes" :key="note._id" class="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 w-96 h-48">
          <router-link :to="'/note/' + note._id" class="block text-2xl font-semibold text-blue-600 hover:underline mb-4">
            {{ note.title }}
          </router-link>
          <p class="text-gray-700">{{ note.content[0] }}</p>
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
</template>

<script>
export default {
  data() {
    return {
      notes: [],
      currentPage: 1,
      notesPerPage: 8,
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
      fetch('http://62.72.5.95:1999/notes')
        .then(response => response.json())
        .then(data => {
          this.notes = data.notes;
        })
        .catch(error => console.error('Error fetching notes:', error));
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
    }
  }
};
</script>
