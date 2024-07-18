<template>
    <nav class="bg-blue-600 p-4 w-screen">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-white text-xl font-bold">Post-it App</router-link>
        <div>
          <router-link to="/" class="text-white mx-2 hover:underline">Home</router-link>
          <router-link to="/add" class="text-white mx-2 hover:underline">Ajouter un Post-it</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style scoped>
  </style>
  