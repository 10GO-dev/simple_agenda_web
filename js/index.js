const tabla = document.querySelector("#contact_list");
const btnGuardar = document.querySelector("#btnGuardar");
const url = "http://www.raydelto.org/agenda.php";

window.addEventListener("load", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((contacto) => {
        tabla.innerHTML += `
            <tr class="contactList-item">
            <td class="name">${contacto.nombre}</td>
            <td>${contacto.apellido}</td>
            <td>${contacto.telefono}</td>
          </tr>
            `;
      });
    });
});

function showContactForm() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector('section').style.filter = "blur(2px)";
  
}

function closeForm() {
    document.querySelector('section').style.filter = "blur(0px)";
  document.querySelector(".overlay").style.display = "none";
  nombre.value = "";
  apellido.value = "";
  telefono.value = "";
  document.querySelector('#filter').value = '';
}

function saveContact() {
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const telefono = document.querySelector("#telefono").value;
  const contacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
  };
  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(contacto),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tabla.innerHTML += `
            <tr class="contactList-item">
            <td class="name">${data.nombre}</td>
            <td>${data.apellido}</td>
            <td>${data.telefono}</td>
          </tr>
            `;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      closeForm();
      alert("Contacto guardado exitosamente");
    });
}

function filterContacts() {
  const filter = document.querySelector("#filter").value.toUpperCase();
  const tr = document.querySelectorAll(".contactList-item");
  tr.forEach((item) => {
    const td = item.querySelectorAll("td.name");
    td.forEach((td) => {
      const txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}

async function getContacts() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

setTimeout(()=> {
    const contactsList = document.querySelectorAll(".contactList-item");
    const newContacts = getContacts();
    newContacts.then((data) => {
        if(data.length > contactsList.length) {
            tabla.innerHTML = "";
            data.forEach((contact) => {
                tabla.innerHTML += `
                    <tr class="contactList-item">
                    <td class="name">${contact.nombre}</td>
                    <td>${contact.apellido}</td>
                    <td>${contact.telefono}</td>
                  </tr>
                    `;
            });
            alert("Nuevos contactos agregados");
        }
    })
    .catch((error) => console.log(error))
    .finally(() => {
        closeForm();
    });
}, 1000*60);

