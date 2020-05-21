import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import DeleteButton from './DeleteButton';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Home extends Component {
	constructor(props) {
		super(props);
this.arrayToUpdate = [];
		this.state = {
      authenticated : false,
      list: null,
      columns : [{  
        headerName: 'Title',  
        field: 'title',
        checkboxSelection: true,
        cellStyle: {color: 'red'}
        
        },{  
          headerName: 'URL',  
          field: 'uri',
          cellStyle: this.changeRowColor
        },
        {  
          headerName: 'Time',  
          field: 'age',
          sort: 'desc',
          },
          {  
            headerName: 'Upvotes',  
            field: 'points'  
            },
            {  
              headerName: 'Comments',  
              field: 'comments'  
              },
              // {
              //   headerName: 'Author',
              //   field: 'author'
              // },
              {
                headerName:"Delete",
                cellRendererFramework: DeleteButton
              }
        
      
      ] ,
      rowSelection: 'multiple',
      // autoGroupColumnDef: {
      //   headerName: 'Title',
      //   field: 'title',
      //   minWidth: 250,
      //   cellRenderer: 'agGroupCellRenderer',
      //   cellRendererParams: { checkbox: true },
      //   cellStyle: "blue"
      // },
      
		};
       
  }
  
   changeRowColor = (params) =>{

    if(params.node.data['read'] === true){
       return {'background-color': 'yellow'};    
    } 
 
 }

  onSelectionChanged = (event) => {
    console.log("hello");
    // let selectdata = event.api.getSelectedNodes();
    // let selectedRow = event.api.getSelectedRows();
    let rows = event.api.getSelectedNodes();
    for(let i=0; i<rows.length;i++){
       rows[i].data['read'] = true;
       this.arrayToUpdate.findIndex(x => x._id === rows[i].data['_id']) === -1 ? this.arrayToUpdate.push(rows[i].data) : console.log("This item already exists");

      //  this.updateData(rows[i].data);
    }
    if(rows.length > 0)
    console.log(rows[rows.length - 1]);
  else
    console.log('No rows selected');
}
  componentDidMount() {
  
    if(this.props.location.state !== undefined){
        console.log(this.props.location);
        this.setState({
            authenticated: this.props.location.state.authenticated,
          }, () =>{

            fetch('/api/data')
            .then(response => {
              return response.json()
            })
            .then(data => {
              // Work with JSON data here
              console.log("Response from json",data);
              this.setState({list: data}, () => console.log("my data",this.state));
            })
            .catch(err => {
              console.error(err);
              alert('Error getting data from api please try again');
            });

          });
    }
    
  }

  login = () => {
    this.props.history.push('/');
  }

  logout = () => {
    this.props.history.push('/');
  }
  getRowStyle = (params) => {
    // console.log("row param",params)
    if (params.node.data['age'] === "8 hours ago") {
      return {'background-color': 'red'}
    }

  
};

updateData = () =>{
  console.log("final array", this.arrayToUpdate);
  for(let i =0; i<this.arrayToUpdate.length;i++){

    fetch('/api/update', {
      method: 'POST',
      body: JSON.stringify(this.arrayToUpdate[i]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
       alert("user updated");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error Updating please try again');
    });
  

  }
 
}

 
  render() {
    //  const { currentUserEmail, currentUserName } = this.state;
    

      
   

     const mainContent = this.state.authenticated && this.state.list !== null ? (
        <div className="ag-theme-alpine"
        style={{ height: '600px', width: '1200px' }}>
          
            You have entered the staff portal,{' '}
            <button className="btn btn-light btn-lg" onClick={this.updateData}>
            Read
          </button>
            <AgGridReact
                    
                    
                    columnDefs={this.state.columns}
                    enableFilter={true}
                    enableSorting={true}
                    suppressRowClickSelection={true}
                    rowSelection={this.state.rowSelection}
                    rowData={this.state.list}
                  
                    enableCellChangeFlash={true}
                    onSelectionChanged={this.onSelectionChanged}>
                </AgGridReact>
          
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            You are not logged in, please login in order to view the content.
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );
     

    return (
       
      
      <div className="jumbotron">
        <h1 className="display-4">Hacker News Updates</h1>
        {mainContent}
      </div>
      
    );
  }
}

export default Home;