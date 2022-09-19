import React, { useCallback, useEffect } from 'react'
import axios from '../interceptors/axios'


function TechStackList({ setTechStackData, techStackData, id, }) {

    const getAllData = useCallback(async () => {

        axios.get(`TechStack/${id}`)
            .then(res => res.data)
            .then(res => {
                setTechStackData(res)
            })
    })
    useEffect(() => {
        getAllData()
    }, [])

    const handleToolDelete = (index) => {

        axios.delete(`TechStack/${index.techStackId}`)
        .then(response =>setTechStackData(techStackData.filter((a) => a.techStackId != index.techStackId))  )
     }

    return (
        <div>
            {
                techStackData.map((a, b) => (

                    <ul className='techStachEdit' key={b}>
                        <li>{a.programName} </li>
                        <li><button className='delete' onClick={() => {if(window.confirm('Are you sure to delete!?'))handleToolDelete(a)}}>Delete</button></li>
                        
                    </ul>
                ))
            }

        </div>
    )
}

export default React.memo(TechStackList)