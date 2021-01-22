
import React, {useEffect, useState} from  'react';
import './ContactDetailForm.scss';

function ContactDetailForm({firstName, lastName, email,updateValue}) {
    const onInputChange= function(e){
        updateValue(e.target.name, e.target.value);
    }
    return (
        <>
            <input value={firstName} onChange={onInputChange} placeholder="First name" name="firstName"/>
            <input value={lastName} onChange={onInputChange} placeholder="Last name" name="lastName"/>
            <input value={email} onChange={onInputChange} placeholder="Email" name="email"/>
        </>
    );
}

export default ContactDetailForm;
