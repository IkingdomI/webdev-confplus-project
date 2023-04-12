document.addEventListener("DOMContentLoaded", () => {
  const addAuthor = document.querySelector("#add-author");
  const removeAuthor = document.querySelector("#remove-author");
  const presenterSelect = document.querySelector("#presenter");

  const authorsDiv = document.querySelector("#authors");

  let countAuthors = 1;

  addAuthor.addEventListener("click", (event) => {
    event.preventDefault();
    countAuthors++;

    const newAuthor = `<div class="author" id=author-${countAuthors}>
       <h4>Author #${countAuthors}</h4>
       <label for="author-${countAuthors}-name">Name</label>
       <input type="text" name="author-${countAuthors}-name" id="author-${countAuthors}-name">
       <label for="author-${countAuthors}-email">Email</label>
       <input type="email" name="author-${countAuthors}-email" id="author-${countAuthors}-email">
       <label for="author-${countAuthors}-affilitation">Affiliation</label>
       <input type="text" name="author-${countAuthors}-affilitation" id="author-${countAuthors}-affilitation">
   </div>`;

    authorsDiv.innerHTML += newAuthor;

    updateSelect();
  });

  removeAuthor.addEventListener("click", (event) => {
    event.preventDefault();
    if (countAuthors > 1) {
      authorsDiv.removeChild(authorsDiv.lastChild);
      countAuthors--;
    }
    updateSelect();
  });

  const updateSelect=()=>{

    presenterSelect.innerHTML = `<option value="0">None</option>
    <option value="1">Author #1</option>`;
    for (let i = 0; i < countAuthors - 1; i++) {
        const authorNo = i+2;

        const newOption = document.createElement('option');
        newOption.value = authorNo;
        newOption.text = `Author #${authorNo}`

        presenterSelect.appendChild(newOption);
    }
  }
});
