export default function noteReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_NOTE':
      return [...state, {...action.notes}];
    default:
      return state;
  }
}
