const { v4: uuidv4 } = require('uuid');
import { defineStore } from 'pinia';

const CLIENT_LOAD = '[Client] Load';
const CLIENT_CREATE = '[Client] Create';
const CLIENT_UPDATE = '[Client] Update';
const CLIENT_DELETE = '[Client] Delete';
const CLIENT_SELECT = '[Client] Select';
const CLIENT_CLEAR = '[Client] Clear';

const clients = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme, Inc',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Super, Inc',
  },
];

const newClient = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

const initialState = {
  clientState: {
    clients,
    currentClient: newClient,
  },
};

export const useClientStore = defineStore('clientsStore', {
  state: () => initialState,
  getters: {
    clientsState: (state) => state.clientState,
  },
  actions: {
    dispatch(payload) {
      console.log('------dispatch-------');
      // console.log('payload', payload);
      let action = new Action(payload);
      // console.log('action', action);
      let stateUpdate = reducer(this.clientsState, action);
      // console.log('stateUpdate', stateUpdate);

      this.clientsState.clients = stateUpdate.clients;
      this.clientsState.currentClient = stateUpdate.currentClient;

      // console.log('------End-------');
      // console.log('');
    },
  },
});

// -------------------------------------------------------------------
// REDUCER
// -------------------------------------------------------------------
const selectClient = (state, payload) => {
  return {
    clients: state.clients,
    currentClient: state.clients.find((client) => client.id == payload.id),
  };
};

const clearClient = (state, payload) => {
  return {
    clients: state.clients,
    currentClient: newClient,
  };
};

const createClient = (state, payload) => {
  const newClient = Object.assign({}, payload, {
    id: String(uuidv4()).slice(0, 6),
  });
  return {
    clients: [...state.clients, newClient],
    currentClient: state.currentClient,
  };
};

const updateClient = (state, payload) => {
  return {
    clients: state.clients.map((client) => {
      return client.id === payload.id
        ? Object.assign({}, client, payload)
        : client;
    }),
    currentClient: state.currentClient,
  };
};

const deleteClient = (state, payload) => {
  return {
    clients: state.clients.filter((client) => client.id !== payload.id),
    currentClient: state.currentClient,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLIENT_LOAD:
      return state;
    case CLIENT_SELECT:
      return selectClient(state, payload);
    case CLIENT_CREATE:
      return createClient(state, payload);
    case CLIENT_UPDATE:
      return updateClient(state, payload);
    case CLIENT_DELETE:
      return deleteClient(state, payload);
    case CLIENT_CLEAR:
      return clearClient(state, payload);
    default:
      return state;
  }
};

/**
 * Store payload definitions/ classes
 */
class Client {
  constructor(id, firstname, lastname, company) {
    this.id = id;
    this.firstName = firstname;
    this.lastName = lastname;
    this.company = company;
  }
}

export class ClientPayloadSelect extends Client {
  constructor(id) {
    super(id);
  }
}

export class ClientPayloadCreate extends Client {
  constructor(firstname, lastname, company) {
    super(null, firstname, lastname, company); // Since "id" is assigned automatically by the system, we can pass "null" here.
  }
}

export class ClientPayloadUpdate extends Client {
  constructor(id, firstname, lastname, company) {
    super(id, firstname, lastname, company);
  }
}

export class ClientPayloadDelete extends Client {
  constructor(id) {
    super(id);
  }
}
export class ClientPayloadClear extends Client {}
export class ClientPayloadLoad extends Client {}

export class Action {
  constructor(payload) {
    this.payload = payload;
    this.type = this.getTypeFromPayload(payload);
  }

  getTypeFromPayload(payload) {
    const payloadClass = payload.constructor.name;

    switch (payloadClass) {
      case 'ClientPayloadSelect':
        return CLIENT_SELECT;
      case 'ClientPayloadCreate':
        return CLIENT_CREATE;
      case 'ClientPayloadUpdate':
        return CLIENT_UPDATE;
      case 'ClientPayloadDelete':
        return CLIENT_DELETE;
      case 'ClientPayloadClear':
        return CLIENT_CLEAR;
      case 'ClientPayloadLoad':
        return CLIENT_LOAD;
      default:
        throw new Error(`Invalid payload class: ${payloadClass}`);
    }
  }
}
