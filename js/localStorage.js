var CONTACTS_PERSISTENCE_KEY = 'contacts-storage';
var nextId = 1000;
var contacts = getContacts();
var contactsVisible = false;

$(document).ready(function() {
  if (contacts.length > 0) {
    updateContactTable();
    resetForm();
    togglePageVisibility();
  }
});

$("#cancel").click(function() {
  togglePageVisibility();
});

$("#addNewItem").click(function() {
  togglePageVisibility();
});

$('#addContact').submit(function(e) {
  e.preventDefault();
  
  var newContact = createNewContact();
  contacts.push(newContact);
  saveContacts();
  updateContactTable();
  resetForm();
  togglePageVisibility();
  
});

$('#contact-tbody').on('click', '.edit', editContactInTable);
$('#contact-tbody').on('click', '.delete', deleteContactInTable);

function createNewContact() {
  return { id: (nextId++).toString(),
           name: $('#name').val(),
           phone: $('#phone').val()
         };
}

function resetForm() {
  $('#name').val("");
  $('#phone').val("");
}

function updateContactTable() {
  for (var i=0; i<contacts.length; i++) {
    console.log(contacts[i].name);
    console.log(contacts[i].phone);
  }
  var tbody = $("#contact-tbody");
  tbody.empty();
  contacts.forEach(function(contact) {
    var contactRow = createTableRow(contact);
    tbody.append(contactRow);
  });
}

function createTableRow(contact) {
  var tableRow = $('<tr data-id="' + contact.id + '">');
  var contactName = $('<td>').text(contact.name);
  tableRow.append(contactName);
  var contactPhone = $('<td>').text(contact.phone);
  tableRow.append(contactPhone);
  var td = $('<td>');
  var button = $('<td>').text
  var button = $('<button type="button" class="edit">');
  button.text("Edit");
  td.append(button);
  tableRow.append(td);
  td = $('<td>');
  button = $('<button type="button" class="delete">');
  button.text("Delete");
  td.append(button);
  tableRow.append(td);
  return tableRow;
}

function togglePageVisibility() {
  if (contactsVisible) {
    // hide contacts, show form
    $("#contactEntry").removeClass('hide');
    $("#contacts").addClass('hide');
  }
  else {
    // show contacts, hide form
    $("#contacts").removeClass('hide');
    $("#contactEntry").addClass('hide');
  }
  contactsVisible = !contactsVisible;
}

function editContactInTable(e) {
  var ix = getContactIndex(e);
  if (ix >= 0) {
    editContact(contacts[ix]);
    updateContactTable();
  }
}

function editContact(contact) {
  if (contact) {
    $('#name').val(contact.name);
    $('#phone').val(contact.phone);
    togglePageVisibility();
  }
}

function getContactIndex(e) {
  var btn = e.target;
  var tr = $(btn).closest( 'tr' );
  var id = tr.attr( 'data-id' );
  var i, len;

  for ( i = 0, len = contacts.length; i < len; ++i ) {
    if ( contacts[ i ].id === id ) {
      return i;
    }
  }
  return -1;
}

function deleteContactInTable() {
  
}

function deleteContact() {
  
}

function getContacts() {
  var c = localStorage[CONTACTS_PERSISTENCE_KEY];
  if (c) {
    return JSON.parse(c);
  }
  else {
    return [];
  }
}

function saveContacts() {
  localStorage[CONTACTS_PERSISTENCE_KEY] = JSON.stringify(contacts);
}