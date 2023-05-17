import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link, useLocation, } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
function Renderimages({ result }) {

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="imagelist" style={{ display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {result.map((actor) => (
          <Grid item key={actor.imdbID} xs={4} md={1.5} sx={{ margin: 0 }}>\
            <Link to={`/actor/${actor.imdbID}`}>
              <img src={`${actor.photourl}`} alt={actor.actorname} title={actor.actorname} className="images" />
            </Link>
          </Grid>
        ))}
        
      </Grid>








    </div>
  );

}
export function Actorsearched() {
  const location = useLocation();
  const actorname = new URLSearchParams(location.search).get("actorname");
  const [searchresult, setresult] = React.useState('')
  const [sortby, setSortby] = React.useState('');

  //    * handle movies function 
  //    */
  const token = localStorage.getItem('token')
  useEffect(() => {

    console.log(token)
    console.log(sortby)

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/actor/name?actorname=${actorname}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        // console.log(response.data)
        setresult(response.data.result)

      })
      .catch((error) => {
        console.log(error);
      });
    //calling actors

  }, [token, sortby, actorname])

  return (
    <div className="background" >
      <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold', fontFamily: 'Blackpast Demo'
      }}>All Actors with "{`${actorname}`}"</p>
      <Renderimages result={searchresult}></Renderimages>
      <Navbar />
    </div>
  )
}