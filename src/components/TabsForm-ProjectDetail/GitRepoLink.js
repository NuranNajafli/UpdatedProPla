import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'




function GitRepoLink(props) {
    const [gitRepoData, setGitRepoData] = useState([])
    const { id } = useParams()


    const getData = useCallback(async () => {
        axios.get(`http://10.1.14.29:85/api/GitRepoLink/${id}`)
            .then(res => {
                setGitRepoData(res.data)
                console.log(res.data);

            })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                gitRepoData.map((a, b) => (
                    <tr key={b}>
                        <td className="column1">{a.repoName}</td>
                        <td className="column2">{a.repoUrl}</td>
                        <td className="column3">{a.repoDescription}</td>
                    </tr>
                ))
            }
        </>

    )
}

export default React.memo(GitRepoLink)