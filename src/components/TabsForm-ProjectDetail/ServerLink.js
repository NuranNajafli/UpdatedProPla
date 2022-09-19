import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'




function ServerLink() {
    const [serverData, setServerData] = useState([])
    const { id } = useParams()

    const getData = useCallback(async () => {
        axios.get(`http://10.1.14.29:85/api/ServerLink/${id}`)
            .then(res => {
                setServerData(res.data)
            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                serverData.map((a, b) => (
                    <tr key={b}>
                        <td className="column1">{a.serverIp}</td>
                        <td className="column2">{a.serverPort}</td>
                        <td className="column3">{a.serverTypeName}</td>
                    </tr>
                ))
            }
        </>

    )
}

export default React.memo(ServerLink)