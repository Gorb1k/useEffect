import React, {FC} from 'react';

type PropsType = {
    tempSearch: string
    setTempSearch: (value: string) => void
    fetchData: (value: string) => void
}

const Header:FC<PropsType> = ({tempSearch, setTempSearch, fetchData}) => {

    return (
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
    );
};

export default Header;