import React, { useState, useEffect } from 'react'
import Header from './Navs/Header'
import GeneralInfo from './TabsForm-ProjectDetail/GeneralInfo'
import ServerLink from './TabsForm-ProjectDetail/ServerLink'
import GitRepoLink from './TabsForm-ProjectDetail/GitRepoLink'
import ProjectUser from './TabsForm-ProjectDetail/ProjectUser'
import TechStack from './TabsForm-ProjectDetail/TechStack'




function ProjectDetail() {
    const [toggleState, setToggleState] = useState(1)
    const toggleTab = (index) => {
        setToggleState(index)
    }


    useEffect(() => {
        // const api1 = axios.get('http://10.1.14.29:81/api/GeneralInfo/${id}');
        // const api2 = axios.get('http://10.1.14.29:81/api/ServerLink/${id}');
        // const api3 = axios.get('http://10.1.14.29:81/api/GitRepoLink/${id}');
        // const api4 = axios.get('http://10.1.14.29:81/api/TechStack/${id}');

        // const [api1Promise, api2Promise, api3Promise, api4Promise] = await Promise.all([api1, api2, api3, api4]) 

    }, [])


    return (
        <div className='project-detail-main'>
            <Header />
            <div className='container main-projectDetail'>
                <div className='row project-header'>
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
            <div className='content-tabs container'>
                <div className={toggleState === 1 ? "content  active-content " : "content"}>
                    <div className="limiter">
                        <div className="container-table100">
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <GeneralInfo />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <div className="limiter">
                        <div className="container-table100">
                            <div className="wrap-table100">
                                <div className="table100">
                                    <table>
                                        <thead>
                                            <tr className="table100-head">
                                                <th className="column1">Server IP</th>
                                                <th className="column2">Server Port</th>
                                                <th className="column3">Server Type Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ServerLink />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <div className="limiter">
                        <div className="container-table100">
                            <div className="wrap-table100">
                                <div className="table100">
                                    <table>
                                        <thead>
                                            <tr className="table100-head">
                                                <th className="column1">Repo Name</th>
                                                <th className="column2">Repo Url</th>
                                                <th className="column3">Repo Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <GitRepoLink />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 4 ? "content  active-content" : "content"}>
                    <div className="limiter">
                        <div className="container-table100">
                            <div className="wrap-table100">
                                <div className="table100">
                                    <table>
                                        <thead>
                                            <tr className="table100-head">
                                                <th className="column1">Name</th>
                                                <th className="column2">Surname</th>
                                                <th className="column3">Mail</th>
                                                <th className="column4">Office Number</th>
                                                <th className="column5">Personal Number</th>
                                                <th className="column6">Position Name</th>
                                                <th className="column7">Dev Type Name</th>
                                                <th className="column8">Project User Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ProjectUser />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 5 ? "content  active-content" : "content"}>
                    <div className="limiter">
                        <div className="container-table100">
                            <div className="wrap-table100-last">
                                <div className="table100">
                                    <table>
                                        <thead>
                                            <tr className="table100-head">
                                                <th className="column1">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TechStack />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail