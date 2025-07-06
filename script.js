let data = JSON.parse(localStorage.getItem("notes")) || [];

function displayNote() {
    document.getElementById("allNote").innerHTML = "";
    data.forEach((note, index) => {
        addNote(note, index);
    });
}

function addNote(note = { val: "", date: new Date().toLocaleString() }, i = data.length) {
    const divEle = document.createElement("div");
    divEle.className = "singleNote";

    divEle.innerHTML = `
        <div>
            <button class="editBtn">${note.val ? "Edit" : "Save"}</button>
            <button class="removeBtn">Remove</button>
        </div>
        <div>
            <div class="note ${note.val ? "" : "hidden"}" id="div">${marked.parse(note.val)}</div>
            <textarea class="note ${note.val ? "hidden" : ""}" id="txtA">${note.val}</textarea>
        </div>
        <div class="date">${note.date}</div>
    `;

    const editBtn = divEle.querySelector(".editBtn");
    const txtA = divEle.querySelector("#txtA");
    const div = divEle.querySelector("#div");
    const removeBtn = divEle.querySelector(".removeBtn");

    editBtn.addEventListener("click", () => {
        if (txtA.classList.contains("hidden")) {
            txtA.classList.remove("hidden");
            div.classList.add("hidden");
            editBtn.textContent = "Save";
        } else {
            div.innerHTML = marked.parse(txtA.value);
            txtA.classList.add("hidden");
            div.classList.remove("hidden");
            editBtn.textContent = "Edit";

            data[i] = {
                val: txtA.value,
                date: divEle.querySelector(".date").textContent
            };
            updateStorage();
        }
    });

    txtA.addEventListener("input", () => {
        data[i].val = txtA.value;
        updateStorage();
    });

    removeBtn.addEventListener("click", () => {
        data.splice(i, 1);
        updateStorage();
        displayNote();
    });

    document.getElementById("allNote").appendChild(divEle);
}

function updateStorage() {
    localStorage.setItem("notes", JSON.stringify(data));
}

// ✅ Add Note Button
document.getElementById("btn").addEventListener("click", () => {
    const newNote = { val: "", date: new Date().toLocaleString() };
    data.push(newNote);
    updateStorage();
    displayNote();
});

// Initial Render
displayNote();
