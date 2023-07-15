import {useState} from 'react'

const EditHuutokauppa =(props) => {

const [state, setState] = useState({
"huutokauppa_name":props.tapahtuma.huutokauppa_name,
"huutokauppa_date_start": props.tapahtuma.huutokauppa_date_start,
"huutokauppa_date_end": props.tapahtuma.huutokauppa_date_end,
"huutokauppa_descripton":props.tapahtuma.huutokauppa_description,
"huutokauppa_address":props.tapahtuma.huutokauppa_address,
"huutokauppa_email":props.tapahtuma.huutokauppa_email,
"huutokauppa_phone":props.tapahtuma.huutokauppa_phone

})

const handleChange =(event) => {
    const { name, value }=event.target
    setState((prevState)=>({
        ...prevState,
        [name]:value
    }))
}


const editHuutokauppa = () => {
    const tapahtuma = {
      ...state,
    _id: props.tapahtuma._id,
 
};
    props.editHuutokauppa(tapahtuma);
  };

return (

        <div style={{
          backgroundColor: 'lightblue',
          margin: 'auto',
          width: '70%',
          textAlign: 'center',
        }}>
          <form className="mb-3">
            <label htmlFor="huutokauppa_name" className="form-label">
              <b>Tapahtuman nimi</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="huutokauppa_name"
              id="huutokauppa_name"
              onChange={handleChange}
              value={state.huutokauppa_name}
            />
      
            <label htmlFor="huutokauppa_description" className="form-label">
              <b>Tapahtumatiedot</b>
            </label>
            <textarea
              className="form-control"
              name="huutokauppa_description"
              id="huutokauppa_description"
              onChange={handleChange}
              value={state.huutokauppa_description}
            />
      
            <label htmlFor="huutokauppa_address" className="form-label">
              <b>Osoite</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="huutokauppa_address"
              id="huutokauppa_address"
              onChange={handleChange}
              value={state.huutokauppa_address}
            />
      
            <label htmlFor="huutokauppa_email" className="form-label">
              <b>Järjestäjän email</b>
            </label>
            <input
              type="email"
              className="form-control"
              name="huutokauppa_email"
              id="huutokauppa_email"
              onChange={handleChange}
              value={state.huutokauppa_email}
            />
      
            <label htmlFor="huutokauppa_phone" className="form-label">
              <b>Tapahtuman yhteysnumero</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="huutokauppa_phone"
              id="huutokauppa_phone"
              onChange={handleChange}
              value={state.huutokauppa_phone}
            />
      
            
      
          </form>
          <button className="btn btn-primary" onClick={editHuutokauppa}>
            Edit Huutokauppa
          </button>
        </div>
      
      
)




}


export default EditHuutokauppa



