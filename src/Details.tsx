import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {SearchUserType, UserType} from "./App";

type PropsType = {
    selectUser: SearchUserType | null
}

const Details:FC<PropsType> = ({selectUser}) => {

    const [userDetail, setUserDetail] = useState<null|UserType>(null)

    useEffect(() => {
        console.log('sync user details')
        if (selectUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectUser.login}`)
                .then((res) =>
                    setUserDetail(res.data)
                )
        }

    },[selectUser])
    return (
        <div>
            <h2>Username</h2>
            {userDetail && <div>
                <img src={userDetail.avatar_url} alt=""/>
                <br/>
                {userDetail.login}
                <br/>
                followers: {userDetail.followers}
            </div>}
        </div>
    );
};

export default Details;