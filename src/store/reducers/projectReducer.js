const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project)
            return state
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err)
            return state
        case 'EDIT_PROJECT':
            console.log('edited project', action.project)
            return state
        case 'EDIT_PROJECT_ERROR':
            console.log('edit project error', action.err)
            return state
        case 'DELETE_PROJECT':
            console.log('deleted project', action.id)
            return state
        case 'DELETE_PROJECT_ERROR':
            console.log('deleted project error', action.err)
            return state
        default:
            return state
    }
}

export default projectReducer