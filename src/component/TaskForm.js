import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';



class TaskForm extends Component {
   constructor(props){
      super(props);
      this.state={
         id:'',
         name:'',
         status :false
      }
   }
   componentWillMount(){
         
      if(this.props.itemEdit && this.props.itemEdit.id !== null){
         this.setState({
            id:this.props.itemEdit.id,
            name:this.props.itemEdit.name,
            status:this.props.itemEdit.status
         });
         
      }else{
            this.onClear();
      }
   }
   componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.itemEdit){
            this.setState({
               id:nextProps.itemEdit.id,
               name:nextProps.itemEdit.name,
               status:nextProps.itemEdit.status
            });
            
      }else {
            this.onClear();
            }
      }
   
   onCloseForm=()=>{
      this.props.onCloseForm();
   }
   onChange=(e)=>{
      var target = e.target;
      var name = target.name;
      var value = target.value;
      if(name ==='status'){
         value =target.value ==='true' ? true:false;
      }
      this.setState({
         [name]:value
      });
   }
   onSave=(e)=>{
      e.preventDefault();
      this.props.onSaveTask(this.state);
      this.onClear();

   }
   onClear=()=>{
      this.setState({
         name: '' ,
         status :false
      });
   }
   render() {
     
      if(!this.props.isDisplayForm) return null;  
      return (
         <div className="panel panel-warning">
            <div className="panel-heading">
               <h3 className="panel-title">
                  { !this.state.id ? 'Thêm Hàng Hóa' : 'Cập Nhật Hàng Hóa' }
                  <span className ="far fa-times-circle text-right"
                        onClick={this.onCloseForm}
                  ></span>
               </h3>
            </div>
            <div className="panel-body">
               <form onSubmit={this.onSave}>
                  <div className="form-group">
                     <label>Tên hàng :</label>
                     <input   type="text"
                              className="form-control"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                     />
                  </div>
                  <label>Trạng thái :</label>
                  <select  name="status"
                           className="form-control"
                           value={this.state.status}
                           onChange={this.onChange} 
                  >
                     <option value={true}>Kích Hoạt</option>
                     <option value={false}>Ẩn</option>
                  </select>
                  <br/>
                  <div className="text-center">
                     <button type="submit" className="btn btn-warning">
                        <span className ="fas fa-plus mr-5"></span>Lưu lại
                     </button>&nbsp;
                     <button type="button" className="btn btn-danger" onClick={this.onClear}>
                        <span className ="far fa-window-close mr-5"></span>Xoá
                     </button>
                  </div>
               </form>
            </div>
         </div>
         
      );
   }
}
const mapStateToProps =(state)=>{
      return{
            isDisplayForm : state.isDisplayForm,
            itemEdit : state.itemEdit
      }
};
const mapDispatchToProps= (dispatch,props)=>{
      return {
            onSaveTask : (task)=>{
                  dispatch(actions.saveTask(task));
            },
            onCloseForm : ()=>{
                  dispatch(actions.closeForm());
            }
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
