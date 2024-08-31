import React from "react";
import { useParams, Outlet } from "react-router-dom";

export default function BlogPost(){

    console.log(useParams())
    const {id} = useParams();
    return(
        <>
        <Outlet/>
        <div>profile {id}</div>
        </>
        
    )
}