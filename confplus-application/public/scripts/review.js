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

    
    
});