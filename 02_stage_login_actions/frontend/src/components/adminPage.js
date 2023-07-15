import React from 'react'
import HuutoKauppaLista from './auctionslist';

const AdminPage = (props) => {
  console.log("adminPage", props.editauc);

  return (
    <div>
      <HuutoKauppaLista list={props.list} removeHuutokauppa={props.removeHuutokauppa} changeToEditMode={props.changeToEditMode} />

    

    </div>
)

}

export default AdminPage