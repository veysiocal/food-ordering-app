import React from 'react';

const Option = (props) => {


    return (
        <option value={props.value} onClick={props.eventHandler}>{props.value}</option>
    );

}

export default Option;

