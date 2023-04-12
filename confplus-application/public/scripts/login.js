document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#enter").addEventListener("click", async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const res = await fetch(
      `http://localhost:3000/api/login?username=${email}&password=${password}`
    );

    if (res.status === 404) {
      alert("Incorrect Email or Password");
    } else {
      const user = await res.json();

      sessionStorage.setItem("user", JSON.stringify(user));
      switch (user.role) {
        case "author":
          location.href = "submit.html";
          break;
        case "organizer":
          break;
        case "reviewer":
          break;
      }
    }
  });
});
