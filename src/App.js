import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

   onToggleForm = () => {
      var {itemEdit} =this.props;
      if(itemEdit && itemEdit.id !== ''){
            this.props.onOpenForm();
      }else{
            this.props.onToggleForm();
      }
      this.props.onClearTask({
            id : '',
            name : '',
            status : false
      });
     
   }
   render() {
      
      var {isDisplayForm} = this.props;

     
      return (
         <div className="container">
            <div className="text-center">
               <h1> Quản Lí Hàng Hoá </h1> <hr/>
            </div>
            <div className="row">
                  {/*Form*/}
               <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
                  <TaskForm />
               </div>
               <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                  <button  type="button" 
                           className="btn btn-primary"
                           onClick={this.onToggleForm}
                  >
                     <span className="fa fa-plus mr-5"></span> Thêm Hàng
                  </button>
               {/*Search-Sort*/}
                  <Control  />
               <div className="row mt-15">
                  <TaskList />
               </div>
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = (state) => {
      return {
            isDisplayForm : state.isDisplayForm,
            itemEdit: state.itemEdit
      };
}
const mapDispatchToProps=(dispatch,props)=>{
      return {
            onToggleForm: ()=>{
                  dispatch(actions.toggleForm());
            },
            onClearTask:(task)=>{
                  dispatch(actions.editTask(task));
            },
            onOpenForm : ()=>{
			dispatch(actions.openForm());
		},
            
      };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
