import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
    const currentUser = useSelector((state) => state.session.user);



    if (currentUser) return <Redirect to='/shop' />

    return (
        <p>Test</p>
    )
};

export default SignupForm;
