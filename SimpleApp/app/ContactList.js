import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { getDatabase, ref, push, remove, set, onChildAdded, off } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../Firebase/firebase';
import { router } from 'expo-router';

export default function ContactList() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editContactName, setEditContactName] = useState('');
  const [editContactNumber, setEditContactNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const database = getDatabase(app);
  const auth = getAuth();

  useEffect(() => {
    const contactsRef = ref(database, `users/${userId}/contacts`);
  
    onChildAdded(contactsRef, (snapshot) => {
      const contact = snapshot.val();
      setContacts((prevContacts) => {
        return [{ id: snapshot.key, ...contact }, ...prevContacts];
      });
    });
  
    return () => {
      off(contactsRef, 'child_added');
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleAddContact = () => {
    if (name.trim() === '' || contactNumber.trim() === '') {
      return;
    }

    const newContact = {
      name: name,
      contactNumber: contactNumber,
    };

    const newContactRef = push(ref(database, `users/${userId}/contacts`), newContact);

    setName('');
    setContactNumber('');
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleEditContact = () => {
    if (editContactName.trim() === '' || editContactNumber.trim() === '') {
      return;
    }
  
    const contactRef = ref(database, `users/${userId}/contacts/${editContactId}`);
    set(contactRef, { name: editContactName, contactNumber: editContactNumber })
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === editContactId
              ? { ...contact, name: editContactName, contactNumber: editContactNumber }
              : contact
          )
        );
  
        setEditContactId(null);
        setEditContactName('');
        setEditContactNumber('');
        setEditModalVisible(false); 
        setRefresh((prevRefresh) => !prevRefresh);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  };
  
  const handleDeleteContact = (contactId) => {
    setDeleteContactId(contactId);
    setDeleteConfirmationVisible(true);
    setModalVisible(false);
  };

  const confirmDelete = () => {
    if (deleteContactId !== null && deleteContactId !== undefined) {
      const contactRef = ref(database, `users/${userId}/contacts/${deleteContactId}`);
      remove(contactRef);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deleteContactId));
      setDeleteContactId(null);
    }
    setDeleteConfirmationVisible(false);
  };

  const cancelDelete = () => {
    setDeleteContactId(null);
    setDeleteConfirmationVisible(false);
  };
  
  const openReadOnlyModal = (contactId, contactName, contactNumber) => {
    setSelectedContact({ id: contactId, name: contactName, contactNumber });
    setEditContactId(contactId); 
    setEditContactName(contactName);
    setEditContactNumber(contactNumber);
    setModalVisible(true);
  };

  const openEditModal = (contactId, contactName, contactNumber) => {
    setEditContactId(contactId);
    setEditContactName(contactName);
    setEditContactNumber(contactNumber);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditContactId(null);
    setEditContactName('');
    setEditContactNumber('');
    setEditModalVisible(false);
  };

  const handleLogOut = () => {
    router.replace('/accInfo');
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.textTitle}>Add Contact</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
            />

            <TouchableOpacity onPress={handleAddContact} style={styles.addContact}>
              <Text style={styles.addContactText}>Add Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogOut} style={styles.addContact}>
              <Text style={styles.addContactText}>Account Info</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactListContainer}>
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              onPress={() => openReadOnlyModal(contact.id, contact.name, contact.contactNumber)} 
              style={styles.contactContainer}
            >
              <Text style={styles.contactName}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalInputText}>{selectedContact?.name}</Text>
            <Text style={styles.modalInputText}>{selectedContact?.contactNumber}</Text>

            <TouchableOpacity onPress={() => openEditModal(editContactId, editContactName, editContactNumber)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteContact(editContactId)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TextInput
              style={styles.modalInputEditText}
              value={editContactName}
              onChangeText={(text) => setEditContactName(text)}
              placeholder="Name"
            />
            <TextInput
              style={styles.modalInputEditText}
              value={editContactNumber}
              onChangeText={(text) => setEditContactNumber(text)}
              placeholder="Contact Number"
            />
            <TouchableOpacity onPress={handleEditContact} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeEditModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmationVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Are you sure you want to delete this contact?</Text>
            <TouchableOpacity onPress={confirmDelete} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelDelete} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30, 
  },

  inputContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 1, 
    borderColor: 'white',
    borderRadius: 25, 
    backgroundColor: 'white',
  },

  inputText: {
    borderWidth: 1,
    backgroundColor:"grey",
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },

  addContact: {
    backgroundColor: '#2a3d66',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 25,
  },

  textTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
    textTransform: 'uppercase'
  },

  modalInputEditText: {
    borderWidth: 1,
    width: '100%', 
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10, 
    backgroundColor: 'white',
  },

  modalText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 15
  },

  addContactText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  contactListContainer: {
    width: '80%',
    marginTop: 10,
    borderRadius: 25  
  },

  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: "black", 
    borderRadius: 25,
  },

  contactName: {
    flex: 1,
    paddingLeft: 20,
    padding: 10, 
  }, 

  deleteTask: {
    backgroundColor: 'red',
    height: 30,
    width: 50,
    marginLeft: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  deleteTaskText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 8, 
  },

  editTask: {
    backgroundColor: 'blue',
    height: 30,
    width: 50,  
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  editTaskText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 8,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalBox: {
    width: '80%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius:25,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  

  modalInputText: {
    width: '100%', 
    borderColor: '#ccc',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20
  },

  modalButton: {
    backgroundColor: '#2a3d66',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 25,
  },

  modalButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
 
});