var contacts = [];
var contactsVisible = false;

$("#cancel").click(function() {
  togglePageVisibility();
});

$("#addNewItem").click(function() {
  togglePageVisibility();
});

$('#addContact').submit(function(e) {
  e.preventDefault();
  
  var newContact = getContact();
  contacts.push(newContact);
  updateContactTable();
  resetForm();
  togglePageVisibility();
  
});

function getContact() {
  return { name: $('#name').val(),
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
  var tableRow = $('<tr>');
  var contactName = $('<td>').text(contact.name);
  tableRow.append(contactName);
  var contactPhone = $('<td>').text(contact.phone);
  tableRow.append(contactPhone);
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
