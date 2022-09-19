import React from 'react'



function EditModal({setEditModal, handleSave,setEditName,editName}) {

    return (
        <div className='popUp activePopUp'>
                <div className="table-editmodal">
                    <form>
                        <label>Project Name</label>
                        <input  type="text" placeholder='Write the project Name' name="projectName" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <button onClick={(e) => handleSave(e)}>SAVE</button>
                    </form>
                    <span onClick={() => setEditModal(editModal => !editModal)}>x</span>
                </div>
            </div>
    )
}

export default React.memo(EditModal)