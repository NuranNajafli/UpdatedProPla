import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import logo from "../image/cardLogo.png"
import PaginationDataTable from './PaginationDataTable';
import AddModal from './Modals/AddModal';
import EditModal from './Modals/EditModal';
import NavBarAdmin from './Navs/NavBarAdmin';
import axios from "../components/interceptors/axios"




function DataTable() {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [inputValue, setInputValue] = useState([
        {
            projectId: "",
            projectLogo: "",
            projectName: ""
        }
    ])
    

    const getData = useCallback(async () => {
        axios.get(`ProjectInfo`)
            .then(res => res.data)
            .then(res => {
                setData(res)
            })
    }, [])
    useEffect(() => {
        getData()
    }, [getData])



    const handleDelete = (id) => {
        axios.delete(`ProjectInfo/${id}`)
            .then(response => setData(data.filter((a) => a.projectId !== id)))
    };

    const handleInput = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }
    const handleAdd = (e) => {
        e.preventDefault()
        axios.post(`ProjectInfo`,
            {
                projectId: "",
                projectLogo: logo,
                projectName: inputValue.projectName
            })
            .then((response) => {
                getData()
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        setInputValue("")
        setModal(false)
        alert("You created project successfully!")
    }

    const [editName, setEditName] = useState("")
    const [id, setId] = useState(null)
    const handleEdit = (a) => {
        setId(a.projectId)
        setEditModal(!editModal)
        setEditName(a.projectName)
    }

    const handleSave = (e) => {
        e.preventDefault()
        setEditModal(!editModal)
        axios.put(`ProjectInfo`,
        {
            projectId: id,
            projectLogo: logo,
            projectName: editName
        })
        .then((response) => {
            getData()
            console.log(response);
        }, (error) => {
            console.log(error);
        });

    }





    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = data.slice(firstPostIndex, lastPostIndex)
    const totalPosts = data.length

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            <div className='dataTable '>
                <NavBarAdmin/>
                <div className="Table container">
                    <div className="datatableTitle">
                        Add New User
                        <span className="link" onClick={() => setModal(!modal)}>
                            Add New
                        </span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Project logo</th>
                                <th>Project Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPost.map((a) => (
                                    <tr key={a.projectId}>
                                        <td>{a.projectId}</td>
                                        <td><img className='cellImg' src={logo} /></td>
                                        <td><Link to={`${a.projectId}`}>{a.projectName}</Link></td>
                                        <td><button className='editButton' onClick={() => handleEdit(a)}>Edit</button> <button className='deleteButton' onClick={() => {if(window.confirm('Are you sure to delete!?'))handleDelete(a.projectId)}}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <PaginationDataTable pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            </div>
            {modal && <AddModal setModal={setModal} handleInput={handleInput} handleAdd={handleAdd} />}
            {editModal && <EditModal editName={editName} setEditModal={setEditModal} handleSave={handleSave} setEditName={setEditName} />}
        </>
    )
}

export default DataTable