const RemoveHuutokauppa =(props) => {
    const removeHuutokauppa = props.removeHuutokauppa
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
				onClick={() => props.changeMode("cancel")}
			>Cancel</button></td>

            <td><button className="btn btn-success"
            onClick={()=> removeHuutokauppa(props.tapahtuma._id)}>Delete</button>
            </td>      
            </tr>
    )
}

export default RemoveHuutokauppa