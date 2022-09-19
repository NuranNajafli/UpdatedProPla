import React, { useCallback, useEffect, useState } from 'react'
import axios from './interceptors/axios'
import { useParams, Link } from 'react-router-dom'
import NavBarAdmin from './Navs/NavBarAdmin'
import TechStackList from './adminList/TechStackList'
import CreateNewUserModal from './Modals/CreateNewUserModal'
import GeneralInfoAdminList from './adminList/GeneralInfoAdminList'
import ServerLinkList from './adminList/ServerLinkList'
import GitRepoLinkList from './adminList/GitRepoLinkList'
import ProjectPoistionList from './adminList/ProjectPoistionList'



function AdminForm() {
    const { id } = useParams()
    const [techStackData, setTechStackData] = useState([])
    const [userData, setUserData] = useState([])
    const [toggleState, setToggleState] = useState(1)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [created, setCreated] = useState("")
    const [production, setProduction] = useState("")
    const [count, setCount] = useState(null)

    const [serverIp, setServerIp] = useState("")
    const [serverPort, setServerPort] = useState(null)
    const [serverTypeName, setServerTypeName] = useState("")

    const [gitRepoName, setGitRepoName] = useState("")
    const [gitRepoUrl, setGitRepoUrl] = useState("")
    const [gitRepoDescription, setGitRepoDescription] = useState("")

    const [tags, setTags] = useState([])

    const [projectUserName, setProjectUserName] = useState("")
    const [projectUserSurname, setProjectUserSurname] = useState("")
    const [projectUserMail, setProjectUserMail] = useState("")
    const [projectUserOfficeNumber, setProjectUserOfficeNumber] = useState(0)
    const [projectUserPersonalNumber, setProjectUserPersonalNumber] = useState("")
    const [projectUserPositionName, setProjectUserPositionName] = useState("")
    const [projectUserDevTypeName, setProjectUserDevTypeName] = useState("")
    const [projectUserDescription, setProjectUserDescription] = useState("")
    const [projectUserPassword, setProjectUserPassword]=useState("")
    const [createNewUserModal, setCreateNewUserModal] = useState(false)









    const getAllData = useCallback(async () => {
        axios.get(`User`)
            .then(res => res.data)
            .then(res => {
                setUserData(res)
            })
        axios.get(`TechStack/${id}`)
            .then(res => res.data)
            .then(res => {
                // setTags(res.map(item => item.split("").programName))
                setTechStackData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, [])




    const toggleTab = useCallback(async (index) => {
        setToggleState(index)
    })
    const handleInput = (e) => {
        if (e.key !== 'Enter') return
        const val = e.target.value
        if (!val.trim()) return
        setTags([...tags, val])
        e.target.value = ""

    }
    const handleRemove = (b) => {
        setTags(tags.filter((a, index) => index !== b))

    }
    const handleAddGeneralInfo = (e) => {
        e.preventDefault()
        axios.post('GeneralInfo',
            {
                projectid: id,
                projectFullname: name,
                projectDescription: description,
                createdBy: created,
                productionDate: production,
                userCount: count,

            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    const handleAddServerLink = (e) => {
        e.preventDefault()
        axios.post(`ServerLink`,
            {
                projectid: id,
                serverIp: serverIp,
                serverPort: serverPort,
                serverTypeName: serverTypeName

            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        setServerIp("")
        setServerPort("")
        setServerTypeName("")
    }
    const handleAddRepo = (e) => {
        e.preventDefault()
        axios.post(`GitRepoLink`,
            {
                projectid: id,
                repoName: gitRepoName,
                repoUrl: gitRepoUrl,
                repoDescription: gitRepoDescription
            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    const handleNewUser = () => {
        setCreateNewUserModal(!createNewUserModal)
    }
    const handleSubmitNewUser = (e) => {
        e.preventDefault()
        axios.post(`User`,
            {
                name: projectUserName,
                surname: projectUserSurname,
                mail: projectUserMail,
                officeNumber: projectUserOfficeNumber,
                personalNumber: projectUserPersonalNumber,
                positionName: projectUserPositionName,
                password: projectUserPassword,
                roleId: 0

            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    const handleAddProjectUser = (e) => {
        e.preventDefault()
        axios.post(`ProjectPosition`,
            {
                projectId: id,
                devtypename: projectUserDevTypeName,
                projectUserDescription: projectUserDescription,
                mail: projectUserMail

            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    console.log(projectUserMail);

    const handleAddTechStack = (e) => {
        e.preventDefault()
        axios.post(`TechStack`,
            {
                projectId: id,
                programName: tags.toString(),

            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        setTags([])
    }
    const handleTechStackEdit = (e) => {
        e.preventDefault()
        getAllData()
    }





    return (
        <div className='admin-form'>
            <NavBarAdmin />
            <div className='container main-projectDetail'>
                <div className='row admin-header'>
                    <div className='col-lg-2 col-md-2 col-sm-2 links-div'>
                        <span className={toggleState === 1 ? "tabs hover-underline-animation" : "tabs"} onClick={() => toggleTab(1)}>General Info</span>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 links-div'>
                        <span className={toggleState === 2 ? "tabs hover-underline-animation" : "tabs"} onClick={() => toggleTab(2)}>Server Links</span>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 links-div'>
                        <span className={toggleState === 3 ? "tabs hover-underline-animation" : "tabs"} onClick={() => toggleTab(3)}>GitRepo Links</span>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 links-div'>
                        <span className={toggleState === 4 ? "tabs hover-underline-animation" : "tabs"} onClick={() => toggleTab(4)}>Project Users</span>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 links-div'>
                        <span className={toggleState === 5 ? "tabs hover-underline-animation" : "tabs"} onClick={() => toggleTab(5)}>Tech Stack</span>
                    </div>
                </div>
            </div>

            <div className='admin-form-center container'>
                <ul className={toggleState === 1 ? "content  active-content lists " : "content"}>
                    <li >
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        <label>Project Full Name</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <label>Project Description</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setCreated(e.target.value)} value={created} />
                        <label>Created by</label>
                    </li>
                    <li>
                        <input type="date" onChange={(e) => setProduction(e.target.value)} value={production} />
                        <label>Production Date</label>
                    </li>
                    <li>
                        <input type="number" onChange={(e) => setCount(e.target.value)} value={count} />
                        <label>Project User Count</label>
                    </li>
                    <li>
                        <button className='btn' onClick={handleAddGeneralInfo}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </li>

                    <GeneralInfoAdminList
                        setName={setName}
                        name={name}
                        setDescription={setDescription}
                        description={description}
                        setCreated={setCreated}
                        created={created}
                        setProduction={setProduction}
                        production={production}
                        setCount={setCount}
                        count={count}
                        id={id}
                    />
                </ul>

                <ul className={toggleState === 2 ? "content  active-content lists " : "content"}>
                    <li >
                        <input type="text" onChange={(e) => setServerIp(e.target.value)} value={serverIp} />
                        <label>Server IP</label>
                    </li>
                    <li>
                        <input type="number" onChange={(e) => setServerPort(e.target.value)} value={serverPort} />
                        <label>Server Port</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setServerTypeName(e.target.value)} value={serverTypeName} />
                        <label>Server Type Name</label>
                    </li>
                    <li>
                        <button className='btn' onClick={handleAddServerLink}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </li>
                    <ServerLinkList
                        setServerIp={setServerIp}
                        serverIp={serverIp}
                        setServerPort={setServerPort}
                        serverPort={serverPort}
                        setServerTypeName={setServerTypeName}
                        serverTypeName={serverTypeName}
                        id={id}
                    />
                </ul>

                <ul className={toggleState === 3 ? "content  active-content lists " : "content"}>
                    <li >
                        <input type="text" onChange={(e) => setGitRepoName(e.target.value)} value={gitRepoName} />
                        <label>Repo Name</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setGitRepoUrl(e.target.value)} value={gitRepoUrl} />
                        <label>Repo Url</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setGitRepoDescription(e.target.value)} value={gitRepoDescription} />
                        <label>Repo description</label>
                    </li>
                    <li>
                        <button className='btn' onClick={handleAddRepo}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </li>
                    <GitRepoLinkList
                        setGitRepoName={setGitRepoName}
                        gitRepoName={gitRepoName}
                        setGitRepoUrl={setGitRepoUrl}
                        gitRepoUrl={gitRepoUrl}
                        setGitRepoDescription={setGitRepoDescription}
                        gitRepoDescription={gitRepoDescription}
                        id={id}
                    />
                </ul>
                <ul className={toggleState === 4 ? "content  active-content lists " : "content"}>
                    <li>
                        <span onClick={handleNewUser} className="create-new-user">Create New User</span>
                        <Link to="user" className='user-list'> User List</Link>
                    </li>
                    <li>
                        {/* <input type="text" onChange={(e) => setProjectUserMail(e.target.value)} value={projectUserMail} /> */}
                        <label>Email</label>
                        <select className='select' onChange={(e) => setProjectUserMail(e.target.value)}>
                                <option></option>
                            {userData.map((a) => (
                                <option >{a?.mail}</option>
                            ))}
                        </select>

                    </li>
                    <li>
                        <input type="text" onChange={(e) => setProjectUserDevTypeName(e.target.value)} value={projectUserDevTypeName} />
                        <label>Dev type name</label>
                    </li>
                    <li>
                        <input type="text" onChange={(e) => setProjectUserDescription(e.target.value)} value={projectUserDescription} />
                        <label>Description</label>
                    </li>
                    <li>
                        <button className='btn' onClick={handleAddProjectUser}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </li>
                    <ProjectPoistionList
                        id={id}
                        setProjectUserMail={setProjectUserMail}
                        projectUserMail={projectUserMail}
                        setProjectUserDescription={setProjectUserDescription}
                        projectUserDescription={projectUserDescription}
                        setProjectUserDevTypeName={setProjectUserDevTypeName}
                        projectUserDevTypeName={projectUserDevTypeName}
                    />
                </ul>
                <ul className={toggleState === 5 ? "content  active-content lists " : "content"}>
                    <li >
                        <div className='tags-input-container'>
                            {
                                tags.map((a, b) => (

                                    <div className="tag-item" key={b}>
                                        <span className="text">{a}</span>
                                        <span className="close" onClick={() => handleRemove(b)}>&times;</span>
                                    </div>
                                ))
                            }

                            <input type="text" placeholder="Write the tools' name" className="tag-input" onKeyDown={(e) => handleInput(e)} onChange={(e) => handleInput(e)} />
                        </div>
                    </li>
                    <li>
                        <button className='btn btn-edit' onClick={handleTechStackEdit}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Edit
                        </button>
                        <button className='btn' onClick={handleAddTechStack}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                    </li>

                    <TechStackList setTechStackData={setTechStackData} techStackData={techStackData} id={id} handleTechStackEdit={handleTechStackEdit} />
                </ul>
            </div>

            {createNewUserModal && <CreateNewUserModal
                setProjectUserName={setProjectUserName}
                setProjectUserSurname={setProjectUserSurname}
                setProjectUserMail={setProjectUserMail}
                setProjectUserOfficeNumber={setProjectUserOfficeNumber}
                setProjectUserPersonalNumber={setProjectUserPersonalNumber}
                setProjectUserPositionName={setProjectUserPositionName}
                setCreateNewUserModal={setCreateNewUserModal}
                setProjectUserPassword={setProjectUserPassword}
                handleSubmitNewUser={handleSubmitNewUser}
            />
            }
        </div>
    )
}
export default AdminForm