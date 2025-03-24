const url = "http://localhost:3000";

createPersonAndGetPeopleOnPageLoad();

function createPersonAndGetPeopleOnPageLoad() {
  document.addEventListener("DOMContentLoaded", async () => {
    await postCreatePerson();
    await populateAllPeopleList();
  });
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

async function populateAllPeopleList() {
  const people = await getAllPeople();
  populatePeopleList(people);
}

async function getAllPeople() {
  return (await fetch(`${url}/people`)).json();
}

function populatePeopleList(people) {
  const peopleListComponent = document.getElementById("people");

  people?.forEach((person) => addPersonListItem(person, peopleListComponent));
    
}

function addPersonListItem(person, peopleListComponent){
  const listItem = document.createElement("li");
  listItem.textContent = person.name;
  peopleListComponent.appendChild(listItem);
};