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

function loadFromHTML() {
  let rows = document.querySelectorAll("#contact-tbody tr");
  rows.forEach(row => {
    let tds = row.querySelectorAll("td");
    contacts.push({
      name: tds[1].innerText,
      phone: tds[2].innerText,
      email: tds[3].innerText
    });
  });
}

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
          <button onclick="deleteContact(${i})">Xóa</button>
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

  alert("Thêm liên hệ thành công!");

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
  if (!name) {
    alert("Họ tên không được để trống!");
    return false;
  }

  if (name.length < 2) {
    alert("Họ tên phải có ít nhất 2 ký tự!");
    return false;
  }

  let nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Họ tên không được chứa số hoặc ký tự đặc biệt!");
    return false;
  }

  if (!phone) {
    alert("Số điện thoại không được để trống!");
    return false;
  }

  let phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)");
    return false;
  }

  if (!email) {
    alert("Email không được để trống!");
    return false;
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ!");
    return false;
  }

  if (contacts.some(c => c.email.toLowerCase() === email.toLowerCase())) {
    alert("Email đã tồn tại trong danh bạ!");
    return false;
  }

  return true;
}

document.getElementById("contact-form").onsubmit = addContact;

loadFromHTML();
renderContacts();
