import React, { Component } from 'react'
import "./Task.css"
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale';
import propTypes from 'prop-types';


export default class Task extends Component {
  static propTypes = {
    label: propTypes.string,
    createDate: propTypes.object,
    onCompleted: propTypes.func,
    onDeleted: propTypes.func,
    onEditTask:propTypes.func,
  }
  static defaultProps = {
    label: '',
    createDate: new Date(),
    onCompleted: () => {},
    onDeleted: () => {},
    onEditTask:() => {},
  }
  
  render() {
    const { label, createDate, onCompleted, onDeleted, onEditTask } = this.props
    return (
      <div className='view'>
        <input type='checkbox' className='toggle' onClick={onCompleted}/>
        <label>
          <span className="description">{label}</span>
          <span className="created">
            {`created ${formatDistanceToNow(
              createDate, {includeSeconds: true, 
                          locale: enUS,
                          addSuffix: true}
            )}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onEditTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}

