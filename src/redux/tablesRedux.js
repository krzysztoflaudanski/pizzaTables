import shortid from "shortid";

//selectors

export const getAllTables = ({tables}) => tables; 
export const getTableById = ({tables}, tableId) => tables.find(table => table.id === tableId)

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE')

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({type: ADD_TABLE, payload});
export const editTable = payload => ({type: EDIT_TABLE, payload});

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};

export const addTableRequest = (newTable) => {
  return(dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch('http://localhost:3131/tables', options)
    .then(() => dispatch(addTable(newTable)))
  }
}

export const editTableRequest = (number, status, people, maxPeople, bill, tableId) => {
  //console.log(tableId)
  return(dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(number, status, people, maxPeople, bill)
    };
    fetch(('http://localhost:3131/tables/' + tableId), options)
      .then(() => dispatch(editTable(number, status, people, maxPeople, bill)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
      case ADD_TABLE:
      return [...statePart, { id: shortid(), ...action.payload }];
      case EDIT_TABLE:
      return statePart.map(table =>(table.id === action.payload.tableId ? {...table, ...action.payload} : table)); 
    default:
      return statePart;
  };
};
export default tablesReducer;