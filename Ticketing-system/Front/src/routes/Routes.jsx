import React, { Route, Switch } from 'react-router-dom';
import AuthContextProvider from '../contexts/AuthContext';
//Import components
import AddNewUser from '../components/AddNewUser';
import Users from '../components/AllUsers';
import Signin from '../components/Signin';
import UpdatePassword from '../components/UpdatePassword';
import NewTicket from '../components/NewTick';
import ListTicket from '../components/ListTick';
import NewAssign from '../components/NewAssign';
//Getting ProtectedRoute 
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return ( 
        <Switch>
            {/*Include context provider to allow all components in app.js to use the context*/ }
                <AuthContextProvider>
                    {/*Normal routes doesn't need context data*/}
                    <Route exact path='/' component={Signin}></Route>
                    <Route exact path='/updatepassword/:id' component={UpdatePassword}></Route>

                    {/*Protected routes*/}
                    <ProtectedRoute exact path='/newuser' comp={AddNewUser} ></ProtectedRoute>
                    <ProtectedRoute exact path='/users' comp={Users}></ProtectedRoute>
                    <ProtectedRoute exact path='/newticket' comp={NewTicket} ></ProtectedRoute>
                    <ProtectedRoute exact path='/listtickets' comp={ListTicket}></ProtectedRoute>
                    <ProtectedRoute exact path='/newassign/:idTicket/:idUser' comp={NewAssign}></ProtectedRoute>
                </AuthContextProvider>
        </Switch>
    );
}
 
export default Routes;