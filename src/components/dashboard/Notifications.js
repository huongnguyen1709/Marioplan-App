import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications, auth } = props
    const onAuthor = (userId, userName) => {
        if (auth.uid === userId) {
            console.log('match')
            return <span className="pink-text">You </span>
        } else {
            return <span className="pink-text">{userName} </span>
        }
    }

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content teal lighten-5 text-darken-3">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {notifications && notifications.map(item => {
                            return (
                                <li key={item.id}>
                                    {onAuthor(item.userId, item.user)}
                                    <span>{item.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(item.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications