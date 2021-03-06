import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../components/Loading';
import User from './User';

const MakeAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://enigmatic-cove-82612.herokuapp.com/user', {
        method: 'GET',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">All Users: {users.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           users.map(user=><User
                           key={user._id}
                           user={user}
                           refetch={refetch}
                           ></User>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;