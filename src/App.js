import React from 'react'
import Header from './Header'
import ContactList from './contact-list/ContactList'
import AddContact from './AddContact'
import EditContact from './EditContact'
import Search from './search/Search'
import * as db from './data'
import './App.css'

class App extends React.Component {
  state = {
    contacts: null,
    isEnable: true,
    searchValue: '',
    addForm: false,
    editForm: false,
    currentId : null,
  }

  componentDidMount() {
    const data = db.getContacts()
    this.setState({ contacts: data })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevState, this.state)
    if (prevState.searchValue !== this.state.searchValue) {
      const data = db
        .getContacts()
        .filter((contact) =>
         this.filterHandler(contact.name) || this.filterHandler(contact.phone) || this.filterHandler(contact.email)
        )
      this.setState({ contacts: data })
    }
  }

  filterHandler(e){
    return e.toUpperCase().includes(this.state.searchValue.toUpperCase());
  }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter((x) => x.id !== id)
    this.setState({ contacts: contactData })
  }

  handleSearch = (event) => {
    const contacts = contacts.filter((x) =>
      x.name.toUpperCase().includes(event.target.value.toUpperCase())
    )
    this.setState({
      searchValue: event.target.value,
      contacts,
    })
  }

  handleAddFormClose = () => {
    this.setState({ addForm: false })
  }

  handleEditFormClose = () => {
    this.setState({ editForm : false})
  }

  handleRemoveContact = (id) => {
    // console.log('id',id);
    const newContacts = db.removeContact(id)
    this.setState({
      contacts: [...newContacts]
    });
  }

  hendleShowAddForm = () => {
    this.setState({ addForm: true })
  }

  handleShowEditForm = (id) => {
    this.setState({ editForm: true, currentId: id  })
  }

  handleAddContact = (contact) => {
    this.setState({ contacts: [...this.state.contacts, contact] })
  }

  handleEditContact = (contact) => {
    const updatedContact = this.state.contacts.filter((x) => x.id !== contact.id)
    this.setState({contacts: [...updatedContact, contact]})
  }

  onSearch = (e) => {
    console.log('searchValue', e)
    this.setState({ searchValue: e.target.value })
  }

  render() {
    if(this.state.addForm){
      return(
      <>
      <Header />
        <Search
          searchValue={this.state.searchValue}
          showAddForm={this.hendleShowAddForm}
          handleSearch={this.onSearch}
        />
         <AddContact 
          close={this.handleAddFormClose} 
          handleAddContact = {this.handleAddContact}/>
      </>
      )
    }
    else if(this.state.editForm)
    {
      return(
      <>
      <Header />
        <Search
          searchValue={this.state.searchValue}
          handleSearch={this.handleSearch}
          showAddForm={this.hendleShowAddForm}
        />
        <EditContact
         close={this.handleEditFormClose}
         handleEditContact={this.handleEditContact}
         currentId = {this.state.currentId}/>
      </>
      )
    }
    else{
      return (
      <>
        <Header />
        <Search
          searchValue={this.state.searchValue}
          showAddForm={this.hendleShowAddForm}
          handleSearch={this.onSearch}
        />
        <ContactList
            contacts={this.state.contacts}
            handleRemoveContact={this.handleRemoveContact}
            handleShowEditForm = {this.handleShowEditForm}
        />
      </>
    )
  }
  }
}

export default App
