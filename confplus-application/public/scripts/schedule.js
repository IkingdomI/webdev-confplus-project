document.addEventListener('DOMContentLoaded',async ()=>{
	const organizerName = document.querySelector("#organizer-name");
  
	const id = sessionStorage.getItem("user-id");
	const userRes = await fetch(`/api/users/${id}`);
	const user = await userRes.json();
  
	organizerName.textContent = `${user.first_name} ${user.last_name}`

  
  
	const locRes = await fetch("/api/locations");
	const locations = await locRes.json();
	const locSelect = document.querySelector('#location');

	locations.forEach(loc=>{
		const option = document.createElement('option');
		option.value = loc.value;
		option.text = loc.name;
		locSelect.appendChild(option)
	})

	const dateRes = await fetch("/api/conference-dates");
	const dates = await dateRes.json();
	const dateSelect = document.querySelector('#date');

	const timeRes = await fetch("/api/times");
	const times = await timeRes.json();

	dates.forEach(date=>{
		const option = document.createElement('option');
		option.value = date.date;
		option.text = date.date;
		dateSelect.appendChild(option)
	})

	async function updateSession(title, obj)
	{
		const session = await (await fetch(`/api/sessions/${title}`, { method: "PATCH", body: JSON.stringify(obj)})).json();

		console.log(session);

		if (session)
		{
			if (session.message)
			{
				alert(session.message);
			}
			else
			{
				loadSchedule();
				alert("Session Updated!");
			}
		}
		else
		{
			alert("Session not found.");
		}
	}

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
			sessionCont.classList.add("session-content");
			sessionDiv.appendChild(sessionCont);

			const paperHeading = document.createElement("h4");
			paperHeading.innerText = s.title;
			sessionCont.appendChild(paperHeading);

			const presentHeading = document.createElement("h5");
			presentHeading.innerText = `Presented by: ${s.presenter}`;
			sessionCont.appendChild(presentHeading);

			const lDiv = document.createElement("div");
			sessionCont.appendChild(lDiv);

			const lLabel = document.createElement("label");
			lLabel.innerText = "Location: ";
			lDiv.appendChild(lLabel);

			const lSelect = document.createElement("select");
			const lIndex = locations.findIndex(l => l.value === s.location);
			locations.forEach((l, i) => {
				const locOpt = document.createElement("option");
				locOpt.value = l.value;
				locOpt.text = l.name;
				locOpt.selected = (i === lIndex);
				lSelect.appendChild(locOpt);
			});
			lDiv.appendChild(lSelect);


			const dDiv = document.createElement("div");
			sessionCont.appendChild(dDiv);

			const dLabel = document.createElement("label");
			dLabel.innerText = "Date: ";
			dDiv.appendChild(dLabel);

			const dSelect = document.createElement("select");
			const dIndex = dates.findIndex(d => d.date === s.date);
			//console.log(dates);
			dates.forEach((d, i) => {
				const dateOpt = document.createElement("option");
				dateOpt.value = d.date;
				dateOpt.text = d.date;
				dateOpt.selected = (i === dIndex);
				dSelect.appendChild(dateOpt);
			});
			dDiv.appendChild(dSelect);

			const tDiv = document.createElement("div");
			sessionCont.appendChild(tDiv);

			const tLabel = document.createElement("label");
			tLabel.innerText = "Time: ";
			tDiv.appendChild(tLabel);

			const tSelect = document.createElement("select");
			const tIndex = times.findIndex(t => t.time === s.time);
			times.forEach((t, i) => {
				const timeOpt = document.createElement("option");
				timeOpt.value = t.time;
				timeOpt.text = t.time;
				timeOpt.selected = (i === tIndex);
				//console.log(t, i);
				tSelect.appendChild(timeOpt);
			});
			tDiv.appendChild(tSelect);

			const btnsDiv = document.createElement("div");
			btnsDiv.classList.add("session-btns");
			sessionDiv.appendChild(btnsDiv);
			

			const updateBtn = document.createElement("button");
			updateBtn.classList.add("update-btn");
			updateBtn.textContent = "Update";
			updateBtn.addEventListener("click", () => {
				const obj = {
					location: lSelect.value,
					date: dSelect.value,
					time: tSelect.value
				};

				console.log(s.title, obj);

				updateSession(s.title, obj);
			});
			btnsDiv.appendChild(updateBtn);

			const deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete-btn");
			deleteBtn.textContent = "Delete";
			btnsDiv.appendChild(deleteBtn);
		});
		//console.log(papers);
	}

	console.log("eep");
	loadSchedule()
});