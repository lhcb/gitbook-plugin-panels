function toggle(id) {
  var ele = document.getElementById("panel-"+id);
  if(ele.style.display == "block") {
    ele.style.display = "none";
  }
  else {
    ele.style.display = "block";
  }
}
