import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'




function ProjectUser() {
    const [projectUserData, setProjectUserData] = useState([])
    const { id } = useParams()

    const getData = useCallback(async () => {
        axios.get(`http://10.1.14.29:85/api/ProjectPosition/${id}`)
            .then(res => {
                setProjectUserData(res.data)
                console.log(res.data);
            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                projectUserData.map((a, b) => (
                    <tr key={b}>
                        <td className="column1">{a.user.name}</td>
                        <td className="column2">{a.user.surname}</td>
                        <td className="column3">{a.user.mail}</td>
                        <td className="column4">{a.user.officeNumber}</td>
                        <td className="column5">{a.user.personalNumber}</td>
                        <td className="column6">{a.user.positionName}</td>
                        <td className="column7">{a.devtypename}</td>
                        <td className="column8">{a.projectUserDescription}</td>
                    </tr>
                ))
            }
        </>

    )
}

export default React.memo(ProjectUser)