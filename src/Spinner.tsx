import React, {FC} from 'react';
import './spinner.css'

type SpinnerProps = {
    color?: 'green' | 'red'
}
const Spinner:FC<SpinnerProps> = (props) => {

    return (
        <div className="lds-circle">
            <div className={props.color ? props.color : ''}/>
        </div>
    );
};

export default Spinner;