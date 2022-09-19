import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'




function TechStack() {
    const [techData, setTechData] = useState([])
    const { id } = useParams()

    const getData = useCallback(async () => {
        axios.get(`http://10.1.14.29:85/api/TechStack/${id}`)
            .then(res => {
                setTechData(res.data)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                techData.map((a, b) => (
                    <tr key={b}>
                        <td className="column1">{a.programName}</td>
                    </tr>
                ))}
        </>

    )
}

export default React.memo(TechStack)