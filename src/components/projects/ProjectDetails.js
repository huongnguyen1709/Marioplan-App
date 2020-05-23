import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'

const ProjectDetails = (props) => {
    const { project, auth, id } = props
    if (!auth.uid) return <Redirect to='/signin' />

    const onDelete = (id) => {
        if (auth.uid === project.authorId) {
            if (window.confirm('Are you sure you want to delete ?')) {
                props.deleteProject(id)
                props.history.push('/')
            }
        }
    }

    const onActionProject = () => {
        if (auth.uid === project.authorId) {
            console.log('match')
            return (
                <div className="right">
                    <button className="btn pink lighten-1 z-depth-0 right ml" onClick={() => onDelete(id)}>Delete</button>
                    <Link to={'/project/' + id + '/edit'} className="btn pink lighten-1 z-depth-0" >Edit</Link>
                </div>
            )

        }
    }

    const onAuthor = () => {
        if (auth.uid === project.authorId) {
            return <div>Posted by You</div>
        } else {
            return <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
        }
    }

    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content pink lighten-4 text-darken-3">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action pink lighten-3 text-darken-3">
                        {onAuthor()}
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                <Link to='/' className="btn pink lighten-1 z-depth-0">Back</Link>
                {onActionProject()}
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project ...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps là props của component, có thể lấy props.match
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth,
        id: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)