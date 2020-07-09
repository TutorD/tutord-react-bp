export const GET_QUESTION_SETS_PENDING = 'app/question-sets/GET_QUESTION_SETS_PENDING';
export const GET_QUESTION_SETS_SUCCESS = 'app/question-sets/GET_QUESTION_SETS_SUCCESS';
export const GET_QUESTION_SETS_FAILURE = 'app/question-sets/GET_QUESTION_SETS_FAILURE';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
};

export const pending = () => ({
  type: GET_QUESTION_SETS_PENDING,
});

export const success = (payload) => ({
  type: GET_QUESTION_SETS_SUCCESS,
  payload,
});

export const failure = error => ({
  type: GET_QUESTION_SETS_FAILURE,
  payload: error,
  error: true,
});

export default function questionSets(state=initialState, action) {
  switch (action.type) {
    case GET_QUESTION_SETS_PENDING:
      return {...state, isLoading: false};
    case GET_QUESTION_SETS_FAILURE:
      return {...state, isLoading: false, error: action.payload, data: initialState.data};
    case GET_QUESTION_SETS_SUCCESS:
      return {...state, isLoading: false, data: action.payload};
    default:
      return state;
  }
};

export const findById = (list, id) => list.find(qs => qs.id === id);
