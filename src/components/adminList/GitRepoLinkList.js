import React, { useCallback, useEffect, useState } from 'react'
import axios from '../interceptors/axios'



function GitRepoLinkList(props) {

    const [gitRepoLinkData, setGitRepoLinkData] = useState([])

    const getAllData = useCallback(async () => {
        axios.get(`GitRepoLink/${props.id}`)
            .then(res => res.data)
            .then(res => {
                setGitRepoLinkData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, getAllData)



    const handleEdit = (element, index) => {
        setGitRepoLinkData(
            current => current.map((a, b) => {
                if (b == index) {
                    props.setGitRepoDescription(a.repoDescription)
                    props.setGitRepoName(a.repoName)
                    props.setGitRepoUrl(a.repoUrl)
                }
                return a
            })
        )
    }

    const handleDelete = (index) => {
        axios.delete(`GitRepoLink/${index.gitRepolinkId}`)
            .then(response => setGitRepoLinkData(gitRepoLinkData.filter((a) => a.gitRepolinkId !== index.gitRepolinkId)))

    }
    const handleUpdateGitRepoLink = (element, index) => {
        axios.put(`GitRepoLink`,
            {
                gitRepolinkId: gitRepoLinkData[index].gitRepolinkId,
                projectId: props.id,
                repoName: props.gitRepoName,
                repoUrl: props.gitRepoUrl,
                repoDescription: props.gitRepoDescription
            }
        )
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
                props.setGitRepoDescription("")
                props.setGitRepoName("")
                props.setGitRepoUrl("")
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
                                        <th className="column1">Repo Name</th>
                                        <th className="column2">Repo Url</th>
                                        <th className="column3">Repo Description</th>
                                        <th className='column4'>Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {gitRepoLinkData.map((a, b) => (
                                        <tr key={b}>
                                            <td className="column1">{a.repoName}</td>
                                            <td className="column2">{a.repoUrl}</td>
                                            <td className="column3">{a.repoDescription}</td>
                                            <td className="column4">
                                                <button className="edit-generalinfo-btn" onClick={(e) => handleEdit(a, b)} >Edit</button>
                                                <button className='delete-generalinfo-btn' onClick={ (e) => {if(window.confirm('Are you sure to delete!?'))handleDelete(a, b)}}>Delete</button>
                                                <button className="update-generalinfo-btn" onClick={(e) => handleUpdateGitRepoLink(a, b)}>Update</button>
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

export default React.memo(GitRepoLinkList)