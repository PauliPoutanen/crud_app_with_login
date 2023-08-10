import {useState} from 'react'
import HuutoKauppaRow from './huutokaupparow'
import RemoveHuutokauppa from './removehuutokauppa'
import EditHuutokauppa from './edithuutokauppa'

const HuutokauppaLista = (props) => {
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1
  })

  const changeMode = (mode, index) => {
    if (mode === "removehuutokauppa"){
      setState({
        removeIndex:index,
        editIndex:-1
      })
    }

    if (mode ==="edithuutokauppa"){
      setState({
        removeIndex:-1,
        editIndex: index

      })
    }

    if (mode ==="cancel"){
      setState({
        removeIndex:-1,				
        editIndex:-1

      })
    }
  }


  const removeHuutokauppa = (id) =>{
    props.removeHuutokauppa(id)
    changeMode("cancel")
  }

  const editHuutokauppa=(tapahtuma) =>{
    props.changeToEditMode(tapahtuma)
    changeMode("cancel")
  }


let tapahtumat = props.list.map((tapahtuma, index) =>{
  
  if (index ===state.removeIndex){
    return(
      <RemoveHuutokauppa key={tapahtuma._id} tapahtuma={tapahtuma} changeMode={changeMode} removeHuutokauppa={removeHuutokauppa} />
    )
  }
  
  if (state === state.editIndex){
    return (
      <EditHuutokauppa key={tapahtuma._id} tapahtuma={tapahtuma} changeMode={changeMode} editHuutokauppa={editHuutokauppa} />
    )
  }
  return (
    <HuutoKauppaRow key={tapahtuma._id} tapahtuma={tapahtuma} index={index} changeMode={changeMode} editHuutokauppa={editHuutokauppa} />
  )
})

return (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Mitä ja missä</th>
        <th>Alkaa</th>
        <th>Loppuu</th>
        <th>Tarjolla</th>
        <th>Osoite</th>
        <th>YhteysMaili</th>
        <th>Puhelin</th>
      </tr>
    </thead>
    <tbody>
      {tapahtumat}
    </tbody>
  </table>
);




}

export default HuutokauppaLista