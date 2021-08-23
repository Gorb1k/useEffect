import React, {useEffect, useState} from 'react';
import './app.css'
import axios from 'axios'

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export const GitHub = () => {
    const [selectUser, setSelectUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [userDetail, setUserDetail] = useState<null|UserType>(null)
    const [tempSearch, setTempSearch] = useState<string>('gorbik')

    const fetchData = (term:string) => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then((res) =>
                setUsers(res.data.items)
            )
    }


    useEffect(() => {
        console.log('sync')
        if (selectUser) {
            document.title = selectUser.login + ' App'
        }
    }, [selectUser])
    useEffect(() => {
        fetchData(tempSearch)
    }, [])
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
        <div className={'container'}>
            <div className={'sidebar'}>
                <div>
                    <input value={tempSearch}
                           onChange={(e) => {
                               setTempSearch(e.currentTarget.value)
                           }}
                           type="text"
                           placeholder={'search'}/>
                    <button onClick={() => {
                        fetchData(tempSearch)
                    }}>
                        Find
                    </button>
                </div>
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
            </div>
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
        </div>


    )
}
