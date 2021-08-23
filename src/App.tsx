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

export const GitHub = () => {
    const [selectUser, setSelectUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState<string>('')

    useEffect(() => {
        console.log('sync')
        if (selectUser) {
            document.title = selectUser.login + ' App'
        }
    }, [selectUser])
    useEffect(() => {
        axios.get<SearchResult>('https://api.github.com/search/users?q=gorbik')
            .then((res) =>
                setUsers(res.data.items)
            )

    }, [])

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
                    <button>Find</button>
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
                <div>Details</div>
            </div>
        </div>


    )
}
