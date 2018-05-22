import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';



class TaskItem extends Component {
	onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
	onDel=()=>{
		this.props.onDel(this.props.task.id);
	}
	onEditTask=()=>{
		
		this.props.onOpenForm();
		this.props.onEditTask(this.props.task);
	}
   render() {
   	var {task,index} = this.props;
  		return (
    		<tr>
	          	<td>{index}</td>
	          	<td>{task.name}</td>
	          	<td className="text-center">
	             	<span 	className={task.status === true ? 'label label-success' : 'label label-danger' }
	             			onClick = {this.onUpdateStatus} >
	             	{task.status === true ? 'Kích Hoạt' : 'Ẩn'}
	             	</span>
	     		</td>
	      		<td className="text-center">
	         		<button type="button" className="btn btn-warning" onClick={this.onEditTask}>
	            		<span className="fas fa-pencil-alt mr-5"></span> Sửa
	         		</button>&nbsp;
	         		<button type="button" 
	         				className="btn btn-danger" 
	         				onClick={this.onDel}>
	            		<span className ="fas fa-trash-alt mr-5"></span> Xoá
	         		</button>
	      		</td>
	   		</tr>
      );
   }
}
const mapStateToProps=state=>{
	return {};
};
const mapDispatchToProps = (dispatch, props)=>{
	return {
		onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
		},
		onDel : (id)=>{
			dispatch(actions.delTask(id));
		},
		onOpenForm : ()=>{
			dispatch(actions.openForm());
		},
		onCloseForm : ()=>{
			dispatch(actions.closeForm());
		},
		onEditTask : (task) => {
			dispatch(actions.editTask(task));
		}
		  
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
