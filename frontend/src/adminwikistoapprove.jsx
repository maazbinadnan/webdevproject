import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import './blogs.css'
import { Navbar } from './navigationbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Addwiki({ title, username, index, token }) {
    const handleclick = () => {
        let data ={
            title: title,
            username: username
            
        }
        console.log(data)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/admin/wiki',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data)
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div>
            <Button onClick={handleclick} key={index} variant='contained' sx={{ position: 'absolute', ml: 0.4, mt: 0.5 }}>Add Wiki</Button>
        </div>
    )
}
export default function Wikistoapprove() {

    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const token = localStorage.getItem('token')
    if (!token) {
        window.location.assign('/login')
    }

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/admin/wikistoapprove',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    if (loading) {
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }

    return (
        <div>
            <Navbar />

            <div style={{ position: 'absolute', top: '13%', left: '10%', right: '10%' }}>
                <Grid container spacing={2} rowSpacing={6}>
                    {posts.slice(1).map((post, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card sx={{ width: 'auto', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" >
                                        <b> {post.title}</b>
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {post.content}
                                        <p> by {post.username}</p>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Addwiki index={index}  token ={token} title={post.title} username={post.username} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
