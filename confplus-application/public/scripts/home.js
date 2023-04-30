document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/api/sessions");
  const sessions = await res.json();

  const sessionsDiv = document.querySelector(".event-container");
  sessionsDiv.innerHTML = "";
  const sessionCards = sessions.map(
    (session) => `<div class="event">
  <div class="event-left">
    <div class="event-date">
    <p class="date">${session.date}</p>
    </div>
  </div>

  <div class="event-right">
    <h3 class="event-title">${session.title}</h3>

    <div class="event-description">
     <p class="presenter">${session.presenter} </p>
    </div>
    <div class="event-details">

    <div class="event-timing">
        
            <i class="far fa-calendar-alt"></i>
            <p class= time> ${session.time}</p>
        
    </div>
    <div class="event-location">
        <p>
                <i class="fas fa-map-marker-alt"></i>
               ${session.location}
        </p>
    </div>
  </div>
  </div>
</div>`
  );

  sessionsDiv.innerHTML += sessionCards.join("");
  //console.log(sessions);

  //fetching selection dropdown
  const dateRes = await fetch("/api/conference-dates");
  const dates = await dateRes.json();

  const selectDiv = document.querySelector("#date");
  selectDiv.innerHTML=`<option id="show" class="show" value="show-all">Show All</option>`;
  const selectOptions = dates
    .map(
      (date) =>
        `<option class="option" value=${date.date}>${date.date}</option>`
    )
    .join("");
  
  selectDiv.innerHTML += selectOptions;
  /*
console.log(dates)
console.log(selectOptions)
*/

  //Filterization
  selectDiv.addEventListener("change", async (e) => {
    
    const targetValue = e.target.value;
    
    const sessionRes = await fetch("/api/sessions");
    const Sessions = await sessionRes.json();
    const filterSession = Sessions.filter((session) => session.date == targetValue);
    console.log(filterSession);
    console.log(targetValue);
    //if (targetValue !== "") { // show all
      if (filterSession.length > 0) {
        sessionsDiv.innerHTML = filterSession.map(
          (session) => `<div class="event">
  <div class="event-left">
    <div class="event-date">
    <p class="date">${session.date}</p>
    </div>
  </div>

  <div class="event-right">
    <h3 class="event-title">${session.title}</h3>

    <div class="event-description">
     <p class="presenter">${session.presenter} </p>
    </div>
    <div class="event-details">

    <div class="event-timing">
        
            <i class="far fa-calendar-alt"></i>
            <p class= time> ${session.time}</p>
        
    </div>
    <div class="event-location">
        <p>
                <i class="fas fa-map-marker-alt"></i>
               ${session.location}
        </p>
    </div>
  </div>
  </div>
</div>`
        );
     } 
      else{
        sessionsDiv.innerHTML = `<h2>No Available sessions</h2>`;
      }
    //}
    if(targetValue=="show-all") {
      sessionsDiv.innerHTML += Sessions.map(
        (session) => `<div class="event">
  <div class="event-left">
    <div class="event-date">
    <p class="date">${session.date}</p>
    </div>
  </div>

  <div class="event-right">
    <h3 class="event-title">${session.title}</h3>

    <div class="event-description">
     <p class="presenter">${session.presenter} </p>
    </div>
    <div class="event-details">

    <div class="event-timing">
        
            <i class="far fa-calendar-alt"></i>
            <p class= time> ${session.time}</p>
        
    </div>
    <div class="event-location">
        <p>
                <i class="fas fa-map-marker-alt"></i>
               ${session.location}
        </p>
    </div>
  </div>
  </div>
</div>`);
sessionsDiv.children[0].hidden=true;
console.log(sessionsDiv.children);
    }
 
  });
});
