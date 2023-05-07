import { Button, Paper, TextField } from '@mui/material'
import './signup.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const images = [
    'https://i.pinimg.com/564x/67/84/44/678444d353864f248cc5bc50c458bf22.jpg',
    'https://i.pinimg.com/564x/98/fc/c1/98fcc177ccd5a027d393e129ad97adef.jpg',
    'https://i.pinimg.com/564x/fe/30/14/fe3014b2ee912af5e48a55fac4accd7a.jpg',
    'https://i.pinimg.com/564x/3a/2d/34/3a2d34f0a80d0a462ed5b953df963a3e.jpg',
    'https://i.pinimg.com/564x/71/76/e6/7176e69d53a2e0d32d2c92a2e4249860.jpg',
    'https://i.pinimg.com/564x/e9/61/12/e96112e6785dc975433ebc471b4bc2be.jpg',
    'https://i.pinimg.com/564x/70/9d/5c/709d5c6b219aa617c97fdc6c6b3dda65.jpg'

];

export default function Signup() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const backgroundImage = {
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        transition: 'background-image 0.5s ease-in-out',
        animation: 'slide 5s infinite',

    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [reEnterPasswordError, setReEnterPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    // email regex pattern to validate email input
    const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const usernameRegex = /^\S+$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        // reset error states
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setReEnterPasswordError('');
        setError(0);
        // check if email is valid
        if (!emailregex.test(email)) {
            setEmailError('Invalid email address');
            setError(1)
            return;
        }
        // check if username is valid
        if (!usernameRegex.test(username)) {
            setUsernameError('Username cannot contain spaces');
            setError(1)
            return;
        }
        // check if password is valid
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            setError(3)
            return;
        }
        // check if re-enter password is valid
        if (reEnterPassword !== password) {
            setReEnterPasswordError('Passwords do not match');
            setError(4)
            return;
        }
        // if no errors, set loading state to true


        setLoading(true);
        // if all the above checks are passed, submit the form
        const data = {
            email: email,
            username: username,
            password: password,
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/registeruser/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.token) {
                    console.log(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    window.location.assign('/movies')
                } else {
                    alert(JSON.stringify(response.data))
                }
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                // set loading state back to false
                setLoading(false);
            });;

        // continue with form submission
        // ...
    };
    return (

        <div className="body" >
            <h1 className='heading'>Create Account</h1>
            <form>
                <div className="form">
                    <Paper elevation={24} sx={{ position: 'absolute', backgroundColor: '#f8f4e3', width: '100%', height: '100%' }} >
                        
                        <TextField className='email'
                            sx={{ backgroundColor: '#f8f4e3' }}
                            label="Email"
                            variant="outlined"
                            color='secondary'
                            size='small'
                            required
                            error={error==1}
                            helperText={emailError ? emailError : null}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField className='username'
                            sx={{ backgroundColor: '#f8f4e3' }}
                            label="Username"
                            variant="outlined"
                            color='secondary'
                            size='small'
                            required
                            error={error==2}
                            helperText={usernameError ? usernameError : null}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField className='passwordsignup'
                            sx={{ backgroundColor: '#f8f4e3' }}
                            label="Password"
                            variant="outlined"
                            helperText={passwordError ? passwordError : null}
                            size='small'
                            type="password"
                            required
                            error={error==3}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField className='re-enterpassword'
                            sx={{ backgroundColor: '#f8f4e3' }}
                            label="Re-Enter Password"
                            variant="outlined"
                            helperText={reEnterPasswordError ? reEnterPasswordError : null}
                            size='small'
                            type="password"
                            required
                            error={error==4}
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                        />


                        <Button
                            type="submit"
                            variant="filled"
                            className="signupbutton"
                            onClick={handleSubmit}
                            disabled={loading} // add disabled prop
                            sx={{ backgroundColor: '#9612dd', width: '35%', border: '2px solid #9612dd' }}
                        >
                            {loading ? 'Loading...' : 'Sign Up'} {/* change button text during loading */}
                        </Button>

                    </Paper>
                </div>
            </form>
            <div className='randomimages' style={backgroundImage}></div>
        </div>





    )
}