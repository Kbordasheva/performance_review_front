import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import MainLayout from "../Layouts/MainLayout/Layout";
import SecondaryLayout from "../Layouts/SecondaryLayout/Layout";

const PrivateRoute = ({component: Component, secondaryLayout, ...rest}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    secondaryLayout ? (
                        <SecondaryLayout>
                          <Component {...props} {...rest} />
                        </SecondaryLayout>
                      ) : (
                        <MainLayout>
                          <Component {...props} {...rest} />
                        </MainLayout>
                      )
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
};

export default PrivateRoute;
