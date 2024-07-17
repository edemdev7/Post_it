<template>
  <div v-if="note">
    <h1>{{ note.title }}</h1>
    <p>{{ note.content.join(' ') }}</p>
  </div>
  <div v-else>
    <p>Post-it non trouvé.</p>
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
          this.note = data.notes.find(note => note._id === id) || null;
        })
        .catch(error => console.error('Error fetching note:', error));
    }
  }
};
</script>
