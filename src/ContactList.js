import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from  'react';
import ContactDetail from './ContactDetail';
import ContactDetailForm from './ContactDetailForm';
import './ContactList.scss';
function ContactList() {
    const [contacts, setContacts] = useState([]);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [newContactFirstName, setNewContactFirstName] = useState("");
    const [newContactLastName, setNewContactLastName] = useState("");
    const [newContactEmail, setNewContactEmail] = useState("");

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateContactFirstName, setUpdateContactFirstName] = useState("");
    const [updateContactLastName, setUpdateContactLastName] = useState("");
    const [updateContactEmail, setUpdateContactEmail] = useState("");
    const [updateContactId, setUpdateContactId] = useState("");

    useEffect(() => {
        axios.get("https://reqres.in/api/users").
            then(function(res){
                //console.debug(res);
                setContacts(res.data.data);
            }); 
        return ()=> {
            console.debug("detached");
        };
      }, []);

    const openAddModal = function(){
        setShowAddModal(true);
    };

    const updateValue = function(name, value){
        switch(name){
            case 'firstName':
                setNewContactFirstName(value);
                break;
            case 'lastName':
                setNewContactLastName(value);
                break;
            case 'email':
                setNewContactEmail(value);
                break;
            default:
                break;
        }
    };

    const updateCurrentValue = function(name, value){
        switch(name){
            case 'firstName':
                setUpdateContactFirstName(value);
                break;
            case 'lastName':
                setUpdateContactLastName(value);
                break;
            case 'email':
                setUpdateContactEmail(value);
                break;
            default:
                break;
        }
    };

    const addNewContact =  function(){
        axios.post("https://reqres.in/api/users",{
            first_name: newContactFirstName,
            last_name: newContactLastName,
            email: newContactEmail,
            avatar: "https://reqres.in/img/faces/1-image.jpg",
        }).then(
            function(res){
                var contactsTemp = contacts;
                contactsTemp.push(res.data);
                setContacts(contactsTemp);
                setShowAddModal(false);

                setNewContactFirstName("");
                setNewContactLastName("");
                setNewContactEmail("");
            }
        );
    }

    const onUpdateContact = function(contact){
        setUpdateContactFirstName(contact.first_name);
        setUpdateContactLastName(contact.last_name);
        setUpdateContactEmail(contact.email);
        setUpdateContactId(contact.id);
        setShowUpdateModal(true);
    }

    const updateContact = function(){
        axios.put("https://reqres.in/api/users/" + updateContactId,{
            first_name: updateContactFirstName,
            last_name: updateContactLastName,
            email: updateContactEmail,
            avatar: "https://reqres.in/img/faces/1-image.jpg",
            id: updateContactId,
        }).then(
            function(res){
                var contactsTemp = contacts;
                //contactsTemp.push(res.data);
                var i = 0;
                var ix = 0;
                while (ix === 0 && i< contactsTemp.length){
                    if (contactsTemp[i].id === res.data.id){
                        ix = i;
                    }
                    i++;
                }
                contactsTemp.splice(ix,1,res.data);
                setContacts(contactsTemp);
                setShowUpdateModal(false);

                setUpdateContactFirstName("");
                setUpdateContactLastName("");
                setUpdateContactEmail("");
                setUpdateContactId("");
            }
        );
    }

    return (
        <>  
            <div className="add-button-container">
                <span onClick={openAddModal}>Agregar</span>
            </div>
                {
                    contacts.map(c=>
                        <ContactDetail contact={c} key={c.id} onUpdateContact={onUpdateContact}></ContactDetail>
                    )
                }

            <div className={showAddModal ? "modal-show": "modal-hide"}>
                <div className="modal-content">
                <ContactDetailForm 
                    firstName={newContactFirstName}
                    lastName={newContactLastName}
                    email={newContactEmail}
                    updateValue={updateValue}
                    >
                </ContactDetailForm>
                <div className="modal-footer">
                    <span onClick={addNewContact}>Agregar</span>
                </div>
                </div>
            </div>

            <div className={showUpdateModal ? "modal-show": "modal-hide"}>
                <div className="modal-content">
                <ContactDetailForm 
                    firstName={updateContactFirstName}
                    lastName={updateContactLastName}
                    email={updateContactEmail}
                    updateValue={updateCurrentValue}
                    onUpdateContact={onUpdateContact}>
                </ContactDetailForm>
                <div className="modal-footer">
                    <span onClick={updateContact}>Actualizar</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default ContactList;
