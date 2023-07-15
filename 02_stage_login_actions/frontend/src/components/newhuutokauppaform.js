import {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const NewHuutoKauppaForm = ({addHuutokauppa, mode, editauc, editHuutokauppa}) => {
    const initialState = {
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

    useEffect(()=> {
      if(mode ==="edit"){
        setState({
          huutokauppa_name: editauc.huutokauppa_name,
          huutokauppa_date_start: moment(editauc.huutokauppa_date_start).toDate(),
          huutokauppa_date_end: moment(editauc.huutokauppa_date_end).toDate(),
          huutokauppa_address_description:editauc.huutokauppa_description,
          huutokauppa_address: editauc.huutokauppa_address,
          huutokauppa_email:editauc.huutokauppa_email,
          huutokauppa_phone: editauc.huutokauppa_phone
        })
        setButtonState({
          buttonName:"Hyväksy muutokset"
        })
      }
    }, [mode])
  

    const handleChange = (event) => {
     
  
      setState((prevState) => ({
        ...prevState,
        [event.target.name]:event.target.value
            }));
    };

    const onDateChange = (date, field) => {
      setState((prevState) => ({
        ...prevState,
        [field]: date ? moment(date).toDate() : null
      }));
    };

    const onSubmit = (event) => {
      event.preventDefault()
      console.log(state);

      let errorText = "";
      let errorDate = 0;

      if(state.huutokauppa_name === "") {
        errorText = "Anna tapahtuman nimi.";
      };

      if(state.huutokauppa_date_start === null) {
        errorDate = 1;
        errorText = errorText + "\n" + "Alkuaika on pakollinen tieto.";
      };

      if(state.huutokauppa_date_end === null) {
        errorDate = 1;
        errorText = errorText + "\n" + "Päättymisaika on pakollinen tieto.";
      };

      if(errorDate === 0) {
        if(state.huutokauppa_date_start > state.huutokauppa_date_end) {
          errorText = errorText + "\n" + "Tarkasta tapahtuman aikaväli, kiitos.";
        }
      }

      if(state.huutokauppa_email === "") {
        errorText = errorText + "\n" + "Järjestäjän sähköposti on pakollinen tieto.";
      };

      if(state.huutokauppa_phone === "") {
        errorText = errorText + "\n" + "Tapahtuman yhteysnumero on pakollinen tieto.";
      };

      if(!(errorText === "")) {
        errorText = "Korjaa antamamiasi tietoja, ole hyvä. \n" + errorText;

        alert(errorText);
      } else {

        if(mode === "addhuutokauppa" | typeof mode === 'undefined'){
          addHuutokauppa(state) //Tallenetaan annetut input kenttien arvot!
        
          alert("Kiitos tietojen lisäyksestä!");
        }
        else {
          let huutokauppa = {
            ...state,
            _id:editauc._id
          }
          editHuutokauppa(huutokauppa)
          setButtonState({
            buttonName:"Tallenna ja jatka, ole hyvä."
          })
          alert("Tiedot päivitetty :)");
        }

        setState(initialState) //Tyhjentää anetut input kenttien arvot!
      }
    }


return (
	<div style={{
		"backgroundColor":"lightblue",
		"margin":"auto",
		"width":"70%",
		"textAlign":"center"
		
	}}>

<form className="mb-3" onSubmit={onSubmit}>
	<label htmlFor="huutokauppa_name" className="form-label"><b>Tapahtuman nimi</b></label>
	<input type="text"
    className="form-control"
    name="huutokauppa_name"
	id="huutokauppa_name" 
    onChange={handleChange}
	value={state.huutokauppa_name}/>

<label htmlFor="huutokauppa_date_start" className="form-label">
  <b>Tapahtuma alkaa</b>
</label>
<DatePicker
  className="form-control"
  selected={state.huutokauppa_date_start}
  onChange={(date) =>
    onDateChange(date ? moment(date).toDate() : null, 'huutokauppa_date_start')
  }
  dateFormat="dd/MM/yyyy HH:mm"
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  name="huutokauppa_date_start"
  id="huutokauppa_date_start"
/>

<label htmlFor="huutokauppa_date_end" className="form-label">
  <b>Tapahtuma päättyy</b>
</label>
<DatePicker
  className="form-control"
  selected={state.huutokauppa_date_end}
  onChange={(date) =>
    onDateChange(date ? moment(date).toDate() : null, 'huutokauppa_date_end')
  }
  dateFormat="dd/MM/yyyy HH:mm"
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  name="huutokauppa_date_end"
  id="huutokauppa_date_end"
/>


<label htmlFor="huutokauppa_description" className="form-label"><b>Tapahtumatiedot</b></label>
        <textarea
          className="form-control"
          name="huutokauppa_description"
          id="huutokauppa_description"
          onChange={handleChange}
          value={state.huutokauppa_address_description}
        />

<label htmlFor="huutokauppa_address" className="form-label"><b>Osoite </b></label>
	<input type="text"
    className="form-control"
    name="huutokauppa_address"
	id="huutokauppa_address" 
    onChange={handleChange}
	value={state.huutokauppa_address}/>

<label htmlFor="huutokauppa_email" className="form-label"><b>Järjestäjän email </b></label>
	<input type="email"
    className="form-control"
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

<button type="submit" className="btn btn-primary">{buttonState.buttonName}</button>

</form>

</div>

)}


export default NewHuutoKauppaForm