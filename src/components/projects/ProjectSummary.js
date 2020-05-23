import React from 'react'
import moment from 'moment'

const ProjectSummary = ({ project, auth }) => {

    const onAuthor = () => {
        if (auth.uid === project.authorId) {
            return <p>Posted by You</p>
        } else {
            return <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
        }
    }

    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content pink lighten-4 black-text text-darken-3">
                <span className="card-title">{project.title}</span>
                {onAuthor()}
                <p className="black-text">{moment(project.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default ProjectSummary