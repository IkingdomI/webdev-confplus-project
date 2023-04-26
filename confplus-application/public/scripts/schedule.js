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

	async function loadSchedule()
	{
		const schedRes = await fetch("/api/sessions");
		const schedule = await schedRes.json();
		const papers = await (await fetch("/api/papers")).json();

		console.log(schedule);

		const sessionsDiv = document.getElementById("sessions");
		sessionsDiv.innerHTML = "";

		schedule.forEach((s, i) => {
			const sessionDiv = document.createElement("div");
			sessionDiv.classList.add("session");
			sessionsDiv.appendChild(sessionDiv);

			const sessionCont = document.createElement("div");
			sessionDiv.appendChild(sessionCont);

			const paperHeading = document.createElement("h4");
			paperHeading.innerText = s.title;
			sessionCont.appendChild(paperHeading);

			const presentHeading = document.createElement("h5");
			presentHeading.innerText = `Presented by: ${s.presenter}`;
			sessionCont.appendChild(presentHeading);

			const tempolocalPara = document.createElement("p");
			tempolocalPara.innerText = `Location: ${s.location}\nDate: ${s.date}\nTime: ${s.time}`;
			sessionCont.appendChild(tempolocalPara);

			sessionDiv.addEventListener("click", () => { console.log(s.title) });
		});
		//console.log(papers);
	}

	loadSchedule()
});