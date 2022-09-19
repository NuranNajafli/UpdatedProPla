import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../interceptors/axios'
import { useCallback } from 'react'
import NavBarAdmin from '../Navs/NavBarAdmin'




function User() {

    const [user, setUser] = useState([])
    const getData = useCallback(async () => {
        axios.get(`User`)
            .then(res => res.data)
            .then(res => {
                setUser(res)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [getData])


    const handleDelete = (index) => {
        axios.delete(`User/${index.userId}`)
            .then(response => setUser(user.filter((a) => a.userId !== index.userId)))
    }


    return (
        <div className='user'>
            <NavBarAdmin />
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Name</th>
                                        <th className="column2">SurName</th>
                                        <th className="column3">Mail</th>
                                        <th className="column4">Office Number</th>
                                        <th className="column5">Personal Number</th>
                                        <th className="column6">Position Name</th>
                                        <th className="column7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((a, b) => (
                                        <tr key={b}>
                                            <td className="column1">{a.name}</td>
                                            <td className="column2">{a.surname}</td>
                                            <td className="column3">{a.mail}</td>
                                            <td className="column4">{a.officeNumber}</td>
                                            <td className="column5">{a.personalNumber}</td>
                                            <th className="column6">{a.positionName}</th>
                                            <th className="column7">
                                                <button className='delete-user-btn' onClick={(e) => { if (window.confirm('Are you sure to delete!?')) handleDelete(a, b) }}>Delete</button></th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(User)