import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";
import Stack from '@mui/material/Stack';
import axios from "axios";
function Pagelist({ count, pagechange }) {
    return (
        <div className="pagination">
            <Stack spacing={2}>
                <Pagination
                    count={count}
                    onChange={pagechange}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            sx={{
                                color: 'white',
                                '&.Mui-selected': {
                                    backgroundColor: '#9612dd',
                                    color: 'black',
                                },
                            }}
                        />
                    )}
                />
            </Stack>
        </div>
    );
}
function Renderactorimages({ actors }) {

    if (!actors) {
        return <div>Loading...</div>;
    }

    return (
        <div className="imagelist">
            <Grid container sx={{ height: '100%', width: '100%' }}>
                {actors.map((actors) => (
                    <Grid item key={actors.actorID} xs={4} md={1.5} sx={{ margin: 0 }}>\
                        <Link to={`/actor/${actors.imdbID}`}>
                            <img src={`${actors.photourl}`} alt={actors.actorname} title={actors.actorname} className="images" />
                        </Link>
                        <p style={{fontSize: '15px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo',textAlign:'center'}}>{actors.actorname}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export function ActorPage() {
    const [actors, Setactors] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [currentpage, Setcurrentpage] = useState(1);
    //handle pagination
    const handlePageChange = (event, value) => {
        Setcurrentpage(value);
    };

    //    * handle movies function 
    //    */
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.assign('/login')
    }
    useEffect(() => {
        console.log(token)


        let url = `http://localhost:5000/user/actor?pagenumber=${currentpage}`;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(url)
                console.log(response.data)
                console.log(response.data.totalrecords.total)
                setCount(Math.ceil(response.data.totalrecords[0].total / 24))
                console.log(count)
                Setactors(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentpage])

    return (
        <div className="background" >
            <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

            </div>
            <p style={{
                position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold', fontFamily: 'Blackpast Demo'
            }}>All Actors</p>
            <Renderactorimages actors={actors}></Renderactorimages>
            <Navbar />
            <Pagelist count={count} pagechange={handlePageChange}>
            </Pagelist>

        </div>
    )
}
