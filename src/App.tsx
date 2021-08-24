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
    seconds:number
    onChange: (sec:number) => void
    timerKey:string
}
export const Timer: FC<TimerProps> = (props) => {
    const [seconds, setSeconds] = useState(props.seconds)
    useEffect(() => {
        setSeconds(props.seconds)
    },[props.seconds])
    useEffect(() => {
        props.onChange(seconds)
    },[seconds])
    useEffect(() => {
        const timerInterval = setInterval(() => {

            setSeconds((sec) => {
                if (sec > 0) {
                    console.log('tick')
                    return  sec - 1
                } else {
                    console.log('end')
                    return 0
                }
            })

        }, 1000)
        return () => {
            clearInterval(timerInterval)
        }
    }, [props.timerKey])
    return (
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
    const [seconds, setSeconds] = useState(10)
    useEffect(() => {
        console.log('sync user details')
        if (user) {
            axios
                .get<UserType>(`https://api.github.com/users/${user.login}`)
                .then((res) =>{
                    setSeconds(10)
                    setUserDetail(res.data)
                    }

                )
        }

    }, [user])
    useEffect(() => {
        if (seconds < 1) {
            setUserDetail(null)
        }
    },[seconds])
    return (
        <div>
            {userDetail && <div>
                <h2>{userDetail.login}</h2>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetail.id.toString()}/>
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
