const HuutoKauppaRow = (props) => {
    return (

<tr>
    <td>{props.tapahtuma.huutokauppa_name}</td>
    <td>{props.tapahtuma.huutokauppa_date_start}</td>
    <td>{props.tapahtuma.huutokauppa_date_end}</td>
    <td>{props.tapahtuma.huutokauppa_description}</td>
    <td>{props.tapahtuma.huutokauppa_address}</td>
    <td>{props.tapahtuma.huutokauppa_email}</td>
    <td>{props.tapahtuma.huutokauppa_phone}</td>
    <td><button className="btn btn-danger"
            onClick={() => props.changeMode("removehuutokauppa", props.index)}>Poista
            </button></td>

            <td><button className="btn btn-primary"
            onClick={()=>props.editHuutokauppa(props.tapahtuma)}>Muokkaa
            </button></td>
</tr>

    )
}

export default HuutoKauppaRow
