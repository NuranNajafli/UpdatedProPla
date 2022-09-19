import React, { useCallback, useEffect, useState } from 'react'
import axios from '../interceptors/axios'



function ServerLinkList(props) {
    const [serverData, setServerData] = useState([])

    const getAllData = useCallback(async () => {
        axios.get(`ServerLink/${props.id}`)
            .then(res => res.data)
            .then(res => {
                setServerData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, [])

    const handleEdit = (element, index) => {
        setServerData(
            current => current.map((a, b) => {
                if (b == index) {
                    props.setServerIp(a.serverIp)
                    props.setServerPort(a.serverPort)
                    props.setServerTypeName(a.serverTypeName)
                }
                return a
            })
        )
    }
    const handleUpdateServerLink = (element, index) => {
        axios.put(`ServerLink`,
            {
                    serverlinkId: serverData[index].serverlinkId,
                    projectId: props.id,
                    serverIp: props.serverIp,
                    serverPort: props.serverPort,
                    serverTypeName: props.serverTypeName
            }
                )
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                        console.log(error);
                    });
                        props.setServerIp("")
                        props.setServerPort("")
                        props.setServerTypeName("")
              }

    const handleDelete = (index) => {
        axios.delete(`ServerLink/${index.serverlinkId}`)
            .then(response => setServerData(serverData.filter((a) => a.serverlinkId !== index.serverlinkId)))
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
                                        <th className="column1">ServerIP</th>
                                        <th className="column2">Server Port</th>
                                        <th className="column3">Server Type Name</th>
                                        <th className='column4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serverData.map((a, b) => (
                                        <tr key={b}>
                                            <td className="column1">{a.serverIp}</td>
                                            <td className="column2">{a.serverPort}</td>
                                            <td className="column3">{a.serverTypeName}</td>
                                            <td className="column7">
                                                <button className="edit-generalinfo-btn" onClick={(e) => handleEdit(a, b)}>Edit</button>
                                                <button className='delete-generalinfo-btn' onClick={ (e) => {if(window.confirm('Are you sure to delete!?'))handleDelete(a, b)}}>Delete</button>
                                                <button className="update-generalinfo-btn" onClick={(e) => handleUpdateServerLink(a, b)}>Update</button>
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

export default React.memo(ServerLinkList)