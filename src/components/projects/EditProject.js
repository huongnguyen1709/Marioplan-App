import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProject } from '../../store/actions/projectActions'
import { Redirect, Link } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class EditProject extends Component {
    state = {
        id: '',
        title: '',
        content: ''
    }

    componentWillMount() {
        const { id, project } = this.props
        if (id && project) {
            this.setState({
                id: id,
                title: project.title,
                content: project.content
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { id, project } = nextProps
        if (id && project) {
            this.setState({
                id: id,
                title: project.title,
                content: project.content
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { auth, project } = this.props
        if (auth.uid === project.authorId) {
            this.props.editProject(this.state)
            this.props.history.push('/') //inside this component, we have access to route information on the props that happens automatically when we use the router
        }
    }

    render() {
        var { title, content } = this.state
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="cyan lighten-5 text-darken-3">
                    <h5>Edit Blog</h5>
                    <div className="input-field">
                        <label htmlFor="title" className={title ? 'active' : null}>Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className={content ? 'active' : null}>Project Content</label>
                        <textarea
                            id="content"
                            className="materialize-textarea"
                            value={content}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="input-field">
                        <Link to='/' className="btn pink lighten-1 z-depth-0 mt">Back</Link>
                        <button className="btn pink lighten-1 z-depth-0 right">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return {
        auth: state.firebase.auth,
        project: project,
        id: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProject: (project) => dispatch(editProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(EditProject);