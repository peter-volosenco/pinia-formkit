<template>
  <div id="app">
    <div style="display: flex">
      <table border="1" style="width: 320px">
        <tr>
          <td :key="n" v-for="n in Object.keys(clientsState.clients[0])">
            {{ n }}
          </td>
        </tr>
        <tr
          class="rowSelect"
          v-for="n in clientsState.clients"
          @click="(event) => rowSelect(n)"
        >
          <td :key="m" v-for="m in Object.keys(clientsState.clients[0])">
            {{ n[m] }}
          </td>
        </tr>
      </table>
      <div>
        <div>
          <div :key="n" v-for="n in Object.keys(form)" style="width: 80px">
            <input v-model="form[n]" type="text" :placeholder="n" />
          </div>
          <input type="button" value="create" @click="(event) => rowCreate()" />
          <input type="button" value="clear" @click="(event) => rowClear()" />
          <input type="button" value="delete" @click="(event) => rowDelete()" />
          <br />
          <pre>{{ JSON.stringify(form, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <smart-grid id="grid"></smart-grid>
    <!-- <pre>{{ JSON.stringify(clientsState, null, 2) }}</pre> -->
  </div>
</template>

<script>
import 'smart-webcomponents/source/styles/smart.default.css';
import 'smart-webcomponents/source/modules/smart.grid.js';

import {
  useClientStore,
  ClientPayloadDelete,
  ClientPayloadUpdate,
  ClientPayloadCreate,
  ClientPayloadSelect,
  ClientPayloadClear,
} from './stores/clientStore';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'App',
  data() {
    return {
      formSelected: false,
      form: {
        id: '',
        firstName: '',
        lastName: '',
        company: '',
      },
      data: {},
    };
  },
  computed: {
    ...mapState(useClientStore, ['clientsState']),
  },
  methods: {
    ...mapActions(useClientStore, ['dispatch']),
    rowSelect(n) {
      this.formSelected = true;
      this.form = n;
    },
    rowCreate() {
      let self = this;

      self.dispatch(
        new ClientPayloadCreate(
          self.form.firstName,
          self.form.lastName,
          self.form.company
        )
      );

      self.rowClear();
    },
    rowClear() {
      this.form = {
        id: '',
        firstName: '',
        lastName: '',
        company: '',
      };
      this.formSelected = false;
    },
    rowDelete() {
      let self = this;
      self.dispatch(new ClientPayloadDelete(self.form.id));
    },
    async register() {
      await new Promise((r) => setTimeout(r, 2000));
      alert('Account created!');
    },
  },
  mounted() {
    const self = this;
    const store = useClientStore();

    console.log('store mounted :>>>', store);

    const callback = ({
      name, // name of the action
      store, // store instance, same as `someStore`
      args, // array of parameters passed to the action
      after, // hook after the action returns or resolves
      onError, // hook if the action throws or rejects
    }) => {
      console.log(
        `Start "${name}" with params [${JSON.stringify(args, null, 2)}].`
      );

      // this will trigger if the action succeeds and after it has fully run.
      // it waits for any returned promised
      after((result) => {
        grid.dataSource = self.clientsState.clients;
      });
    };

    store.$onAction(callback);

    // let self = this;
    // self.dispatch(
    //   new ClientPayloadUpdate('2', 'test 6', 'client 7', 'testcompany')
    // );
    // self.dispatch(new ClientPayloadCreate('PETER', 'PETER', 'PETER'));
    // self.dispatch(new ClientPayloadSelect('1'));
    // self.dispatch(new ClientPayloadSelect('2'));
    // self.dispatch(new ClientPayloadClear());

    console.log('mounted ::>> computed', this.clientsState);
    const generateData = this.clientsState.clients;

    window.Smart(
      '#grid',
      class {
        get properties() {
          return {
            behavior: {
              columnResizeMode: 'growAndShrink',
            },
            appearance: {
              alternationCount: 2,
              showRowHeader: true,
              showRowHeaderSelectIcon: true,
              showRowHeaderFocusIcon: true,
            },
            paging: {
              enabled: true,
            },
            pager: {
              visible: true,
            },
            sorting: {
              enabled: true,
            },
            editing: {
              enabled: true,
            },
            summaryRow: {
              visible: true,
              editing: true,
            },
            selection: {
              enabled: true,
              allowCellSelection: true,
              allowRowHeaderSelection: true,
              allowColumnHeaderSelection: true,
              mode: 'extended',
            },
            dataSource: new window.Smart.DataAdapter({
              dataSource: generateData,
              dataFields: [
                'id: number',
                'firstName: string',
                'lastName: string',
                'company: string',
              ],
            }),
            columns: [
              {
                label: 'First Name',
                dataField: 'firstName',
              },
              {
                label: 'Last Name',
                dataField: 'lastName',
              },
              {
                label: 'Company',
                dataField: 'company',
              },
            ],
          };
        }
      }
    );
  },
};
</script>

<style>
.rowSelect:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
