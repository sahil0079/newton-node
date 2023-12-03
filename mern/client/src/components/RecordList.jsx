import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Record(props) {
    return (
        <tr>
            <td>{props.record.name} </td>
            <td>{props.record.position} </td>
            <td>{props.record.level} </td>
            <td>
                <Link className='btn btn-link' to={`/edit/${props.record._id}`}  >Edit</Link>
                <button onClick={() => {
                    props.deleteRecord(props.record._id)
                }} className='btn btn-link'>Delete</button>
            </td>

        </tr>
    )
}


function RecordList() {
    const [records, setRecords] = useState([]);

    async function getRecords() {

        const response = await fetch("http://localhost:5050/record");

        // console.log(response)

        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        };

        const records = await response.json();
        setRecords(records);
    }

    useEffect(() => {
        getRecords()
    }, [])


    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);

        setRecords(newRecords);

    };


    function recordList() {
        return records.map(record => {
            return (
                <Record
                    key={record._id}
                    record={record}
                    deleteRecord={(id) => deleteRecord(record._id)}

                />
            )
        })
    }

    return (
        <div>
            <h3>Record List</h3>
            <table className='table table-striped' style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Positon</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody> {recordList()} </tbody>
            </table>
        </div>
    )
}

export default RecordList