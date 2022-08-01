import React, {useContext} from "react";
import {Route, Navigate, Outlet} from "react-router-dom";

import {AuthContext} from "../context/auth";

function AuthRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext);
    return (
        user ? <Navigate to={"/"}/> : <Outlet/>
    );
}


export default AuthRoute;