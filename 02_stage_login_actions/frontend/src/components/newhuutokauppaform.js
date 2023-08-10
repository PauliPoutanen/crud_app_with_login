import {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import '../styles/styles.css';




const NewHuutoKauppaForm = ({addHuutokauppa, mode, editauc, editHuutokauppa}) => {
    const initialState ={
      huutokauppa_name: '',
      huutokauppa_date_start:'',
      huutokauppa_date_end:'',
      huutokauppa_description: '',
      huutokauppa_address: '',
      huutokauppa_email: '',
      huutokauppa_phone: '',
    }
    const [state, setState] = useState(initialState)
    const [buttonState, setButtonState] = useState({
      buttonName:"Tallenna ja jatka"
    })
useEffect(()=>{
  if(mode==="edithuutokauppa"){
    setState({
      huutokauppa_name: editauc.huutokauppa_name,
      huutokauppa_date_start:editauc.huutokauppa_date_start,
      huutokauppa_date_end:editauc.huutokauppa_date_end,
      huutokauppa_description: editauc.huutokauppa_description,
      huutokauppa_address: editauc.huutokauppa_address,
      huutokauppa_email: editauc.huutokauppa_email,
      huutokauppa_phone: editauc.huutokauppa_phone,

    })
setButtonState({buttonName:"Hyväksy muutokset"
})  
}
}, [mode])

const onDateChange = (date, field) => {
  setState((prevState) => ({
    ...prevState,
    [field]: date ? moment(date).toDate() : null
  }));
};


const handleChange = (event) => {
  setState((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value
  }));
};
 

// LOMAKKEEN TARKASTUS // 
const onSubmit = (event) => {
  event.preventDefault()

  console.log("##93event", event)

  let errorText = "";
  let errorDate = 0;

  if (state.huutokauppa_name === "") {
    errorText = "Anna tapahtuman nimi.";
  };

  if (state.huutokauppa_date_start === "") {
    errorDate = 1;
    errorText = errorText + "\n" + "Anna alkuaika.";
  };

  if (state.huutokauppa_date_end === "") {
    errorDate = 1;
    errorText = errorText + "\n" + "Anna loppaika.";
  };

  if (errorDate === 0) {
    if (state.huutokauppa_date_start > state.huutokauppa_date_end) {
      errorText = errorText + "\n" + "Tarkasta päätymisaika.";
    }
  }

  if (state.huutokauppa_email === "") {
    errorText = errorText + "\n" + "Sähköposti on pakollinen tieto.";
  };

  if (state.huutokauppa_phone === "") {
    errorText = errorText + "\n" + "Anna yhteysnumero, ole hyvä.";
  };

  if (!(errorText === "")) {
    errorText = "Korjaa tai täydennä antamiasi tietoja\n" + errorText;

    alert(errorText);
  } else {
    // ***** Tulaan linkin kautta tälle sivulle, niin mode arvoa ei ole määritelty. Pitää korjta! *****
    if (mode === "addhuutokauppa" | typeof mode === 'undefined') {
      addHuutokauppa(state) //Tallenetaan annetut input kenttien arvot!

      alert("Huutokaupan tiedot lisätty");
    }
    else {
      let huutokauppa = {
        ...state,
        _id: editauc._id
      }
      editHuutokauppa(huutokauppa)
      setButtonState({
        buttonName: "Tallenna ja jatka"
      })
      alert("Huutokaupan tiedot päivitetty");
    }

    setState(initialState) //Tyhjentää anetut input kenttien arvot!
  }
}

return (

  <div>


<form className="form-container" onSubmit={onSubmit}>
	<label htmlFor="huutokauppa_name" className="form-label"><b>Tapahtuman nimi</b></label>
	<input type="text" className="form-control"
        name="huutokauppa_name"
	      id="huutokauppa_name" 
        onChange={handleChange}
	      value={state.huutokauppa_name}/>

<div className="date-inputs">
          <div className="date-input"> <label htmlFor="huutokauppa_date_start" className="form-label">
              <b>Tapahtuma alkaa</b>
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
	<input type="text" className="form-control"
          name="huutokauppa_phone"
	        id="huutokauppa_phone" 
          onChange={handleChange}
	        value={state.huutokauppa_phone}/>

<button type="submit" className="btn btn-primary">{buttonState.buttonName}</button>


</form>
</div>

)}


export default NewHuutoKauppaForm