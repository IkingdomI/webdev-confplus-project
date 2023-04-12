document.addEventListener("DOMContentLoaded", async () => {
  const addAuthor = document.querySelector("#add-author");
  const removeAuthor = document.querySelector("#remove-author");
  const presenterSelect = document.querySelector("#presenter");

  const authorsDiv = document.querySelector("#authors");

  let countAuthors = 1;

  const res = await fetch("http://localhost:3000/api/institutions");
    const institutions = await res.json();

  addAuthor.addEventListener("click", async (event) => {
    event.preventDefault();
    countAuthors++;

    const newAuthor = `<div class="author" id=author-${countAuthors}>
       <h4>Author #${countAuthors}</h4>
       <label for="author-${countAuthors}-fname">First Name</label>
       <input type="text" name="author-${countAuthors}-fname" id="author-${countAuthors}-fname">
       <label for="author-${countAuthors}-lname">Last Name</label>
       <input type="text" name="author-${countAuthors}-lname" id="author-${countAuthors}-lname">
       <label for="author-${countAuthors}-email">Email</label>
       <input type="email" name="author-${countAuthors}-email" id="author-${countAuthors}-email">
       <label for="author-${countAuthors}-affiliation">Affiliation</label>
       <select class="affiliation" name="author-${countAuthors}-affiliation" id="author-${countAuthors}-affiliation"></select>
       
       </div>`;
      //  <input type="text" name="author-${countAuthors}-affilitation" id="author-${countAuthors}-affilitation">

    authorsDiv.innerHTML += newAuthor;

    loadAffiliation(countAuthors);
    updatePresenter();
  });

  removeAuthor.addEventListener("click", (event) => {
    event.preventDefault();
    if (countAuthors > 1) {
      authorsDiv.removeChild(authorsDiv.lastChild);
      countAuthors--;
    }
    updatePresenter();
  });

  const updatePresenter = () => {
    presenterSelect.innerHTML = `<option value="0">None</option>
    <option value="1">Author #1</option>`;
    for (let i = 0; i < countAuthors - 1; i++) {
      const authorNo = i + 2;

      const newOption = document.createElement("option");
      newOption.value = authorNo;
      newOption.text = `Author #${authorNo}`;

      presenterSelect.appendChild(newOption);
    }
  };

  const loadAffiliation = (number) => {
    const affilitationSelect = document.querySelector(`#author-${number}-affiliation`);
    institutions.forEach((instit) => {
      const option = document.createElement("option");
      option.value = instit.value;
      option.text = instit.name;
      affilitationSelect.appendChild(option);
    });
  };
  
  loadAffiliation(1);
});
