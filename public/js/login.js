let modal = document.getElementById('id01');

//when user clicks anywhere outside the modal, close it
window.onclick = function (event) {
    if (event.target != modal) {
        modal.style.display = "none";
    }
}