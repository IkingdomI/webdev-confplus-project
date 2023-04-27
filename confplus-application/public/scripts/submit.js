document.addEventListener("DOMContentLoaded", async () => {
  const addAuthor = document.querySelector("#add-author-btn");
  const removeAuthor = document.querySelector("#remove-author-btn");
  const presenterSelect = document.querySelector("#presenter");

  const authorsDiv = document.querySelector("#authors-container");

  let countAuthors = 1;

  const res = await fetch("http://localhost:3000/api/institutions");
  const institutions = await res.json();


  const authorName = document.querySelector("#author-name");
  
  const id = sessionStorage.getItem("user-id");
  const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await userRes.json();

  authorName.textContent = `${user.first_name} ${user.last_name}` //UNCOMMENT ME LATER
  



  addAuthor.addEventListener("click", async (event) => {
    event.preventDefault();
    countAuthors++;

    const newAuthor = 
      //  <input type="text" name="author-${countAuthors}-affilitation" id="author-${countAuthors}-affilitation">
      `<div class="info-group" id="author-${countAuthors}">
              <h4>Author #${countAuthors}</h4>
              <label class="label-group" for="author-${countAuthors}-fname">First Name</label>
              <input
                type="text"
                name="author-${countAuthors}-fname"
                id="author-${countAuthors}-fname"
                placeholder="Enter First Name"
              />
              <label class="label-group" for="author-${countAuthors}-lname">Last Name</label>
              <input
                type="text"
                name="author-${countAuthors}-lname"
                id="author-${countAuthors}-lname"
                placeholder="Enter Last Name"
              />
              <label class="label-group" for="author-${countAuthors}-email">Email</label>
              <input
                type="email"
                name="author-${countAuthors}-email"
                id="author-${countAuthors}-email"
                placeholder="Example@gmail.com"
              />

              <div class="aff-selector-group">
                <label class="label-group" for="author-${countAuthors}-affilitation"
                  >Affiliation</label
                >
                <select
                  class="aff-selector"
                  name="author-${countAuthors}-affiliation"
                  id="author-${countAuthors}-affiliation"
                >


                </select>
              </div>
            </div>`;
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
    presenterSelect.innerHTML = `
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


//Submiting the form: 



  document.querySelector("#submit-form").addEventListener("submit", async (event)=>{
    event.preventDefault();
    const formData = new FormData(document.querySelector("#submit-form"));
    const body = {};
    for(const[key, value] of formData){
        body[key] = value;
    }

    console.log(body);
    console.log(body.title);
    console.log(body.abstract);
    console.log(window['author-1-fname'].value);


    body.authors = [];
    console.log(body.authors);


    // const file = body.file;

    // function readFile(input){
    //   const fr = new FileReader();

    //   fr.readAsDataURL(input);
    //   fr.addEventListener("load", () =>{
    //     const urlRes = fr.result;
    //     console.log(urlRes);
    //     return urlRes;
    //   })
      
    // }

    // const pdfURL = readFile(file);
    // body.url = pdfURL;

    // console.log(pdfURL);

    // for(let child of authorsDiv.children){
      // body.authors.push(
      //   {
      //     fname: 
      //   }
      // )
      // console.log(child);
    // }
    for(let i =1;i<=countAuthors;i++){
      body.authors.push(
        {
          fname: window[`author-${i}-fname`].value,
          lname: window[`author-${i}-lname`].value,
          email: window[`author-${i}-email`].value,
          affiliation: window[`author-${i}-affiliation`].value

        }
      )
    }
    console.log(body.authors);
    console.log(countAuthors);

    //get the list of reviewrs
    const res2 = await fetch(`http://localhost:3000/api/users`, {
      method: "GET"
    });
    const usersResponse = await res2.json();

    let reviewers = [];
    let reviewersCount = 0;
    for(const user of usersResponse){
      if (user.role==="reviewer"){
        reviewers.push(user);
        reviewersCount++;
      }
    }

    console.log(reviewers);
    function getRandomReviewr(){
      const rand = Math.floor(Math.random()*reviewers.length);
      let reviewer = reviewers[rand];
      reviewers.splice(rand, 1);
      return reviewer.id;
    }





    const res = await fetch(`http://localhost:3000/api/papers`, {
        method: "POST",
        body: JSON.stringify({
            title: body.title,
            authors: body.authors,
            // url: body.url,
            abstract: body.abstract,
            presenter: body.presenter - 1,
            reviewer1: {
              id:getRandomReviewr(),
              evaluation: null,
              contribution: null,
              strenth: null,
              weakness: null
            },
            reviewer2: {
              id:getRandomReviewr(),
              evaluation: null,
              contribution: null,
              strenth: null,
              weakness: null
            },
            rating: null
        })
    });
    const response = await res.json();


    



})
});







    