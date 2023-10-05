<template>
  <div id="app">
    <FormKit type="form" v-model="formData" @submit="register">
      <FormKitSchema :schema="schema3" />
    </FormKit>

    <pre>
      {{ formData }}
    </pre>
    <pre>
      {{ schema3 }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      formSelected: false,
      formData: {
        DateCreated: '2023-08-30T19:07',
      },
      // schema: [
      //   {
      //     $el: 'h1',
      //     children: 'Register',
      //   },
      //   {
      //     $formkit: 'text',
      //     name: 'email',
      //     label: 'Email',
      //     help: 'This will be used for your account.',
      //     validation: 'required|email',
      //   },
      //   {
      //     $formkit: 'password',
      //     name: 'password',
      //     label: 'Password',
      //     help: 'Enter your new password.',
      //     validation: 'required|length:5,16',
      //   },
      //   {
      //     $formkit: 'password',
      //     name: 'password_confirm',
      //     label: 'Confirm password',
      //     help: 'Enter your new password again to confirm it.',
      //     validation: 'required|confirm',
      //     validationLabel: 'password confirmation',
      //   },
      //   {
      //     $cmp: 'FormKit',
      //     props: {
      //       name: 'eu_citizen',
      //       type: 'checkbox',
      //       id: 'eu',
      //       label: 'Are you a european citizen?',
      //     },
      //   },
      //   {
      //     $formkit: 'select',
      //     if: '$get(eu).value', // 👀 Oooo, conditionals!
      //     name: 'cookie_notice',
      //     label: 'Cookie notice frequency',
      //     options: {
      //       refresh: 'Every page load',
      //       hourly: 'Ever hour',
      //       daily: 'Every day',
      //     },
      //     help: 'How often should we display a cookie notice?',
      //   },
      // ],
      // schema2: [
      //   {
      //     $formkit: 'text',
      //     name: 'ID',
      //     label: 'ID',
      //     help: 'Please enter ID',
      //     validation: '',
      //   },
      //   {
      //     $formkit: 'text',
      //     name: 'Name',
      //     label: 'Name',
      //     help: 'Please enter Name',
      //     validation: '',
      //   },
      //   {
      //     $formkit: 'text',
      //     name: 'Occupation',
      //     label: 'Occupation',
      //     help: 'Please enter Occupation',
      //     validation: '',
      //   },
      //   {
      //     $formkit: 'text',
      //     name: 'OccupationID',
      //     label: 'OccupationID',
      //     help: 'Please enter OccupationID',
      //     validation: '',
      //   },
      //   {
      //     $cmp: 'FormKit',
      //     props: {
      //       id: 'IsEnabled',
      //       name: 'IsEnabled',
      //       type: 'checkbox',
      //       label: 'IsEnabled',
      //     },
      //   },
      //   {
      //     $formkit: 'datetime-local',
      //     name: 'DateCreated',
      //     label: 'DateCreated',
      //     help: 'Please enter DateCreated',
      //     validation: '',
      //   },
      //   {
      //     $formkit: 'datetime-local',
      //     name: 'DateUpdated',
      //     label: 'DateUpdated',
      //     help: 'Please enter DateUpdated',
      //     validation: '',
      //   },
      // ],
      schema3: [
  {
    "$formkit": "text",
    "name": "id",
    "label": "id",
    "help": "Please enter id",
    "validation": ""
  },
  {
    "$formkit": "text",
    "name": "tt",
    "label": "tt",
    "help": "Please enter tt",
    "validation": ""
  },
  {
    "$formkit": "text",
    "name": "link",
    "label": "link",
    "help": "Please enter link",
    "validation": ""
  },
  {
    "$formkit": "text",
    "name": "order",
    "label": "order",
    "help": "Please enter order",
    "validation": ""
  },
  {
    "$cmp": "FormKit",
    "props": {
      "id": "published",
      "name": "published",
      "type": "checkbox",
      "label": "published"
    }
  },
  {
    "$formkit": "text",
    "name": "lang",
    "label": "lang",
    "help": "Please enter lang",
    "validation": ""
  }
]
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
  },
};
</script>

<style>
.rowSelect:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
