import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';



class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword:''
        }
    }
    onChange=(e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        });
    }
    onSearch=()=>{
        this.props.onSearch(this.state.keyword);
    }
   render() {
       var {keyword}=this.state;
      return (
     	<div className="input-group">
         	<input  type="text" 
					name="keyword"  
                    className="form-control" 
                    placeholder="Nhập từ khoá...."
                    value={keyword}
                    onChange={this.onChange}
            />
            <span className="input-group-btn">
                <button type="button" className="btn btn-primary" onClick={this.onSearch}>
                    <span className ="fas fa-search mr-5"></span>Tìm
                </button>
            </span>
        </div>
      );
   }
}

const mapDispatchToProps=(dispatch,props)=>{
    return {
          onSearch: (keyword)=>{
                dispatch(actions.searchTask(keyword));
          }
          
     
          
    };
}

export default connect(null,mapDispatchToProps)(Search);
