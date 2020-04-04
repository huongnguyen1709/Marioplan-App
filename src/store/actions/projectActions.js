export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('projects').add({
            ...project, // ...project make the object 'project' into the properties: title, content
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type: 'CREATE_PROJECT',
                project
            })
        }).catch((err) => {
            dispatch({
                type: 'CREATE_PROJECT_ERROR',
                err
            })
        })
    }
}

export const editProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('projects').doc(project.id).update({
            ...project
        }).then(() => {
            dispatch({
                type: 'EDIT_PROJECT',
                project
            })
        }).catch(err => {
            dispatch({
                type: 'EDIT_PROJECT_ERROR',
                err
            })
        })
    }
}

export const deleteProject = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore
            .collection('projects')
            .doc(id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'DELETE_PROJECT',
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: 'DELETE_PROJECT_ERROR',
                    err
                })
            })
    }
}