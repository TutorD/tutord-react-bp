import {createSelector} from 'reselect';

const selectQuestionSets = state => state.app.questionSets.data;

export const selectQuestionSetById = createSelector(
  [selectQuestionSets],
  (questionSets) => {
    return questionSets;
  }
);

