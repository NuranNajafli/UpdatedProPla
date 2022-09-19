import React, { useCallback, useEffect, useState } from 'react'
import axios from '../interceptors/axios'




function ProjectPoistionList(props) {

    const [projectPositionData, setProjectPositionData] = useState([])

    const getAllData = useCallback(async () => {
        axios.get(`ProjectPosition/${props.id}`)
            .then(res => res.data)
            .then(res => {
                console.log(res);
                setProjectPositionData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, getAllData)

    
    const handleEdit = (element, index) => {
        console.log(element);
        setProjectPositionData(
            current => current.map((a, b) => {
                console.log(b);
                if (b == index) {
                        props.setProjectUserMail(a.user.mail)
                        props.setProjectUserDevTypeName(a.devtypename)
                        props.setProjectUserDescription(a.projectUserDescription)
                }
                return a
            })
        )
    }

    const handleDelete = (index) => {
        console.log(index);
        axios.delete(`ProjectPosition/${index.projectpositionid}`)
            .then(response => setProjectPositionData(projectPositionData.filter((a) => a.projectpositionid !== index.projectpositionid)))

    }
    const handleUpdateProjectPosition = (element, index) => {
        axios.put(`ProjectPosition`,
            {
                projectpositionid:projectPositionData[index].projectpositionid,
                projectId: props.id,
                mail:projectPositionData[index].user.mail,
                devtypename:props.projectUserDevTypeName,
                projectUserDescription:props.projectUserDescription
            }
        )
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
                props.setProjectUserMail("")
                props.setProjectUserDevTypeName("")
                props.setProjectUserDescription("")
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
                                    <th className="column1">Email</th>
                                    <th className="column2">Dev type Name</th>
                                    <th className="column3">Project User Description</th>
                                    <th className='column6'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectPositionData.map((a, b) => (
                                    <tr key={b}>
                                        <td className="column1">{a.user.mail}</td>
                                        <td className="column2">{a.devtypename}</td>
                                        <td className="column3">{a.projectUserDescription}</td>
                                        <td className="column6">
                                            <button className="edit-generalinfo-btn" onClick={(e) => handleEdit(a,b)} >Edit</button>
                                            <button className='delete-generalinfo-btn' onClick={ (e) => {if(window.confirm('Are you sure to delete!?'))handleDelete(a, b)}}>Delete</button>
                                            <button className="update-generalinfo-btn" onClick={(e) => handleUpdateProjectPosition(a,b)}>Update</button>
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

export default React.memo(ProjectPoistionList)