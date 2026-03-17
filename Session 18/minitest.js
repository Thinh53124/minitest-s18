let contacts = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "tranthibinh@email.com",
  },
  {
    name: "Lê Văn Cường",
    phone: "0923456789",
    email: "levancuong@email.com",
  },
  {
    name: "Phạm Thị Dung",
    phone: "0934567890",
    email: "phamthidung@email.com",
  },
  {
    name: "Hoàng Văn Em",
    phone: "0945678901",
    email: "hoangvanem@email.com",
  },
];

function renderContacts() {
  let str = "";
  for (let i = 0; i < contacts.length; i++) {
    str += `<tr>
      <td>${i + 1}</td>
      <td>${contacts[i].name}</td>
      <td>${contacts[i].phone}</td>
      <td>${contacts[i].email}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-delete" onclick="deleteContact(${i})">Xóa</button>
        </div>
      </td>
    </tr>`;
  }
  document.getElementById("contact-tbody").innerHTML = str;
}

function addContact(e) {
  e.preventDefault();

  let name = document.getElementById("contact-name").value.trim();
  let phone = document.getElementById("contact-phone").value.trim();
  let email = document.getElementById("contact-email").value.trim();

  if (!validateContact(name, phone, email)) return;

  contacts.push({ name, phone, email });

  renderContacts();
  document.getElementById("contact-form").reset();
}

function deleteContact(index) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

function validateContact(name, phone, email) {
  if (!name) return false;

  let phoneRegex = /^(0|\+84)[0-9]{9}$/;
  if (!phoneRegex.test(phone)) return false;

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  if (contacts.some(c => c.email === email)) return false;

  return true;
}

document.getElementById("contact-form").onsubmit = addContact;

renderContacts();