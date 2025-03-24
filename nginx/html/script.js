const url = "http://localhost:3000";

async function populateAllPeopleList() {
  const people = await getAllPeople();
  populatePeopleList(people);
}

async function getAllPeople() {
  return (await fetch(`${url}/people`)).json();
}

function populatePeopleList(people) {
  const peopleListComponent = document.getElementById("people");

  people?.forEach((person) => {
    const listItem = document.createElement("li");
    listItem.textContent = person.name;
    peopleListComponent.appendChild(listItem);
  });
}

function createPersonAndGetPeopleOnPageLoad() {
  document.addEventListener(
    "DOMContentLoaded",
    postCreatePerson().then(getPeopleAfterCreatingPerson)
  );
}

async function postCreatePerson() {
  return fetch(`${url}/person`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Erro:", error));
}

function getPeopleAfterCreatingPerson() {
  document.addEventListener("DOMContentLoaded", populateAllPeopleList());
}

createPersonAndGetPeopleOnPageLoad();
