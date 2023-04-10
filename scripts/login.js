document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#enter").addEventListener("click", async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

   const res = await fetch(`http://localhost:3000/api/login?username=${username}&password=${password}`,{
    method: "GET"
   });
   if(res.status===404){
    alert(res.statusText);
   }else{
    alert(await res.json())
   }

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      switch (user.role) {
        case "author":
            location.href('paper.html');
          break;
        case "organizer":
          break;
        case "reviewer":
          break;
      }
    } else {
      alert("Incorrect Username or Password");
    }
  });
});
