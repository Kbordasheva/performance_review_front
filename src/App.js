import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { authCheckState } from "./store/actions/auth";
import Layout from "./components/Layouts/MainLayout/Layout";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Routing/PrivateRoute";
import "./assets/css/App.scss";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authCheckState());
    }, [dispatch]);
    return (
        <Router>
            {/*<Header/>*/}
                <Switch>
                    <Route exact path="/login" render={(props) => ( <Layout> <Auth {...props}/> </Layout> )}/>
                    <PrivateRoute exact path="/" component={Dashboard}/>
                    <Route render={() => <h1>Not found</h1>}/>
                </Switch>
        </Router>
    );
};

export default App;
