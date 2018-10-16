import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import styles from './styles.css' // eslint-disable-line
import { getHeaders } from '../utils';

const noOp = () => {}

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false
    }
  }
  componentDidMount() {
    this.refs.name.focus()
  }
  createRaffle = (e) => {
    e.preventDefault()
    const name = this.refs.name.value
    const description = this.refs.description.value
    let admins = this.refs.admins.value

    this.setState({
      loading: true
    })

    if (!name || !admins) {
      return alert('please add name or admins')
    }
    // make array
    admins = admins.split(',').map((item) => item.trim())
    // save data
    axios({
      url: 'https://u4zfjnriue.execute-api.us-west-1.amazonaws.com/prod/create',
      method: 'post',
      data: {
        name: name,
        description: description,
        admins: admins
      },
      headers: getHeaders(),
    }).then((response) => {
      console.log('x', response)
      this.setState({
        success: true,
        loading: false,
        raffle: response.data
      }, () => {
        this.refs.name.value = ''
        this.refs.description.value = ''
        this.refs.admins.value = ''
      })
    }).catch((e) => {
      console.log(e)
      this.setState({
        error: e.message,
        loading: false
      })
    })
  }
  render() {
    const { success, raffle, loading } = this.state
    const handler = (loading) ? noOp : this.createRaffle
    let successMsg
    if (success) {
      successMsg = (
        <div className="created-success">
          Raffle Created!&nbsp;&nbsp;
          <div>
            <Link to={`/${raffle.shortcode}`}>View Raffle Page</Link>
          </div>
        </div>
      )
    }
    return (
      <div className="content">
        <Link to="/">Back to Raffle list</Link>

        <div className='create'>
          <form onSubmit={handler}>
            {successMsg}
            <div className="field">
              <label htmlFor="name">Name</label>
              <input placeholder="Enter your raffle name here" name='name' ref='name'></input>
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea placeholder="Description of raffle, prizes, etc." name='description' ref='description'></textarea>
            </div>
            <div className="field">
              <label htmlFor="admins">Admin emails</label>
              <input placeholder="Enter raffle admin emails (comma separated values)" name='admins' ref='admins'></input>
            </div>
            <div className="field">
              <button>Create New Raffle</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}
