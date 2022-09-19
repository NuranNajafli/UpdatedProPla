import {createStore,combineReducers} from "redux"
import searchDatareducer from "./searchDatareducer"

const reducers= combineReducers({
    searchDatareducer, 
})

export default function configureStore(){
    return createStore(reducers)
}