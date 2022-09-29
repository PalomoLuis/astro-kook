import React from 'react';
import '../../styles/Input.scss';

const Input = (props) => {
    const { name, id, extraClass, type, max } = props;
    return (
        <input className={'input ' + extraClass} name={name} id={id} type={type} maxLength={max} />
    )
}

export { Input };