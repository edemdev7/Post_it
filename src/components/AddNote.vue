<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Ajouter un nouveau Post-it</h1>
    <form @submit.prevent="addNote">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Titre:</label>
        <input type="text" v-model="title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Contenu:</label>
        <textarea v-model="content" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
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
        fetch('http://62.72.5.95:1999/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNote)
        })
        .then(response => response.json())
        .then(data => {
          this.$router.push('/');
        })
        .catch(error => console.error('Error adding note:', error));
      }
    }
  };
  </script>



