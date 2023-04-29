document.addEventListener('DOMContentLoaded',async ()=>{
    const reviewerName = document.querySelector("#reviewer-name");
  
  const id = sessionStorage.getItem("user-id");
  const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await userRes.json();

  reviewerName.textContent = `${user.first_name} ${user.last_name}`;
  const papersDiv = document.querySelector("#papers");
  let countPapers = 0;
  


  //listing the assigned papers for the reviewer

  const res = await fetch("http://localhost:3000/api/papers");

  const papers = await res.json();

  let assignedPapers = papers.filter((p) => (Number(p.reviewer1.id)===Number(id))||(Number(p.reviewer2.id)===Number(id)));
  console.log(papers);
  console.log("==============");
  console.log(assignedPapers);
  console.log(id);
  console.log((papers[3].reviewer1.id)===Number(id));

  // countPapers = assignedPapers.length;

  for(let p of assignedPapers){
    countPapers++
    if(p.reviewer1.id===Number(id)){
      console.log(`${p.title} reviewer is reviewer1`);
    }
    else if(p.reviewer2.id===Number(id)){
      console.log(`${p.title} reviewer is reviewer2`);
    }
    const newPaper = 
  // `<label class="paper">
  //   <input type="radio" name="paper" id="paper-${countPapers}" checked="checked" />
  //   <div class="paper-details">
  //     <h5 class="title">Paper ${countPapers}</h5>
  //     <h6 class="authors" id="authors${countPapers}"></h6>
  //     <p class="abstract">${p.abstract}</p>
  //     <div class="collapse">collapse</div>
  //     <a href="">Download pdf</a>
  //   </div>
  // </label>`;
  `<label class="paper">
  <input type="radio" name="radio" id="radio-${countPapers}" checked />
  
  <span class="radio-btn"><i class="las la-check"></i>
    <div class="paper-content">
    <div class="paper-headline">
      <h5 class="title">${p.title}</h5>
      <h6 class="authors" id="authors${countPapers}"></h6>
    </div>
    <p class="abstract">${p.abstract}</p>
    </div>
      <div class="interaction">
    <div class="collapse">collapse</div>
    <a class="download-btn" href=""><i class="fa fa-download"></i> Download</a>

  </div>
  </span>
  
</label>`
    

    papersDiv.innerHTML+=newPaper;

    let authorsHeader = document.querySelector(`#authors${countPapers}`);
    console.log(authorsHeader);
    let authorNames = [];
    
    
    for(let author of p.authors){
      
      authorNames.push(`${author.fname} ${author.lname} `);
      console.log(authorNames);
      authorsHeader.innerText = authorNames.join(",");
    }
  }

    //THIS IS A DUMMY CODE COMMENT IT IF NEEDED
    const collapse = document.querySelectorAll(".collapse");
    for(let col of collapse){
      console.log(col.parentElement.parentElement.children[1].children[1]);
      // console.log(col.parentElement.children[2]);
      col.addEventListener('click',()=>{
        const abstract = col.parentElement.parentElement.children[1].children[1];
        abstract.classList.toggle('hide');
        col.classList.toggle('toggle-collapse');
      });
    }
    const reviewForm = document.querySelector("#reviewForm");
    reviewForm.hidden = true;
    let selectedPaper = null;

    //selecting the paper for which we will submit the review:
    const papersToReview = document.querySelectorAll(".paper");
        for(let p of papersToReview){
          if(p.children[0].checked){
            selectedPaper = p;
            console.log(p.children[0]);
            //prints the title of the selected page:
            const pageTitle = selectedPaper.children[1].children[1].children[0].children[0].innerText;
            console.log(pageTitle);
            console.log(`HI I AM ${pageTitle}`);

            

            
          }
         const radioInput = p.children[0];
         radioInput.addEventListener("change", ()=>{
          reviewForm.reset();
          if(p.children[0].checked){
            selectedPaper = p;
          }
          
          if(!reviewForm.hidden){
            console.log("it should now hide if it's visible")
            reviewForm.hidden = true;
          }
         });

       

        }

//HERE THE SUBMIT REVIEW SHOULD BE HANDLED
        reviewForm.addEventListener("submit", async (event)=>{
          event.preventDefault();
          console.log(selectedPaper);
          console.log(`HI HELLO IAM HERE UNDER SUBMIT FORM AND THIS IS ${selectedPaper.children[1].children[1].children[0].children[0].innerText}`);

          let paperRes = await fetch(`http://localhost:3000/api/papers/${selectedPaper.children[1].children[1].children[0].children[0].innerText}`, {
          method: "GET"
          });

          let thisPaper = await paperRes.json();
          console.log(thisPaper);

          let isReviewer1 = false;
          let isReviewer2 = false;
          console.log(thisPaper[0].reviewer2.id===Number(id));

          if(thisPaper[0].reviewer1.id===Number(id)){
            console.log(`reviewer1 is the reviewer with id: ${id}`);
            isReviewer1 = true;
          }
          else if(thisPaper[0].reviewer2.id===Number(id)){
            console.log(`reviewer2 is the reviewer with id: ${id}`);
            isReviewer2 = true;
          }


          const formData = new FormData(document.querySelector("#reviewForm"));
          const body = {};

          if(isReviewer1){
              for(const[key, value] of formData){
                  body[key] = value;
              }
    
              console.log(body);

              const reviewer1Object = {
                  id: Number(id),
                 evaluation: body.evaluation,
                  contribution: body.contribution,
                  strength: window[`paper-strengths`].value,
                  weakness: window[`paper-weakness`].value
              };

              console.log(reviewer1Object);
              let rate = ((Number(thisPaper[0].reviewer2.evaluation) + Number(reviewer1Object.evaluation))/2);
              console.log(rate);
    
              const res = await fetch(`http://localhost:3000/api/papers/${selectedPaper.children[1].children[1].children[0].children[0].innerText}`, {
                  method: "PUT",
                  body: JSON.stringify({
                      reviewer1: reviewer1Object,
                      rating: rate
                  })
              });
              const response = await res.json();
          }
          else if(isReviewer2){
            for(const[key, value] of formData){
              body[key] = value;
            }

          console.log(body);

          const reviewer2Object = {
            id: Number(id),
            evaluation: body.evaluation,
             contribution: body.contribution,
             strength: window[`paper-strengths`].value,
             weakness: window[`paper-weakness`].value
         };

         console.log(reviewer2Object);

         let rate = null
         if (thisPaper[0].reviewer1.evaluation !== null && reviewer2Object.evaluation !== null)
          rate = ((Number(thisPaper[0].reviewer1.evaluation) + Number(reviewer2Object.evaluation)));
        
         console.log(Number(thisPaper[0].reviewer1.evaluation));
         console.log(rate);

          const res = await fetch(`http://localhost:3000/api/papers/${selectedPaper.children[1].children[1].children[0].children[0].innerText}`, {
              method: "PUT",
              body: JSON.stringify({
                  reviewer2: reviewer2Object,
                  rating: rate
              })
          });
          const response = await res.json();
          }

         })



    const selectPaper = document.querySelector(".submit");
    selectPaper.addEventListener("click", async(e) =>{ 
        e.preventDefault();
        reviewForm.hidden = false;
        
        
    })

    
    
});