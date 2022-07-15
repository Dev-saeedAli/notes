let notesContainer = document.querySelector(".notes-container");
let addBtn = document.querySelector(".add-icon");
let closeBtn = document.querySelector(".cross");
let addNote = document.querySelector(".btn");
let titleInput = document.querySelector("#title");
let descInput = document.querySelector("#description");
let mainNotes = document.querySelector(".notes")
let threeDots = document.querySelectorAll(".three-dots");
let noteHeading = document.querySelector(".notes-value h4");
titleInput.focus()


let notes = JSON.parse(localStorage.getItem("notes") || "[]")
let currentMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octber", "November", "December" ]

// console.log(notes)




DisplayNotes()
function DisplayNotes(){
    document.querySelectorAll(".note").forEach(notes => notes.remove())

    notes.forEach((note, index) =>{
         let liTag = `
                <div class="note">
                <h4>${note.title}</h4>
                <p>${note.description}</p>
                <hr>
                <div class="note-details">
                    <span class="date" id="date">${note.date}</span>
                    <span class="three-dots" id="threeDots" ><i onClick=(showOptions(this)) class="fa-solid fa-ellipsis"></i></span>
                    <div class="options active">
                        <span onClick="(editNote('${index}', '${note.title}', '${note.description}'))" class="edit" id="editOption"><i class="fa-solid fa-pen-to-square"><small>Edit</small></i></span>
                        <span onClick="(deleteNote(${index}))" class="delete" id="deleteOption"><i class="fa-solid fa-trash" ></i><small>Delete</small></span>
                    </div>
                </div>
            </div>
        `
        mainNotes.innerHTML += liTag
    });

}
function showOptions(elem){
   elem.parentElement.nextElementSibling.classList.remove("active")
   document.addEventListener("click", (e)=>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.nextElementSibling.classList.add("active")
        }
   })
}

function deleteNote(idx){
    notes.splice(idx, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    DisplayNotes()

}

function editNote(elem, title, description){
    addBtn.click()
    addNote.textContent = "Update Note"
    noteHeading.textContent = "Update your note"
    titleInput.value = title;
    descInput.value = description;
       noteHeading.style.margin = `${10}px ${0}px ${20}px`
       notes.splice(elem, 1)
       localStorage.setItem("notes", JSON.stringify(notes))

}

addNote.addEventListener("click", ()=>{
    addNote.textContent = "Add Note"
    noteHeading.textContent = "Add a new Note"
    let titleValue = titleInput.value;
    let descValue = descInput.value;
    
    let date = new Date(),
    month = date.getMonth()
    day = date.getDay(),
    year = date.getFullYear()
    
    if(titleValue != ""|| descValue != ""){
        let noteObj = {
            title : titleValue,
            description : descValue,
            date : `${currentMonth[month]} ${day}, ${year}`
        }
        notes.push(noteObj)
        localStorage.setItem("notes", JSON.stringify(notes))
        DisplayNotes()
    }
    closeBtn.click()
    
    titleInput.value = ""
    descInput.value = ""
});

addBtn.addEventListener("click", ()=>{
    notesContainer.classList.add("active")
});
closeBtn.addEventListener("click", ()=>{
    notesContainer.classList.remove("active")
});