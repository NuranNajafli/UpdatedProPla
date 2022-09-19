import React, { useCallback, useEffect, useState } from 'react'
import axios from '../interceptors/axios'




function GeneralInfoAdminList(props) {
    const [generalData, setGeneralData] = useState([])


    const getAllData = useCallback(async () => {
        axios.get(`GeneralInfo/${props.id}`)
            .then(res => res.data)
            .then(res => {
                setGeneralData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, getAllData)


    const handleEdit = (index) => {
        setGeneralData(
            current => current.map((a, b) => {
                if (b == index) {
                    props.setName(a.projectFullname)
                    props.setDescription(a.projectDescription)
                    props.setProduction(a.productionDate)
                    props.setCount(a.userCount)
                    props.setCreated(a.createdBy)
                }
                return a
            })
        )
    }

    const handleDelete = (index) => {
        axios.delete(`GeneralInfo/${index.generalInfoId}`)
            .then(response => setGeneralData(generalData.filter((a) => a.generalInfoId !== index.generalInfoId)))
    }

    const handleUpdateGeneralInfo = (element, index) => {
        axios.put(`GeneralInfo`,
                {
                    projectid: props.id,
                    generalInfoId: generalData[index].generalInfoId,
                    projectFullname: props.name,
                    projectDescription: props.description,
                    createdBy: props.created,
                    productionDate: props.production,
                    userCount: props.count
                }
            )
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
                    props.setName("")
                    props.setDescription("")
                    props.setProduction("")
                    props.setCount("")
                    props.setCreated("")
    }



    return (
        <div className='generalInfoAdmin'>
            <div className="limiter">
                <div className="container-table10">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Project Full Name</th>
                                        <th className="column2">Project Description</th>
                                        <th className="column3">Created by</th>
                                        <th className="column4">Production Date</th>
                                        <th className="column5">Project User Count</th>
                                        <th className='column6'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generalData.map((a, b) => (
                                        <tr key={b}>
                                            <td className="column1">{a.projectFullname}</td>
                                            <td className="column2">{a.projectDescription}</td>
                                            <td className="column3">{a.createdBy}</td>
                                            <td className="column4">{a.productionDate}</td>
                                            <td className="column5">{a.userCount}</td>
                                            <td className="column6">
                                                <button className="edit-generalinfo-btn" onClick={(e) => handleEdit(b)} >Edit</button>
                                                <button className='delete-generalinfo-btn' onClick={ (e) => {if(window.confirm('Are you sure to delete!?'))handleDelete(a, b)}}>Delete</button>
                                                <button className="update-generalinfo-btn" onClick={(e) => handleUpdateGeneralInfo(a,b)}>Update</button>
                                            </td>
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

export default React.memo(GeneralInfoAdminList)