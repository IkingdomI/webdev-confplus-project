document.addEventListener('DOMContentLoaded',()=>{

    //THIS IS A DUMMY CODE COMMENT IT IF NEEDED
    const collapse = document.querySelector(".collapse");
    collapse.addEventListener('click',()=>{
        const abstract = document.querySelector(".abstract");
        abstract.classList.toggle('hide');
        collapse.classList.toggle('toggle-collapse')
    });
});