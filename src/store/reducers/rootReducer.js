import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore' // this reducer is made for syncing our firestore data with our state in the backround
import { firebaseReducer } from 'react-redux-firebase' // for taking the authencation status from firebase to our state

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer