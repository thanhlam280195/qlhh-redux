import * as types from './../contants/actionType';



var initialState = false; //closeForm

var myReducer =(state = initialState,action) =>{
    switch(action.type){
        case types.TOGGLE_FORM:
            return !state;
        case types.OPEN_FORM:
            //state = true;
            return true;
        case types.CLOSE_FORM:
            //state =false;
            return false;
        default : return state;
    }
    
};

export default myReducer;