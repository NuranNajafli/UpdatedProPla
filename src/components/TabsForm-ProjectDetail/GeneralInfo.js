import React from 'react'
import { useEffect,useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'





function GeneralInfo() {
    const [generalData, setGeneralData] = useState([])
    const { id } = useParams()

    const getData = useCallback(async () => {
        axios.get(`http://10.1.14.29:85/api/GeneralInfo/${id}`)
            .then(res => {
                setGeneralData(res.data)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {generalData.map((a, b) => (
                <tr key={b}>
                    <td className="column1">{a.projectFullname}</td>
                    <td className="column2">{a.projectDescription}</td>
                    <td className="column3">{a.createdBy}</td>
                    <td className="column4">{a.productionDate}</td>
                    <td className="column5">{a.userCount}</td>
                </tr>
            ))}
        </>

    )
}

export default React.memo(GeneralInfo)