import React, {FC, useEffect} from 'react';
import {SearchUserType} from "./App";

type PropsType = {
    selectUser: SearchUserType | null
    users: SearchUserType[]
    setSelectUser: (user: SearchUserType) => void
}

const RepoList:FC<PropsType> = ({setSelectUser, selectUser, users}) => {

    useEffect(() => {
        console.log('sync')
        if (selectUser) {
            document.title = selectUser.login + ' App'
        }
    }, [selectUser])

    return (
        <ul className={'user-list'}>
            {users.map((u) =>
                <li key={u.id}
                    className={selectUser?.id === u.id ? 'selected' : ''}
                    onClick={() => {
                        setSelectUser(u)
                    }}>
                    {u.login}
                </li>)}
        </ul>
    );
};

export default RepoList;