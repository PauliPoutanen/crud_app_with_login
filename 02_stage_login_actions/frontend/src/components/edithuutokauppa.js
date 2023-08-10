import {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import '../styles/styles.css';

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
  setState((state)=>{
    return{
      ...state,
      [event.target.name]:event.target.value    
    }
  })
}
const onDateChange = (date, fieldName) => {
  setState((prevState) => ({
    ...prevState,
    [fieldName]: date ? moment(date).toDate() : null
  }));
};



const editHuutokauppa = () => {
    let tapahtuma = {
      ...state,
    _id:props.tapahtuma._id,
 
};
    props.editHuutokauppa(tapahtuma);
  };

return (
<div>
  <form className="form-container" >
	<label htmlFor="huutokauppa_name" className="form-label"><b>Tapahtuman nimi</b></label>
	<input type="text" className="form-control"
    name="huutokauppa_name"
	  id="huutokauppa_name" 
    onChange={handleChange}
	  value={state.huutokauppa_name}/>

<div className="date-inputs">
<div className="date-input">
<label htmlFor="huutokauppa_date_start" className="form-label"><b>Tapahtuma alkaa</b>
          </label>
            <DatePicker
                    selected={state.huutokauppa_date_start}
                    onChange={(date) => onDateChange(date, 'huutokauppa_date_start')}
              // Other DatePicker props
              className="date-picker"
            />
          </div>
          <div className="date-input">
            <label htmlFor="huutokauppa_date_end" className="form-label">
              <b>Tapahtuma päättyy</b>
            </label>
            <DatePicker
                    selected={state.huutokauppa_date_end}
                    onChange={(date) => onDateChange(date, 'huutokauppa_date_end')}
              // Other DatePicker props
              className="date-picker"
            />
          </div>
        </div>


        <label htmlFor="huutokauppa_description" className="form-label">
          <b>Tapahtumatiedot</b>
        </label>
        <textarea
          className="form-control tapahtumatiedot-textarea"
          name="huutokauppa_description"
          id="huutokauppa_description"
          onChange={handleChange}
          value={state.huutokauppa_description}
        />


        <label htmlFor="huutokauppa_address" className="form-label"><b>Osoite </b></label>
	            <input type="text" className="form-control"
              name="huutokauppa_address"
	            id="huutokauppa_address" 
              onChange={handleChange}
	            value={state.huutokauppa_address}/>

<label htmlFor="huutokauppa_email" className="form-label"><b>Järjestäjän email </b></label>
	            <input type="email" className="form-control"
               name="huutokauppa_email"
	             id="huutokauppa_email" 
               onChange={handleChange}
               value={state.huutokauppa_email}/>

    <label htmlFor="huutokauppa_phone" className="form-label"><b>Tapahtuman yhteysnumero </b></label>
	            <input type="text"
              className="form-control"
              name="huutokauppa_phone"
	            id="huutokauppa_phone" 
              onChange={handleChange}
	            value={state.huutokauppa_phone}/>


        
      
      
    </form>
      <button className='btn btn-primary' onClick={editHuutokauppa}>
        Muuta tietoja
      </button></div>
)




}


export default EditHuutokauppa



