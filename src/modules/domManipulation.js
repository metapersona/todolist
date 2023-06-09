import { myLibrary } from "./myLibraryObject";
import { index } from "./switchdirectory";

const overlay = document.getElementById("overlay");

function pushtoDom() {
  const lastObj = myLibrary[index][myLibrary[index].length - 1];
  let notetitle = lastObj.title;
  let notedate = lastObj.date;
  let notedescription = lastObj.description;
  let noteID = lastObj.id;
  let noteFilter = lastObj.projectFilter;

  const newNote = createElements(
    notetitle,
    notedate,
    notedescription,
    noteID,
    noteFilter
  );
  document.getElementById("main-content").appendChild(newNote);
}

export function pushAllItemstoDom() {
  let init = myLibrary.getAllObjects();

  init.forEach((item) => {
    let notetitle = item.title;
    let notedate = item.date;
    let notedescription = item.description;
    let noteID = item.id;
    let noteFilter = item.projectFilter;

    const newNote = createElements(
      notetitle,
      notedate,
      notedescription,
      noteID,
      noteFilter
    );

    document.getElementById("main-content").appendChild(newNote);
  });
}

function createElements(
  notetitle,
  notedate,
  notedescription,
  noteID,
  noteFilter
) {
  const note = document.createElement("div");

  const wrapper = document.createElement("div");
  wrapper.classList.add("notecontentwrapper");

  note.setAttribute("data-id", `${noteID}`);
  note.setAttribute("data-project", `${noteFilter}`);

  note.classList.add("card");
  note.classList.add(index);

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = `${notetitle}`;

  const date = document.createElement("input");
  date.classList.add("date");
  date.type = "date";
  date.value = `${notedate}`;
  date.setAttribute("data-date", `${notedate}`);

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerHTML = notedescription;
  description.style.display = "none";

  title.addEventListener("input", function () {
    notetitle = title.innerHTML;
  });

  date.addEventListener("input", function () {
    notedate = date.value;
  });

  description.addEventListener("input", function () {
    notedescription = description.innerHTML;
  });

  note.addEventListener("click", function (event) {
    overlay.classList.add("active");

    note.classList.add("focus");
    note.style.zIndex = 10;
    note.style.position = "relative";

    title.contentEditable = true;

    date.disabled = false;

    description.style.display = "";
    description.contentEditable = true;

    removeBtn.style.display = "";
    impButton.style.display = "";
    buttonBox.style.display = "";

    overlay.addEventListener("click", function () {
      myLibrary.editNote(
        note,
        notetitle,
        notedate,
        notedescription,
        noteID,
        noteFilter
      );

      date.setAttribute("data-date", `${notedate}`);
      overlay.classList.remove("active");
      note.style.zIndex = 1;
      note.style.position = "relative";
      note.classList.remove("focus");
      description.style.display = "none";
      buttonBox.style.display = "none";
      removeBtn.style.display = "none";
      impButton.style.display = "none";
    });
  });

  note.setAttribute("data-complete", false);
  note.setAttribute("data-important", false);
  let checkbox = completedButton(noteID, note);
  let impButton = importantButton(noteID, note);

  const buttonBox = document.createElement("div");
  let removeBtn = deleteButton();
  removeBtn.style.display = "none";
  impButton.style.display = "none";
  buttonBox.style.display = "none";
  buttonBox.classList.add("buttonbox");

  // note.appendChild(checkbox);
  // note.appendChild(title);
  // note.appendChild(date);
  // note.appendChild(impButton);
  // buttonBox.appendChild(removeBtn);
  // note.appendChild(buttonBox);

  wrapper.appendChild(checkbox);
  wrapper.appendChild(title);
  wrapper.appendChild(date);
  buttonBox.appendChild(impButton);
  buttonBox.appendChild(removeBtn);

  note.appendChild(wrapper);
  note.appendChild(description);
  note.appendChild(buttonBox);

  return note;
}

function deleteButton() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("button", "rmv");

  const deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "trash-can-outline.svg");
  deleteIcon.setAttribute("alt", "Delete");
  deleteIcon.setAttribute("title", "Delete");
  removeBtn.appendChild(deleteIcon);

  removeBtn.addEventListener("click", function () {
    setTimeout(function () {
      myLibrary.deleteNote(removeBtn);
      overlay.classList.remove("active");
      removeBtn.closest(".card").remove();
    }, 100);
  });

  return removeBtn;
}

function completedButton(noteID, note) {
  const container = document.createElement("div");
  container.classList.add("completedcheckboxwrapper")

  const label = document.createElement("label");
  label.setAttribute("for", `completed-checkbox-${noteID}`);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `completed-checkbox-${noteID}`;

  checkbox.classList.add("completed-checkbox");

  container.appendChild(checkbox);
  container.appendChild(label);

  for (let key in myLibrary) {
    if (Array.isArray(myLibrary[key])) {
      const index = myLibrary[key].findIndex((item) => item.id == noteID);
      if (index !== -1 && myLibrary[key][index].complete == true) {
        checkbox.checked = true;
        break;
      }
    }
  }

  if (checkbox.checked == true) {
    note.setAttribute("data-complete", true);
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      note.setAttribute("data-complete", true);
    } else {
      note.setAttribute("data-complete", false);
    }
  });

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == noteID);
          if (index !== -1 && myLibrary[key][index].complete == false) {
            checkbox.checked = true;
            myLibrary[key][index].complete = true;
            break;
          }
        }
      }
    } else {
      // note.setAttribute('data-complete', false);
      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == noteID);
          if (index !== -1 && myLibrary[key][index].complete == true) {
            checkbox.checked = false;
            myLibrary[key][index].complete = false;
            break;
          }
        }
      }
    }
  });

  return container;
}

function importantButton(noteID, note) {
const container = document.createElement("div");
  container.classList.add("importantcheckboxwrapper")

  const label = document.createElement("label");
  label.setAttribute("for", `important-checkbox-${noteID}`);
  label.classList.add("checkbox-label")

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `important-checkbox-${noteID}`;
  checkbox.classList.add("important-checkbox");

  container.appendChild(checkbox);
  container.appendChild(label);

  for (let key in myLibrary) {
    if (Array.isArray(myLibrary[key])) {
      const index = myLibrary[key].findIndex((item) => item.id == noteID);
      if (index !== -1 && myLibrary[key][index].important == true) {
        checkbox.checked = true;
        label.classList.add('checked');
        break;
      }
    }
  }

  if (checkbox.checked == true) {
    note.setAttribute("data-important", true);
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      label.classList.add('checked');

      note.setAttribute("data-important", true);
    } else {
      label.classList.remove('checked');
      note.setAttribute("data-important", false);
    }
  });

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == noteID);
          if (index !== -1 && myLibrary[key][index].important == false) {
            checkbox.checked = true;
            myLibrary[key][index].important = true;
            break;
          }
        }
      }
    } else {
      for (let key in myLibrary) {
        if (Array.isArray(myLibrary[key])) {
          const index = myLibrary[key].findIndex((item) => item.id == noteID);
          if (index !== -1 && myLibrary[key][index].important == true) {
            checkbox.checked = false;
            myLibrary[key][index].important = false;
            break;
          }
        }
      }
    }
  });

  return container;
}

export default pushtoDom;
