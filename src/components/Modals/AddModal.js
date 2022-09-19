import React from 'react'



function AddModal({setModal, handleInput,handleAdd}) {

    return (
        <div className='popUp activePopUp'>
        <div className="table-modal">
            <form>
                <label>Project Name</label>
                <input type="text" placeholder='Write the project Name' name="projectName" onChange={(e) => handleInput(e)} />
                <label>Project Logo</label>
                <input type="url" placeholder='Paste the image url' name="projectLogo" onChange={(e) => handleInput(e)} />
                <button onClick={(e) => handleAdd(e)}>ADD</button>
            </form>
            <span onClick={() => setModal(modal => !modal)}>x</span>
        </div>
    </div>
    )
}

export default React.memo(AddModal)