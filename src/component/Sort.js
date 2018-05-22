import React, { Component } from 'react';
import * as actions from './../actions/index';
import {connect} from 'react-redux';



class Sort extends Component {
	
	
	onClick=(sortBy,sortValue)=>{
		
		this.props.onSort({
			by : sortBy,
			value : sortValue
		});
	}
   render() {
	   
      return (
		<div className ="dropdown">
            <button
             	className="btn btn-primary dropdown-toggle"
             	type="button"
    		 	id="dropdownMenu1"
         		data-toggle ="dropdown"
             	aria-haspopup ="true"
             	aria-expanded ="true"
            >
               Sắp Xếp <span className="fas fa-caret-square-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
               	<li onClick={()=>this.onClick('name',1)}>
				   <a role="button" className={(this.props.sort.by==='name'&&this.props.sort.value===1)?'sort_selected':''} >
                     	<span className="fas fa-sort-alpha-down pr-5">
                        	Tên A-Z
                     	</span>
                  	</a>
               	</li>
               	<li onClick={()=>this.onClick('name',-1)}>
				   	<a role="button" className={(this.props.sort.by==='name'&&this.props.sort.value===-1)?'sort_selected':''} >
                     	<span className="fas fa-sort-alpha-up pr-5">
                        	Tên Z-A
                     	</span>
                  	</a>
               	</li>
               	<li role= "separator" className="divider"></li>
               	<li onClick={()=>this.onClick('status',1)}>
				   <a role="button" className={(this.props.sort.by==='status'&&this.props.sort.value===1)?'sort_selected':''} >
                     	Trạng thái kích hoạt
                  	</a>
               	</li>
               	<li onClick={()=>this.onClick('status',-1)}>
				   <a role="button" className={(this.props.sort.by==='status'&&this.props.sort.value===-1)?'sort_selected':''} >
                     	Trạng thái ẩn
                  	</a>
               	</li>
        	</ul>
     	</div>
      );
   }
}
const mapStateToProps = state =>{
	return {
		sort: state.sort
	}
}
const mapDispatchToProps=(dispatch,props)=>{
    return {
          onSort: (sort)=>{ //sort.by sort.value
                dispatch(actions.sortTask(sort));
          }
          
     
          
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Sort);
