const searchDatareducer =(state=[], action)=>{
    switch (action.type) {
        case "searchData":
            return  action.payload
        default:
           return state;
    }
}
export default searchDatareducer