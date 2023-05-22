
//getting started with Webpack
npm init -y
npm install webpack webpack-cli --save-dev
npm install --save lodash
npm install --save-dev style-loader css-loader

//getting started with eslint
eslint --init

note.addEventListener("click", function (event) {
      note.classList.add("focus");
      description.style.display = "";
      note.style.zIndex = 10;
      note.style.position = "relative";
      overlay.classList.add("active");
      title.contentEditable = true;
      date.disabled = false;
      description.contentEditable = true;
      removeBtn.style.display = "";
      overlay.addEventListener("click", function () {

        //newcodenotworkingideally

        let titledate = note.getAttribute("data-titledate");
        let [title, date] = titledate.split("_");

        let editedObject = {
          title: `${notetitle}`,
          date: `${notedate}`,
          description: `${notedescription}`,
        };

        for (let key in myLibrary) {
          if (Array.isArray(myLibrary[key])) {
            const index = myLibrary[key].findIndex(
              (item) => item.title === title && item.date === date
            );
            if (index !== -1) {
              myLibrary[key][index] = editedObject;
              break;
            }
          }
        }
        ///newcodenotworkingideally
        console.log(editedObject.title)
        console.log(editedObject.date)
        console.log(editedObject.description)

        overlay.classList.remove("active");
        note.style.zIndex = 1;
        note.style.position = "relative";
        note.classList.remove("focus");
        description.style.display = "none";
        //newcode
        note.setAttribute("data-titledate", `${notetitle}_${notedate}`);
        ///newcode
        console.log(myLibrary.getAllObjects());
      });
    });