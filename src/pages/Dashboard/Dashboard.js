import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import Loading from '../../components/Loading';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user, loading] =  useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className='text-2xl font-bold text-green-700 my-5 text-center'>Welcome to {user.displayName}'s Dashboard</h2>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    <li><Link to="/dashboard">My Profile</Link></li>
                    {
                        !admin && <>
                        <li><Link to="/dashboard/my-orders">My Orders</Link></li>
                        <li><Link to="/dashboard/add-review">Add Review</Link></li>
                        </>
                    }
                    {
                        admin && <>
                        <li><Link to="/dashboard/make-admin">Make Admin</Link></li>
                        <li><Link to="/dashboard/add-product">Add Product</Link></li>
                        <li><Link to="/dashboard/manage-product">Manage Products</Link></li>
                        <li><Link to="/dashboard/manage-all-orders">Manage All Orders</Link></li>                        
                        </>
                    }
                    
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;