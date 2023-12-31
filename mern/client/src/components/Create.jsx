import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });

    const navigate = useNavigate();



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

        const newRecord = { ...form };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecord),
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
            <h3>Create New Record</h3>
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
                    <input type='submit' value='Create record' className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default Create