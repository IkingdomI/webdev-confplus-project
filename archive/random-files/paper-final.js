var counter=1;
document.getElementById("add-author-btn").addEventListener("click", function () {
    document.getElementById("author-form").innerHTML += `
    <div class="info-group">
        <h4>Author #1</h4>
        <label class="label-group" for="author-1-fname">First Name</label>
        <input type="text" name="author-1-fname" id="author-1-fname" placeholder="Enter your First Name">
        <label class="label-group" for="author-1-lname" >Last Name</label>
        <input  type="text" name="author-1-lname" id="author-1-lname" placeholder="Enter your Last Name">
        <label class="label-group" for="author-1-email">Email</label>
        <input type="email" name="author-1-email" id="author-1-email" placeholder="Example@gmail.com">
      
      <div class="aff-selector-group">
        <label class="label-group" for="author-1-affilitation">Affiliation</label>
        <select class="aff-selector" name="author-1-affiliation" id="author-1-affiliation">
          <option value="" disabled selected>Select your option</option>
          <option value="Qatar University">Qatar University</option>
          <option value="University of Doha for Science and Technology">University of Doha for Science and Technology</option>
          <option value="Carnegie Mellon University in Qatar">Carnegie Mellon University in Qatar</option>
        </select>
      </div>
    </div>`
    
  });
/*
document.getElementById("add-author").addEventListener("click", function () {
  document.getElementById("authors").innerHTML += `<div class="group1">
  <h4>Author #1</h4>
  <label class="label-group" for="author-1-fname">First Name</label>
  <input type="text" name="author-1-fname" id="author-1-fname" placeholder="Enter your First Name" />
  <label class="label-group" for="author-1-lname" >Last Name</label>
  <input  type="text" name="author-1-lname" id="author-1-lname" placeholder="Enter your Last Name" />
  <label class="label-group" for="author-1-email">Email</label>
  <input type="email" name="author-1-email" id="author-1-email" placeholder="Example@gmail.com"/>
</div>
<div class="group2">
<div class="aff-selector-group">
  <label class="label-group" for="author-1-affilitation">Affiliation</label>
  <!-- <input
    type="text"
    name="author-1-affiliation"
    id="author-1-affiliation"
  /> -->
  
  <select class="aff-selector" name="author-1-affiliation" id="author-1-affiliation">
    <option value="" disabled selected>Select your option</option>
    <option value="qatar university">Qatar University</option>
    <option value="university 
    of doha for science and technology">University 
    of Doha for Science and Technology</option>
    <option value="">Carnegie Mellon University in Qatar</option>
  </select>
</div>


<div class="buttons"
><button class="add-author-btn"  id="add-author">Add Author</button
><button class="remove-author-btn" id="remove-author">Remove Author</button>
</div>
<div class="presenter-group">
<label class="label-group" for="presenter">Presenter</label>
<select name="presenter" id="presenter">
<option value="" disabled selected>Select your option</option>
<option value="1">Author #1</option>
</select>
</div>

</div>`;
});
*/