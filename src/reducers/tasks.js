import * as types from './../contants/actionType';

var s4=()=>{
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}
var guid=()=>{
    return s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4();
}
var findIndex=(tasks,id)=>{
    
    var resul =-1;
    tasks.forEach((task,index)=>{
       if(task.id === id){
          resul=index;  
       }
    });
    return resul;
 }
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var id ='';
var index = -1;
var myReducer =(state = initialState,action) =>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task ={
                id : action.task.id,
                name : action.task.name,
                status : (action.task.status === 'true' || action.task.status === true) ? true : false
            };
            if(!task.id){
                task.id = guid();
                state.push(task);
            }else{
                index = findIndex(state, task.id);
                state[index] = task;
            }
            
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
             id = action.id;      
             index = findIndex(state,id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            
            // var cloneTask ={...state[index]};
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;
           
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.DEL_TASK:
             id = action.id;
             index = findIndex(state, id);
            state.splice(index,1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default : return state;
    }
    
};

export default myReducer;