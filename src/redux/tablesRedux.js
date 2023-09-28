import shortid from "shortid";
import { API_URL } from "../config";

export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId)

const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE')
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(API_URL + '/tables/')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};

export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch(API_URL + '/tables/', options)
      .then(() => dispatch(addTable(newTable)))
  }
}

export const editTableRequest = (number, status, people, maxPeople, bill, tableId) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number, status, people, maxPeople, bill })
    };
    fetch((API_URL + '/tables/' + tableId), options)
      .then(() => dispatch(editTable(number, status, people, maxPeople, bill)))
  }
}

export const removeTableRequest = (table) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ table })
    };
    fetch((API_URL + '/tables/' + table), options)
      .then(() => dispatch(removeTable(table)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case ADD_TABLE:
      return [...statePart, { id: shortid(), ...action.payload }];
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.tableId ? { ...table, ...action.payload } : table));
    case REMOVE_TABLE:
      return [...statePart.filter(table => table.id !== action.payload)];
    default:
      return statePart;
  };
};
export default tablesReducer;