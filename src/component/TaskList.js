import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';
import * as actions from './../actions/index';


class TaskList extends Component {
	constructor(props){
		super(props);
		this.state={
			fillterName : '',
			fillterStatus : -1 //all:-1, active : 1 , deactive : 0 
		}
	}
	onChange=(e)=>{
		var target = e.target;
		var name = target.name;
		var value = target.value;
		
		var filter = {
			name: name ==='fillterName'?value:this.state.fillterName,
			status : name ==='fillterStatus'?value:this.state.fillterStatus
		};
		this.props.onFilterTable(filter);
		this.setState({
			[name] : value
		});
	}
   render() {
		   var {tasks,filterTable,keyword,sort} = this.props; // var tasks = this. props.tasks
		//filterTable
		if(filterTable.name){
			tasks = tasks.filter((task)=>{
				return task.name.toLowerCase().indexOf(filterTable.name.toLocaleLowerCase()) !== -1
			});
		}
		tasks = tasks.filter((task)=>{
			if( filterTable.status === -1 ){
				return tasks;
			}else{
				return task.status === (filterTable.status === 1 ? true:false);
			}
		});
		
		tasks= tasks.filter((task)=>{
			return task.name.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
		});
		var {fillterName,fillterStatus}=this.state;
		if(sort.by==='name'){
		tasks.sort((a,b)=>{
				if(a.name>b.name) return sort.value;
				else if(a.name<b.name) return -sort.value;
				else return 0;
		});
		}else{
		tasks.sort((a,b)=>{
				if(a.status>b.status) return -sort.value;
				else if(a.status<b.status) return sort.value;
				else return 0;
			});
      	}
   		var elmTasks = tasks.map((task,index)=>{
   		return <TaskItem 	key={task.id} 
   							index={index + 1} 
   							task={task}
   							
   		/>
	   });
	   
      	return(
         	<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	         	<table className="table table-bordered table-hover mt-15">
	            	<thead>
	               		<tr>
		                  	<th className="text-center">STT</th>
		                  	<th className="text-center">Tên</th>
		                  	<th className="text-center">Trạng Thái</th>
		                  	<th className="text-center">Hành Động</th>
		               	</tr>
		            </thead>
		            <tbody>
		               	<tr>
		                  	<td></td>
		                  	<td>
								 <input type="text" 
										name="fillterName"  
										className="form-control"
										value={fillterName}
										onChange = {this.onChange} 
										/>
		                  	</td>
		                  	<td>
								 <select 	name="fillterStatus"  
								 			className="form-control" 
											value={fillterStatus}
											onChange = {this.onChange}
								>
		                        	<option value={-1}>Tất cả</option>
		                        	<option value={0}>Ẩn</option>
		                        	<option value={1}>Kích Hoạt</option>
		                     	</select>
		                  	</td>
		                  	<td></td>
		               	</tr>
		               	{elmTasks}

	            	</tbody>
	     		</table>
 			</div>
      );
   }
}
const mapStateToProps = (state) =>{
	return {
		tasks : state.tasks,
		filterTable : state.filterTable,
		keyword :state.search,
		sort: state.sort
	}
}
const mapDispatchToProps=(dispatch,props)=>{
	return {
		onFilterTable : (filter) => {
			dispatch(actions.filterTask(filter))
		}
	  
		  
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
