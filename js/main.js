var fName = document.getElementById("fName");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var fileImage = document.getElementById("fileImage");
var rowData = document.getElementById("rowData");
var totalNum = document.getElementById("totalNum");
var contactEmptyState = document.getElementById("contactEmptyState");
var mainBtn = document.getElementById("addBtn");
var contactCount = document.getElementById("contactCount");
var favNum = document.getElementById("favNum");
var favRow = document.getElementById("favs");
var favEmptyState = document.getElementById("favEmptyState");
var emergNum = document.getElementById("emergNum");
var emergRow = document.getElementById("emergRow");
var emergEmptyState = document.getElementById("emergEmptyState");
var favCheckBox = document.getElementById("favCheckBox");
var emergCheckBox = document.getElementById("emergCheckBox");
var contactList = [];

mainBtn.addEventListener("click", function () {
  if (zzz !== undefined) {
    updateContact();
  } else {
    addContact();
  }
});

if (localStorage.getItem("ContactContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("ContactContainer"));
  displayContact();
}

function addContact() {
  if (
    validation(fName, "msgName") &&
    validation(phone, "msgPhone") &&
    validation(email, "msgEmail")
  ) {
    var user = {
      isFavorite: favCheckBox.checked,
      isEmergency: emergCheckBox.checked,
      name: fName.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      image:
        fileImage.files[0] !== undefined
          ? `./imgs/${fileImage.files[0]?.name}`
          : null,
    };
    var duplicateUser = isPhoneExist(phone.value);
    if (duplicateUser) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${duplicateUser.name}`,
      });
      return;
    }
    contactList.push(user);
    localStorage.setItem("ContactContainer", JSON.stringify(contactList));

    clearInputs();
    displayContact();

    Swal.fire({
      title: "Added!",
      text: "Contacts has been added successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });

    var modalElement = document.getElementById("exampleModal");
    var contactModal = bootstrap.Modal.getInstance(modalElement);
    contactModal.hide();
  } else if (fName.value.trim() == "") {
    Swal.fire({
      title: "Missing Name",
      text: "Please enter a name for the contact!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (validation(fName, "msgName") == false) {
    Swal.fire({
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (phone.value.trim() == "") {
    Swal.fire({
      title: "Missing Phone",
      text: "Please enter a phone number!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (validation(phone, "msgPhone") == false) {
    Swal.fire({
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (email.value.trim() == "") {
    var user = {
      isFavorite: favCheckBox.checked,
      isEmergency: emergCheckBox.checked,
      name: fName.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      image:
        fileImage.files[0] !== undefined
          ? `./imgs/${fileImage.files[0]?.name}`
          : null,
    };
    var duplicateUser = isPhoneExist(phone.value);
    if (duplicateUser) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${duplicateUser.name}`,
      });
      return;
    }
    contactList.push(user);
    localStorage.setItem("ContactContainer", JSON.stringify(contactList));

    clearInputs();
    displayContact();

    Swal.fire({
      title: "Added!",
      text: "Contacts has been added successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });

    var modalElement = document.getElementById("exampleModal");
    var contactModal = bootstrap.Modal.getInstance(modalElement);
    contactModal.hide();
  } else if (validation(email, "msgEmail") == false) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function clearInputs() {
  fName.value = "";
  phone.value = "";
  email.value = "";
  address.value = "";
  group.value = "";
  notes.value = "";
  fileImage.value = "";
  favCheckBox.checked = false;
  emergCheckBox.checked = false;
}
function displayContact() {
  var text = search.value;
  var searchCount = 0;
  var favCount = 0;
  var emergCount = 0;
  var cartona = "";
  var favDiv = "";
  var emergDiv = "";
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite) {
      favCount++;
    }
    if (contactList[i].isEmergency) {
      emergCount++;
    }
    if (
      contactList[i].name.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].phone.includes(text) ||
      contactList[i].email.toLowerCase().includes(text.toLowerCase())
    ) {
      searchCount++;
      var starClass = contactList[i].isFavorite ? "" : "d-none";
      var btnStar = contactList[i].isFavorite ? "" : "d-none";
      var btnStar2 = contactList[i].isFavorite ? "d-none" : "";
      var heartClass = contactList[i].isEmergency ? "" : "d-none";
      var btnHeart = contactList[i].isEmergency ? "" : "d-none";
      var btnHeart2 = contactList[i].isEmergency ? "d-none" : "";
      var emailIcon = contactList[i].email ? "" : "d-none";
      var addressIcon = contactList[i].address ? "" : "d-none";
      var avatarContent = "";
      if (contactList[i].image) {
        avatarContent = `<img src="${contactList[i].image}" class="img-div" alt="user photo" />`;
      } else {
        avatarContent = `${getInitials(contactList[i].name)}`;
      }
      cartona += `<div class="col-12 col-md-6">
            <div class="main-new-contacts">
              <div class="new-contacts">
                <div class="contact-shape">
                  ${avatarContent}
                  <div class="icon-circle icon-star-circle ${starClass}">
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <div class="icon-circle icon-heart-circle ${heartClass}">
                    <i class="fa-solid fa-heart-pulse"></i>
                  </div>
                </div>
                <div class="user-info">
                  <h3>${contactList[i].name}</h3>
                  <div
                    class="d-flex align-items-center"
                    style="gap: 0.5rem; margin-top: 0.25rem"
                  >
                    <div><i class="fa-solid fa-phone"></i></div>
                    <span>${contactList[i].phone}</span>
                  </div>
                </div>
              </div>
              <div class="about-user">
                <span class="envelope-icon ${emailIcon}"
                  ><i class="fa-solid fa-envelope"></i
                ></span>
                <span>${contactList[i].email}</span>
              </div>
              <div class="about-user m-0">
                <span class="location-icon ${addressIcon}"
                  ><i class="fa-solid fa-location-dot"></i
                ></span>
                <span>${contactList[i].address}</span>
              </div>
              <div class="badges" style="margin-top: 0.75rem">
                <span class="badge family">${contactList[i].group}</span>
                <span class="badge ${heartClass}"
                  ><i class="fa-solid fa-heart-pulse"></i> Emergency</span
                >
              </div>
              <div
                class="d-flex justify-content-between"
                style="padding: 0.625rem 1rem"
              >
                <div class="links-icon">
                  <a href="tel:${contactList[i].phone}" title="Call"
                    ><span class="phone-icon"
                      ><i class="fa-solid fa-phone"></i></span
                  ></a>
                  <a href="mailto:${contactList[i].email}" title="Email"
                    ><span class="email-icon"
                      ><i class="fa-solid fa-envelope"></i></span
                  ></a>
                </div>
                <div class="the-other-links">
                  <button onclick="addFavourite(${i})" class="btn-star ${btnStar}" title="Favorite">
                    <i class="fa-solid fa-star"></i>
                  </button>
                  <button onclick="addFavourite(${i})" class="btn-star2 ${btnStar2}" title="Favorite">
                    <i class="fa-regular fa-star"></i>
                  </button>
                  <button onclick="addEmergency(${i})" class="btn-heart ${btnHeart}" title="Emergency">
                    <i class="fa-solid fa-heart-pulse"></i>
                  </button>
                  <button onclick="addEmergency(${i})" class="btn-heart2 ${btnHeart2}" title="Emergency">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setUpdate(${i})" class="btn-pen" title="Edit">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button onclick="deleteContact(${i})" class="btn-trash" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
  for (var z = 0; z < contactList.length; z++) {
    var avatarContent = "";
    if (contactList[z].image) {
      avatarContent = `<img src="${contactList[z].image}" class="img-div" alt="user photo" />`;
    } else {
      avatarContent = `${getInitials(contactList[z].name)}`;
    }
    if (contactList[z].isFavorite) {
      favDiv += `<a  class="col-12 col-md-6" href="tel:${contactList[z].phone}">
                    <div class="favorite-item">
                      <div class="d-flex align-items-center gap-1">
                        <div class="favorite-icon">${avatarContent}</div>
                        <div class="favorite-text">
                          <h4>${contactList[z].name}</h4>
                          <p>${contactList[z].phone}</p>
                        </div>
                      </div>
                      <div class="favorite-text-icon">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
                </a>`;
    }
  }
  for (var x = 0; x < contactList.length; x++) {
    var avatarContent = "";
    if (contactList[x].image) {
      avatarContent = `<img src="${contactList[x].image}" class="img-div" alt="user photo" />`;
    } else {
      avatarContent = `${getInitials(contactList[x].name)}`;
    }
    if (contactList[x].isEmergency) {
      emergDiv += `<a  class="col-12 col-md-6" href="tel:${contactList[x].phone}">
                    <div class="favorite-item favorite-item2">
                      <div class="d-flex align-items-center gap-1">
                        <div class="favorite-icon">${avatarContent}</div>
                        <div class="favorite-text">
                          <h4>${contactList[x].name}</h4>
                          <p>${contactList[x].phone}</p>
                        </div>
                      </div>
                      <div class="favorite-text-icon favorite-text-icon2">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
              </a>`;
    }
  }
  favRow.innerHTML = favDiv;
  emergRow.innerHTML = emergDiv;
  rowData.innerHTML = cartona;
  totalNum.innerHTML = contactList.length;
  contactCount.innerHTML = `Manage and organize your ${contactList.length} contacts`;
  favNum.innerHTML = favCount;
  emergNum.innerHTML = emergCount;

  if (contactList.length > 0) {
    contactEmptyState.classList.add("d-none");
  } else {
    contactEmptyState.classList.remove("d-none");
  }

  if (favDiv !== "") {
    favEmptyState.classList.add("d-none");
  } else {
    favEmptyState.classList.remove("d-none");
  }

  if (emergDiv !== "") {
    emergEmptyState.classList.add("d-none");
  } else {
    emergEmptyState.classList.remove("d-none");
  }

  if (contactList.length > 0 && searchCount == 0 && text != "")
    contactEmptyState.classList.remove("d-none");
}

function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
  }).then(function (result) {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("ContactContainer", JSON.stringify(contactList));
      displayContact();
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

var zzz;
function setUpdate(term) {
  zzz = term;
  fName.value = contactList[term].name;
  phone.value = contactList[term].phone;
  email.value = contactList[term].email;
  address.value = contactList[term].address;
  group.value = contactList[term].group;
  favCheckBox.checked = contactList[term].isFavorite;
  emergCheckBox.checked = contactList[term].isEmergency;
}

function updateContact() {
  if (
    validation(fName, "msgName") &&
    validation(phone, "msgPhone") &&
    validation(email, "msgEmail")
  ) {
    var updatedImage =
      fileImage.files[0] !== undefined
        ? `./imgs/${fileImage.files[0]?.name}`
        : contactList[zzz].image;
    var user = {
      isFavorite: favCheckBox.checked,
      isEmergency: emergCheckBox.checked,
      name: fName.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      image: updatedImage,
    };
    var duplicateUser = isPhoneExist(phone.value);
    if (duplicateUser) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${duplicateUser.name}`,
      });
      return;
    }
    contactList.splice(zzz, 1, user);
    localStorage.setItem("ContactContainer", JSON.stringify(contactList));

    clearInputs();
    displayContact();

    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });

    var modalElement = document.getElementById("exampleModal");
    var contactModal = bootstrap.Modal.getInstance(modalElement);
    contactModal.hide();
    zzz = undefined;
  } else if (fName.value.trim() == "") {
    Swal.fire({
      title: "Missing Name",
      text: "Please enter a name for the contact!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (validation(fName, "msgName") == false) {
    Swal.fire({
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (phone.value.trim() == "") {
    Swal.fire({
      title: "Missing Phone",
      text: "Please enter a phone number!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (validation(phone, "msgPhone") == false) {
    Swal.fire({
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else if (email.value.trim() == "") {
    var user = {
      isFavorite: true,
      isEmergency: true,
      name: fName.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      group: group.value,
      notes: notes.value,
      image: updatedImage,
    };
    contactList.splice(zzz, 1, user);
    localStorage.setItem("ContactContainer", JSON.stringify(contactList));
    clearInputs();
    displayContact();

    Swal.fire({
      title: "Added!",
      text: "Contacts has been added successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });

    var modalElement = document.getElementById("exampleModal");
    var contactModal = bootstrap.Modal.getInstance(modalElement);
    contactModal.hide();
    zzz = undefined;
  } else if (validation(email, "msgEmail") == false) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function getInitials(name) {
  var words = name.split(" ");
  return (words[0][0] + (words[1] ? words[1][0] : "")).toUpperCase();
}

function addFavourite(num) {
  contactList[num].isFavorite = !contactList[num].isFavorite;
  localStorage.setItem("ContactContainer", JSON.stringify(contactList));
  displayContact();
}

function addEmergency(emergIndex) {
  contactList[emergIndex].isEmergency = !contactList[emergIndex].isEmergency;
  localStorage.setItem("ContactContainer", JSON.stringify(contactList));
  displayContact();
}

function validation(element, msgId) {
  var input = element.value;
  var regex = {
    fName: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    phone: /^(?:\+20|0)?1[0125]\d{8}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  var msgId = document.getElementById(msgId);

  if (element.id == "email" && input.trim() == "") {
    msgId.classList.add("d-none");
    element.classList.remove("border");
    element.classList.remove("border-danger");
    return true;
  }

  if (regex[element.id].test(input)) {
    msgId.classList.add("d-none");
    element.classList.remove("border");
    element.classList.remove("border-danger");
    return true;
  } else {
    element.classList.add("border");
    element.classList.add("border-danger");
    msgId.classList.remove("d-none");
    return false;
  }
}

function isPhoneExist(phoneNumber) {
  return contactList.find(function (contact, index) {
    if (zzz !== undefined && index === zzz) {
      return false;
    }
    return contact.phone.trim() === phoneNumber.trim();
  });
}