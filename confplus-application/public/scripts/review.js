document.addEventListener('DOMContentLoaded',async ()=>{
    const reviewerName = document.querySelector("#reviewer-name");
  
  const id = sessionStorage.getItem("user-id");
  const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await userRes.json();

  reviewerName.textContent = `${user.first_name} ${user.last_name}`


    //THIS IS A DUMMY CODE COMMENT IT IF NEEDED
    const collapse = document.querySelector(".collapse");
    collapse.addEventListener('click',()=>{
        const abstract = document.querySelector(".abstract");
        abstract.classList.toggle('hide');
        collapse.classList.toggle('toggle-collapse')
    });
});