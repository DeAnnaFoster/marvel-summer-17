function MarvelController() {
  var service = new MarvelService();

  function drawMarvel(arr) {
    var template = ''

    for (var i = 0; i < arr.length; i++) {
      var character = arr[i];
      template += `<div>${character.name} <button onclick="app.controllers.marvelController.addCharacter(${character.id})">Add</button></div>`
    }
    
    document.getElementById('marvel-list').innerHTML = template;
  }

  function redrawMarvel() {
    var arr = service.getMarvel();
    var template = ''

    for (var i = 0; i < arr.length; i++) {
      var character = arr[i];
      template += `<div>${character.name} <button onclick="app.controllers.marvelController.addCharacter(${character.id})">Add</button></div>`
    }

    document.getElementById('marvel-list').innerHTML = template;
  }

  drawRoster = function () {
    var roster = service.getRoster();
    var template = '';

    roster.forEach(char => {
      template += `<div>${char.name} <button onclick="app.controllers.marvelController.removeCharacter(${char.id})">Remove</button></div>`;
    })

    document.getElementById('my-characters').innerHTML = template;
  }

  this.removeCharacter = function(id){
    service.removeCharacter(id);
    drawRoster();
    redrawMarvel();
  }

  this.addCharacter = function (id) {
    var char = service.addCharacterToRoster(id);
    drawRoster();
    redrawMarvel();
  }

  this.search = function(event){
    event.preventDefault();
    let searchPhrase = event.target.searchTerm.value;
    service.search(searchPhrase, drawMarvel);
  }
}
