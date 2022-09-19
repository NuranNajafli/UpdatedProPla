import React from 'react'



function CreateNewUserModal(props) {
   

    return (
        <div className='popUp activePopUp back-modal'>
                    <ul className='createNewUserModal'>
                        <li >
                            <input type="text" placeholder='Name' onChange={(e) => props.setProjectUserName(e.target.value)} value={props.projectUserName} />
                        </li>
                        <li>
                            <input type="text" placeholder='Surname' onChange={(e) => props.setProjectUserSurname(e.target.value)} value={props.projectUserSurname} />
                        </li>
                        <li>
                            <input type="text" placeholder='Email' onChange={(e) => props.setProjectUserMail(e.target.value)} value={props.projectUserMail} />
                        </li>
                        <li>
                            <input type="number" placeholder='Office Number' onChange={(e) => props.setProjectUserOfficeNumber(e.target.value)} value={props.projectUserOfficeNumber} />
                        </li>
                        <li>
                            <input type="text" placeholder='Personal Number' onChange={(e) => props.setProjectUserPersonalNumber(e.target.value)} value={props.projectUserPersonalNumber} />
                        </li>
                        <li>
                            <input type="text" placeholder='Position Name' onChange={(e) => props.setProjectUserPositionName(e.target.value)} value={props.projectUserPositionName} />
                        </li>
                        <li>
                            <input type="text" placeholder='Password' onChange={(e) => props.setProjectUserPassword(e.target.value)} value={props.projectUserPassword} />
                        </li>
                        <button className='btn-modal' onClick={props.handleSubmitNewUser} >
                            Submit
                        </button>
                        <span onClick={() =>  props.setCreateNewUserModal(createNewUserModal => !createNewUserModal)}>x</span>
                    </ul>
                </div>
    )
}

export default React.memo(CreateNewUserModal)