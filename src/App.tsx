import React, {useEffect, useState} from 'react';
import './app.css'
import axios from 'axios'
import Header from "./Header";
import RepoList from "./RepoList";
import Details from "./Details";

export type SearchUserType = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUserType[]
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export const GitHub = () => {
    const [selectUser, setSelectUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState<string>('gorbik')

    const fetchData = (term:string) => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then((res) =>
                setUsers(res.data.items)
            )
    }

    useEffect(() => {
        fetchData(tempSearch)
    }, [])


    return (
        <div className={'container'}>
            <div className={'sidebar'}>
                <Header fetchData={fetchData}
                        setTempSearch={setTempSearch}
                        tempSearch={tempSearch}/>
                <RepoList selectUser={selectUser} setSelectUser={setSelectUser} users={users}/>
            </div>
            <Details selectUser={selectUser}/>
        </div>


    )
}
