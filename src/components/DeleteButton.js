import React, { Component } from 'react';
export default class DeleteButton extends Component {

    buttonClick = (e) => {
               console.log("Delete");
                let deletedRow = this.props.node.data;
                //  let rows = e.gridApi.getSelectedRows();
                // console.log("Seelect rows",rows);
                console.log(deletedRow);
                e.gridApi.updateRowData({ remove: [deletedRow] })  // It will update the row
            };

    render() {
        return (
            <span><button onClick={() => this.buttonClick(this.props.node)}>X</button></span>
        );
    }
}