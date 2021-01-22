import './App.css';
//import axios from 'axios';
import React from  'react';
import './ContactDetail.scss';

class ContactDetail extends React.Component {
    constructor(props) {
      super(props);
      //this.state = {date: new Date()};
    }
    
    updateContact(e){
      this.props.onUpdateContact(this.props.contact);
    }

    render() {
      return (
        <div className="contact-detail">
          <img src={this.props.contact.avatar} className="mainImage"></img>
          <span className="contact-detail-name">{this.props.contact.first_name} {this.props.contact.last_name}</span>
          <span className="contact-detail-mail">{this.props.contact.email}</span>
          <div><span onClick={this.updateContact.bind(this)} className="contact-detail-action">Editar</span> <span onClick={this.deleteContact} className="contact-detail-action">Eliminar</span></div>
        </div>
      );
    }
  }

export default ContactDetail;
