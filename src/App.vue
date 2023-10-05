<template>
  <div id="app">
    <formkit />
  </div>
</template>

<script>
import formkit from './pages/formkit1.vue';
export default {
  components: {
    formkit,
  },
  data() {
    return {
      formSelected: false,
      data: {},
    };
  },
  mounted() {},
};
</script>
