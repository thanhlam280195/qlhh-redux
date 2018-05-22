import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEdit from './itemEdit';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';
const myReducer = combineReducers({
    tasks, //tasks:tasks
    isDisplayForm, //isDisplayForm : isDisplayForm
    itemEdit, //itemEditting : itemEditting
    filterTable,
    search,
    sort

});

export default myReducer;