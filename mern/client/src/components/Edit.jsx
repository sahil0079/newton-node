import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {

    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });

    const navigate = useNavigate();
    const params = useParams();


    async function fetchData() {
        const id = params.id.toString();

        const response = await fetch(`http://localhost:5050/record/${id}`);

        if (!response.ok) {
            const message = `An error has occured : ${response.statusText}`;
            window.alert(message);
            return;
        };

        const record = await response.json();

        if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate('/');
            return
        }

        setForm(record);
    }

    useEffect(() => {
        fetchData();
    }, [])



    console.log('form', form)
    function updateForm(value) {

        return setForm((prev) => ({ ...prev, ...value }))

        // setForm((prevForm) => console.log({ prevForm, value }))

    }

    // let user = {
    //     name:'john'
    // }

    // let user2 = {
    //     country:'india'
    // }

    // let user3 = {...user, ...user2}

    async function onSubmit(e) {
        e.preventDefault();

        //post request is sent to post url,
        //adding a new record to the database

        const editedRecord = {
            name: form.name,
            position: form.position,
            level: form.level
        };
        //patch request to update the record in the database
        await fetch(`http://localhost:5050/record/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedRecord),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({
            name: "",
            position: "",
            level: ""
        });
        navigate('/');
    }


    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='form-control' id='name' value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label htmlFor='position'>Position</label>
                    <input type='text' className='form-control' id='position' value={form.position} onChange={(e) => updateForm({ position: e.target.value })} />
                </div>
                <div className='form-group mt-4'>
                    <div className='form-check form-check-inline'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='positionOptions'
                            id='positionIntern'
                            value='Intern'
                            checked={form.level === 'Intern'}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor='positionIntern' className='form-check-label'>Intern</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='positionOptions'
                            id='positionJunior'
                            value='Junior'
                            checked={form.level === 'Junior'}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor='positionJunior' className='form-check-label'>Junior</label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='positionOptions'
                            id='positionSenior'
                            value='Senior'
                            checked={form.level === 'Senior'}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor='positionSenior' className='form-check-label'>Senior</label>
                    </div>
                </div>

                <div className='form-group mt-4'>
                    <input type='submit' value='Update record' className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default Edit