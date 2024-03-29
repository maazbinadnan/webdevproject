import './Loginpage.css'
import Button from '@mui/material/Button'
import { Paper, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const [admin, setAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  function userdetailsset(event) {
    setEmail(event.target.value)
    console.log(email)
  }

  function passwordset(event) {
    setPassword(event.target.value)
    console.log(password)
  }

  const handlelogin = (event) => {

    event.preventDefault(); // added to prevent form submission
    console.log(admin)
    if (admin) {
      const data = {
        email: email,
        password: password
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/loginadmin/admin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (!response.data.token) {
            alert(response.data)
          }
          else {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', 'admin')
            console.log("admin logged in")
            window.location.assign('/wikistoapprove')
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // added to stop loading indicator
          setError('Failed to log in. Please try again.'); // added to show error message
        })
    } else {
      const data = {
        userinput: email,
        password: password
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/loginuser/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (!response.data.token) {
            alert(response.data)
          } else {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', 'user')
            window.location.assign('/home')
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // added to stop loading indicator
          setError('Failed to log in. Please try again.'); // added to show error message
        })
    }
  }

  return (
    <body className='noscroll'>
      <div className='divcenter'>
        <h1 className='Title'>Lumiere </h1>
        <p className='text'>Join us on a journey of film appreciation and explore the art of Cinema! </p>

        <form onSubmit={handlelogin}>
          <Paper elevation={24} sx={{ backgroundColor: '#323b49' }} className='LoginPaper' >
            <h1 className='loginheading'>Login</h1>

            <TextField className='usernameoremail'
              sx={{ mt: 2, backgroundColor: '#f8f4e3' }}
              label="Email"
              variant="filled"
              color='secondary'
              size='small'
              onChange={userdetailsset}
              value={email} /> {/* added to bind email input value to state */}

            <TextField className='passwordlogin'
              sx={{ backgroundColor: 'white', fontSize: '1 px' }}
              label="Password"
              variant="filled"
              onChange={passwordset}
              size='small'
              type="password"
              value={password} /> {/* added to bind password input value to state */}

            <Button
              type="submit" // changed to type submit
              variant="contained"
              className='loginbutton'
              onClick={handlelogin}
              disabled={loading} // added to disable button during loading
              sx={{ mt: 2, backgroundColor: '#9612dd', width: '35%' }}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {error && <p className="error">{error}</p>}
            {!admin && (
              <p style={{ position: 'absolute', bottom: '5%' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'red' }}>Sign Up</Link>
              </p>
            )}

          </Paper>
        </form>
        <ToggleButtonGroup
          sx={{ position: 'absolute', top: '28%', backgroundColor: '#9612dd', borderRadius: '3px' }}
          size="small"
          exclusive
          value={admin}
          onChange={(event, isadmin) => setAdmin(isadmin)}
          aria-label="text alignment"
        >
          <ToggleButton value={true} sx={{
            bgcolor: admin === true ? "#9612dd" : "white",
            color: admin === true ? "white" : "inherit",
            borderLeft: '2.5px solid #9612dd',
            borderRight: '2.5px solid #9612dd',
            fontSize: '16px',
            fontFamily: 'Blackpast Demo'
          }}
          >
            <b>Admin</b>
          </ToggleButton>
          <ToggleButton value={false} sx={{
            bgcolor: admin === false ? "#9612dd" : "white",
            color: admin === false ? "white" : "inherit",
            borderLeft: '2.5px solid #9612dd',
            borderRight: '2.5px solid #9612dd',
            fontSize: '16px',
            fontFamily: 'Blackpast Demo'
          }}>
            <b>User</b>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </body>
  )
}


