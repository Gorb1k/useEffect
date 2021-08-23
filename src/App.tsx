import React, {FC, useEffect, useState} from 'react';
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

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}
export const Search: FC<SearchPropsType> = ({onSubmit, value}) => {

    const [tempSearch, setTempSearch] = useState<string>('')

    useEffect(() => {
        setTempSearch(value)
    }, [value])
    return (
        <div>
            <input value={tempSearch}
                   onChange={(e) => {
                       setTempSearch(e.currentTarget.value)
                   }}
                   type="text"
                   placeholder={'search'}/>
            <button onClick={() => {
                onSubmit(tempSearch)
            }}>
                Find
            </button>
        </div>
    )
}
type UsersListPropsType = {
    term: string
    selectUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}
export const UsersList: FC<UsersListPropsType> = ({selectUser, onUserSelect, term}) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    useEffect(() => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then((res) =>
                setUsers(res.data.items)
            )

    }, [term])
    return (
        <ul className={'user-list'}>
            {users.map((u) =>
                <li key={u.id}
                    className={selectUser?.id === u.id ? 'selected' : ''}
                    onClick={() => {
                        onUserSelect(u)
                    }}>
                    {u.login}
                </li>)}
        </ul>
    )
}
type TimerProps = {

}
export const Timer:FC<TimerProps> = ({}) => {
    const [seconds, setSeconds] = useState(60)
    useEffect(() => {
        setInterval(() => {
            setSeconds((sec) => sec - 1)
        },1000)
    },[])
  return(
      <div>
          {seconds}
      </div>
  )
}
type UserDetailsType = {
    user: SearchUserType | null
}
export const UserDetails: FC<UserDetailsType> = ({user}) => {
    const [userDetail, setUserDetail] = useState<null | UserType>(null)
    useEffect(() => {
        console.log('sync user details')
        if (user) {
            axios
                .get<UserType>(`https://api.github.com/users/${user.login}`)
                .then((res) =>
                    setUserDetail(res.data)
                )
        }

    }, [user])
    return (
        <div>
            {userDetail && <div>
                <h2>{userDetail.login}</h2>
                <Timer/>
                <img src={userDetail.avatar_url} alt=""/>
                <br/>
                {userDetail.login}
                <br/>
                followers: {userDetail.followers}
            </div>}
        </div>
    )
}

export const GitHub = () => {
    const [selectUser, setSelectUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('gorbik')

    useEffect(() => {
        console.log('sync')
        if (selectUser) {
            document.title = selectUser.login + ' App'
        }
    }, [selectUser])

    return (
        <div className={'container'}>
            <div className={'sidebar'}>
                <Search value={searchTerm} onSubmit={(fixedValue) => {
                    setSearchTerm(fixedValue)
                }}/>
                <button onClick={() => {
                    setSearchTerm('gorbik')
                }}>Reset
                </button>
                <UsersList term={searchTerm} selectUser={selectUser} onUserSelect={setSelectUser}/>
            </div>
            <UserDetails user={selectUser}/>
        </div>
    )
}
