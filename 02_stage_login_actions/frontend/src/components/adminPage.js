import React from 'react'
import HuutoKauppaLista from './auctionslist';
import NewHuutoKauppaForm from './newhuutokauppaform';

const AdminPage = (props) => {
console.log("Admin", props.editauc)

  return (
    <div>
      <NewHuutoKauppaForm addHuutokauppa={props.addHuutokauppa} mode={props.mode} editauc={props.editauc} editHuutokauppa={props.editHuutokauppa} />

      <HuutoKauppaLista list={props.list} removeHuutokauppa={props.removeHuutokauppa} changeToEditMode={props.changeToEditMode} />

    

    </div>
)

}

export default AdminPage