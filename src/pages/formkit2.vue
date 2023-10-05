<template>
  <div id="app">
    <FormKit type="form" v-model="data" @submit="register">
      <FormKitSchema :schema="schema" />
    </FormKit>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: {},
      schema: [
        {
          $formkit: 'text',
          name: 'ID',
          label: 'ID',
          help: 'Book id',
          validation: 'required|length:2,4',
        },
        {
          $formkit: 'text',
          name: 'Book Title',
          label: 'Book Title',
          help: 'Write book title',
          validation: 'required|',
        },
        {
          $formkit: 'text',
          name: 'Notes',
          label: 'Notes',
          help: 'Write some news about the book.',
          validation: 'length:8,12',
        },
      ],
    };
  },
  methods: {
    async register() {
      await new Promise((r) => setTimeout(r, 2000));
      alert('Account created!');
    },
  },
  mounted() {
    const self = this;

    // this.schema.push({
    //   $el: 'h1',
    //   children: 'Register',
    // });
  },
};
</script>

<style>
.rowSelect:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
