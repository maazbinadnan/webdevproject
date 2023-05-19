import "./navbar.css"
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, InputBase, styled, alpha, Drawer, Box, List, Paper, TextField, Backdrop, Typography, IconButton, Avatar, Icon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import KeyIcon from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';


import { useEffect } from "react";
import jwtDecode from "jwt-decode";


function UserAccountDrawer({ drawerisopen, closedrawer }) {
    const [openEmailBackdrop, setOpenEmailBackdrop] = useState(false);
    const [openPasswordBackdrop, setOpenPasswordBackdrop] = useState(false);
    const [openMovieBackdrop, setOpenMovieBackdrop] = useState(false);
    const [openBlogPostBackdrop, setOpenBlogPostBackdrop] = useState(false);
    const [userdeleteBackdrop, setuserdeleteBackdrop] = useState(false);
    const token = localStorage.getItem('token')
    const [admin, Setadmin] = useState(false)
    useEffect(() => {
        if (jwtDecode(token).user === 'admin') {
            Setadmin(true)
        }
    }, [])



    const closebackdrop = () => {
        setOpenEmailBackdrop(false);
        setOpenPasswordBackdrop(false);
        setOpenMovieBackdrop(false);
        setOpenBlogPostBackdrop(false);
        setuserdeleteBackdrop(false);

    };

    const openEmailBackdropHandler = () => {
        setOpenEmailBackdrop(true);
        closedrawer();
    };

    const openPasswordBackdropHandler = () => {
        setOpenPasswordBackdrop(true);
        closedrawer();
    };

    const openMovieBackdropHandler = () => {
        setOpenMovieBackdrop(true);
        closedrawer();
    };

    const openBlogPostBackdropHandler = () => {
        setOpenBlogPostBackdrop(true);
        closedrawer();
    };
    const openuserdeleteBackdropHandler = () => {
        setuserdeleteBackdrop(true);
        closedrawer();
    };

    const logoutbutton = () => {
        localStorage.removeItem('token')
        window.location.assign('/login')
    }


    return (
        <div>
            <Drawer
                anchor="right"
                open={drawerisopen}
                onClose={closedrawer}
            >
                <Box sx={{ width: '250px' }} role="presentation" >
                    <List >
                        <Button onClick={openEmailBackdropHandler} variant="outlined" sx={{ color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >
                        <MailIcon style={{margin:'5px'}}/>  Change Email
                        </Button>
                        <Button onClick={openPasswordBackdropHandler} variant="outlined" sx={{ color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >
                        <KeyIcon style={{margin:'5px'}}/>  Change Password
                        </Button>
                        <Button onClick={openMovieBackdropHandler} variant="outlined" sx={{ color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >
                        <MovieCreationIcon style={{margin:'5px'}}/> Request Movie
                        </Button>
                        <Button onClick={openBlogPostBackdropHandler} variant="outlined" sx={{ color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >
                           <PostAddIcon style={{margin:'5px'}}/> Request Blog Post
                        </Button>
                        <Button onClick={logoutbutton} variant="outlined" sx={{color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >
                        <LogoutIcon style={{margin:'5px'}}/>Logout
                        </Button>
                        {admin && (
                            <div>
                                <Button onClick={openuserdeleteBackdropHandler} variant="outlined" sx={{ color: 'white', backgroundColor: 'black', width: '100%', marginTop: '10%', borderRadius: '0px', border: '3px solid black' }} >Delete User</Button>
                            </div>
                        )}
                    </List>
                    
                </Box>
            </Drawer>
            <Backdrop open={openEmailBackdrop || openBlogPostBackdrop || openMovieBackdrop || openPasswordBackdrop || userdeleteBackdrop}>
                {openEmailBackdrop && <ChangeEmail closebackdrop={closebackdrop} />}
                {openPasswordBackdrop && <ChangePassword closebackdrop={closebackdrop} />}
                {openMovieBackdrop && <RequestMovie closebackdrop={closebackdrop} />}
                {openBlogPostBackdrop && <RequestBlog closebackdrop={closebackdrop} />}
                {userdeleteBackdrop && <DeleteUser closebackdrop={closebackdrop} />}
            </Backdrop>

        </div>

    )
}

function ChangeEmail({ closebackdrop }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const token = localStorage.getItem('token');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(!emailRegex.test(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            newemail: email
        };
        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/changeemail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.newissuedtoken) {
                    localStorage.setItem('token', response.data.newissuedtoken)
                }
                console.log(JSON.stringify(response.data));
                alert(response.data.message);
                setIsLoading(false);
                closebackdrop()
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <div className="Backdropforall">
            <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '25%', width: '30%', height: '30%', left: '35%' }} elevation={24}>
                <div>
                    <IconButton onClick={closebackdrop} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <h2 style={
                        {
                            position: "absolute",
                            color: '#f8f4e3',
                            textAlign: 'center',
                            marginTop: '5%',
                            left: '25%',
                            fontSize: '30px',
                        }}>Enter New Email</h2>
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '20%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',
                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? "Invalid email address" : ""}
                    />
                </div>
                <Button
                    variant="filled"
                    size="large"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#660C97',
                        border: '2px solid #660C97',
                        bottom: '10%',
                        left: '40%'
                    }}
                    onClick={handleSubmit}
                    disabled={emailError || isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </Paper>
        </div>
    );
}
function ChangePassword({ closebackdrop }) {
    const [notempty, setnotempty] = useState(false);
    const [password, setPassword] = useState('');
    const [newpassword, Setnewpassword] = useState('');
    const [passwordError, setPasswordError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(!(password.length < 8));
    };
    const handleNewPasswordChange = (event) => {
        Setnewpassword(event.target.value);
        setPasswordError(!(newpassword.length < 8));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            oldpassword: password,
            newpassword: newpassword
        };
        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/changepassword',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <div className="Backdropforall">
            <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '25%', width: '30%', height: '45%', left: '35%' }} elevation={24}>
                <div>
                    <IconButton onClick={closebackdrop} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <h2 style={
                        {
                            position: "absolute",
                            color: '#f8f4e3',
                            textAlign: 'center',
                            marginTop: '5%',
                            left: '20%',
                            fontSize: '30px',
                        }}>Change Password</h2>
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '15%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordError ? "password must be greater than 8 characters" : ""}
                        label="Old Password"
                        required
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '35%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        value={newpassword}
                        onChange={handleNewPasswordChange}
                        error={passwordError}
                        helperText={passwordError ? "password must be greater than 8 characters" : ""}
                        label="New Password"
                        required
                    />
                </div>
                <Button
                    variant="filled"
                    size="large"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#660C97',
                        border: '2px solid #660C97',
                        bottom: '10%',
                        left: '40%'
                    }}
                    onClick={handleSubmit}
                    disabled={passwordError || isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </Paper>
        </div>
    );
}

function RequestBlog({ closebackdrop }) {
    const [Title, SetTitle] = useState('');
    const [content, SetContent] = useState('')
    const [contentError, Setcontenterror] = useState(true);
    const [contentlengtherror, setcontentlengterror] = useState(true);
    const [titleError, Settitleerror] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    const handletitleChange = (event) => {
        event.preventDefault()
        SetTitle(event.target.value);
        Settitleerror((Title.trim(' ') === ''));
    };
    const handlecontentChange = (event) => {

        SetContent(event.target.value);
        Setcontenterror(content.length < 30);
        setcontentlengterror((content.length > 300));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            title: Title,
            content: content
        };
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/addwiki',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data);
                setIsLoading(false);
                closebackdrop()

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="Backdropforall">
            <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '10%', width: '40%', height: '70%', left: '30%' }} elevation={24}>
                <div>
                    <IconButton onClick={closebackdrop} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <h2 style={
                        {
                            position: "absolute",
                            color: '#f8f4e3',
                            textAlign: 'center',
                            marginTop: '5%',
                            left: '45%',
                            fontSize: '30px',
                        }}>Blog</h2>
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '20%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',
                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}

                        required
                        value={Title}
                        onChange={handletitleChange}

                        helperText={titleError ? "Title cannot be empty" : ""}
                        label="Title"

                    />
                </div>
                <div>
                    <TextField
                        required
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '35%',
                            width: '90%',

                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',
                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        multiline
                        minRows={5}
                        maxRows={10}
                        value={content}
                        onChange={handlecontentChange}
                        helperText={
                            <Typography variant="body2">
                                {contentError ? "content must be greater than 30 characters" : "" || contentlengtherror ? `content must be less than 300 characters` : ""}
                                <br />
                                <Typography variant="subtitle2" component="span" fontWeight="bold">Count: {content.length}</Typography>
                            </Typography>
                        }
                        label="Content"

                    />
                </div>
                <Button
                    variant="filled"
                    size="large"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#660C97',
                        border: '2px solid #660C97',
                        bottom: '10%',
                        left: '40%'
                    }}
                    onClick={handleSubmit}
                    disabled={contentError || isLoading || contentlengtherror || titleError}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </Paper>
        </div>
    );
}
function DeleteUser({ closebackdrop }) {
    const [empty, setempty] = useState(true)
    const [user, SetUser] = useState('')
    const [loading, setLoading] = useState(false)
    const [usererror, setusererror] = useState(false)
    const usernameregex = /^\S+$/;
    const token = localStorage.getItem('token');

    const handluserChange = (event) => {
        event.preventDefault()
        SetUser(event.target.value);
        setusererror(!usernameregex.test(event.target.value));
        setempty(!user.trim)
    };
    const handleSubmit = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/admin/users/${user}`,
            headers: {
                'Authorization': `Bearer ${token} `
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                alert(response.data)
                setLoading(false);
                closebackdrop()
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className="Backdropforall">
            <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '10%', width: '30%', height: '30%', left: '30%' }} elevation={24}>
                <div>
                    <IconButton onClick={closebackdrop} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <h2 style={
                        {
                            position: "absolute",
                            color: '#f8f4e3',
                            textAlign: 'center',
                            marginTop: '5%',
                            left: '30%',
                            fontSize: '30px',
                        }}>Delete User</h2>
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '20%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',
                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        value={user}
                        onChange={handluserChange}

                        helperText={usererror ? "username cannot have spaces" : ""}
                        label="username to delete"

                    />
                </div>
                <div>

                </div>
                <Button
                    variant="filled"
                    size="large"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#660C97',
                        border: '2px solid #660C97',
                        bottom: '10%',
                        left: '40%'
                    }}
                    onClick={handleSubmit}
                    disabled={loading || usererror || empty}
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>
            </Paper>
        </div>
    );
}
function RequestMovie({ closebackdrop }) {
    const [empty, setempty] = useState(true);
    const [moviename, Setmoviename] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [moviedirector, setmoviedirector] = useState('');
    const [overview, SetOverview] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('')

    const token = localStorage.getItem('token');

    const handlemoviedirectorChange = (event) => {

        setmoviedirector(event.target.value);

    };
    const handleOverviewChange = (event) => {

        SetOverview(event.target.value);

    }
    let data = {
        moviename: moviename,
        moviedirector: moviedirector,
        overview: overview,
        genre: genre,
        releaseDate: releaseDate

    }

    const handleSubmit = (event) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/requestmovie',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data);
                setIsLoading(false);
                closebackdrop()

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="Backdropforall">
            <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '10%', width: '30%', height: '70%', left: '35%' }} elevation={24}>
                <div>
                    <IconButton onClick={closebackdrop} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <h2 style={
                        {
                            position: "absolute",
                            color: '#f8f4e3',
                            textAlign: 'center',
                            marginTop: '5%',
                            left: '25%',
                            fontSize: '30px',
                        }}>Request Movie</h2>
                </div>
                <div>
                    <TextField
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '20%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        variant="outlined"
                        value={moviename}
                        onChange={(e) => Setmoviename(e.target.value)}
                        label="Movie Name"
                    />
                </div>
                <div>
                    <TextField
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '35%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        variant="outlined"
                        value={moviedirector}
                        onChange={handlemoviedirectorChange}

                        label="Director Name"
                    />
                </div>
                <div>
                    <TextField
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '50%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        variant="outlined"
                        value={overview}
                        onChange={handleOverviewChange}
                        label="Overview"
                    />
                </div>
                <div>
                    <TextField
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '65%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        variant="outlined"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        label="Genre"
                    />
                </div>
                <div>
                    <TextField
                        sx={{
                            position: "absolute",
                            fontFamily: 'Inter',
                            textAlign: 'left',
                            marginTop: '80%',
                            width: '90%',
                            borderRadius: '5px',
                            fontSize: '50px',
                            left: '5%',

                            color: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                        required
                        variant="outlined"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        label="Release Date"
                    />
                </div>
                <Button
                    variant="filled"
                    size="large"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#660C97',
                        border: '2px solid #660C97',
                        bottom: '10%',
                        left: '40%'
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </Paper>
        </div>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export function Navbar() {
    const [admin, Setisadmin] = useState(false)
    const location = useLocation();
    const currentPath = location.pathname;
    let searchLabel = "Search for Movies";

    if (currentPath.startsWith("/actors")) {
        searchLabel = "Search for Actors";
    } else if (currentPath.startsWith("/blogs")) {
        searchLabel = "Search for Posts";
    }
    const [moviename, Setmoviename] = useState("")
    const [drawerisopen, Setdrawerisopen] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [username, setusername] = useState('Admin')
    useEffect(() => {

        if (jwtDecode(token).user === 'admin') {
            Setisadmin(true)
        } else {
            setusername(jwtDecode(token).username)
        }
    }, [admin])
    const handlesearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (currentPath.startsWith("/actors")) {
                if (moviename.trim() !== '') {
                    navigate(`/actors/searchactor?actorname=${moviename}`);
                    Setmoviename('');
                }
            } else if (currentPath.startsWith("/blogs")) {
                if (moviename.trim() !== '') {
                    navigate(`/blogs/searchblog?title=${moviename}`);
                    Setmoviename('');
                }
            } else {
                if (moviename.trim() !== '') {
                    navigate(`/movie?moviename=${moviename}`);
                    Setmoviename('');
                }
            }
        }
    };

    const opendrawer = () => {

        Setdrawerisopen(true)
    }

    const closedrawer = () => {
        Setdrawerisopen(false)
    }



    return (

        <div>
            <AppBar position="fixed" sx={{ height: '9%', backgroundColor: '#360538' }}>
                <Toolbar>
                    {!admin && (
                        <div>
                            <div>
                                <Link className="home" to ={'/home'}>
                                    Home
                                </Link>
                            </div>
                            <div>
                                <Link className="movies" to={'/movies'}>
                                    Movies
                                </Link>
                            </div>
                            <div>
                                <Link className="blogs" to={'/blogs'}>
                                    Posts
                                </Link>
                            </div>
                            <div>
                                <Link className="reviews" to={'/reviews'}>
                                    Reviews
                                </Link>
                            </div>
                            <div>
                                <Link className="actors" to={'/actors'}>
                                    Actors
                                </Link>
                            </div>

                        </div>
                    )}

                    {admin && (
                        <div>
                            <Link className="movies" to={'/wikistoapprove'}>
                                Approve Posts
                            </Link>
                            <div>
                                <Link className="home">
                                    Home
                                </Link>
                            </div>
                            <div>
                                <Link className="blogs" to={'/blogs'}>
                                    Blogs
                                </Link>
                            </div>
                        </div>

                    )}

                    <Search sx={{ left: '48%', top: '4%' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={searchLabel}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => Setmoviename(event.target.value)}
                            onKeyDown={handlesearch}
                        />
                    </Search>

                    <div className="login">
                        <Link>
                            <Avatar onClick={opendrawer} size sx={{ width: 40, height: 40, color: '#6d435a', backgroundColor: 'white', border: '2px solid black' }}>
                                {username.charAt(0)}
                            </Avatar>
                        </Link>
                        <UserAccountDrawer drawerisopen={drawerisopen} closedrawer={closedrawer} />

                    </div>
                    <p style={{
                        position: 'absolute', top: '22%', left: '91%', fontSize: '15px', color: 'white', fontWeight: 'bold', fontFamily: 'Blackpast Demo'
                    }}>{username}</p>
                </Toolbar>
            </AppBar>
        </div>
    )
}
