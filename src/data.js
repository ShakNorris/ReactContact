
// const contactData = [
//     {
//       id: 1,
//       name: 'Zaza Beridze',
//       phone: '111111111',
//       email: 'zaza@gmail.com'
//     },
//     {
//       id: 2,
//       name: 'Eka maisuradze',
//       phone: '222222222',
//       email: 'eka@gmail.com'
//     },
//     {
//       id: 3,
//       name: 'Nino Baratashvili',
//       phone: '333333333',
//       email: 'nino@gmail.com'
//     }
//   ]

  export function getContacts(){
     const contacts = JSON.parse(localStorage.getItem('contacts')) || []
     return contacts
  }

  export function getContact(id){
    return getContacts.filter( x=> {
      return x.id === id;
    })
  }

  export function addContact(contact){
      const contacts = getContacts()
      const contactArray = [...contacts, contact]
      localStorage.setItem('contacts', JSON.stringify(contactArray))
  }
  
  export function removeContact(id){
    const contacts = getContacts();
    const newContactArray = contacts.filter(x => {
      return x.id !== id;
    });
    localStorage.setItem('contacts', JSON.stringify(newContactArray))
    return newContactArray;
  }

  export function editContact(contact){
    const contacts = getContacts()
    contacts.filter((x) => x.id === contact.id)[0].name = contact.name;
    contacts.filter((x) => x.id === contact.id)[0].phone = contact.phone;
    contacts.filter((x) => x.id === contact.id)[0].email = contact.email;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
