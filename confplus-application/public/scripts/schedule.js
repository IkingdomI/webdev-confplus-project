document.addEventListener('DOMContentLoaded',async ()=>{
    const organizerName = document.querySelector("#organizer-name");
  
    const id = sessionStorage.getItem("user-id");
    const userRes = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await userRes.json();
  
    organizerName.textContent = `${user.first_name} ${user.last_name}`

  
  
    const locRes = await fetch("http://localhost:3000/api/locations");
    const locations = await locRes.json();
    const locSelect = document.querySelector('#location');

    locations.forEach(loc=>{
        const option = document.createElement('option');
        option.value = loc.value;
        option.text = loc.name;
        locSelect.appendChild(option)
    })

    const dateRes = await fetch("http://localhost:3000/api/conference-dates");
    const dates = await dateRes.json();
    const dateSelect = document.querySelector('#date');

    dates.forEach(date=>{
        const option = document.createElement('option');
        option.value = date.date;
        option.text = date.date;
        dateSelect.appendChild(option)
    })
});