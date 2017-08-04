function MarvelService() {
  var apiKey = "ab526efd9e86ef9147ccdccc268abec7";
  var baseUrl = "https://gateway.marvel.com:443/v1/public/characters";

  var marvelResults = [];
  var myRoster = [];

  this.search = function (query, cb) {
    if (query) {
      query = '?name=' + query + '&apikey=';
    } else {
      query = '?apikey=';
    }

    $.get(baseUrl + query + apiKey).then(function (res) {
      marvelResults = res.data.results;
      cb(res.data.results);
    })

  }

  this.addCharacterToRoster = function (id) {
    var character = marvelResults.find(char => char.id == id)
    if (myRoster.indexOf(character) == -1) {
      myRoster.push(character);
      removeCharacterFromMarvelResults(id);
    }
  }

  removeCharacterFromMarvelResults = function (id) {
    var index = marvelResults.findIndex(char => char.id == id);
    if (index != -1) {
      marvelResults.splice(index, 1); //removes items starting at index, total count
    }
  }

  addCharacterBackToMarvelResults = function (char2) {
    var index = marvelResults.findIndex(char => char.id == char2.id);
    if (index == -1) {
      marvelResults.push(char2); //removes items starting at index, total count
    }
  }

  removeCharacterFromRoster = function (id) {
    var indx = myRoster.findIndex(char => char.id == id);
    var char = '';

    if (indx != -1) {
      char = myRoster[indx];
      myRoster.splice(indx, 1); //removes items starting at index, total count
    }

    //add it back to marvelResults
      addCharacterBackToMarvelResults(char);
  }

  this.getRoster = function () {
    //return JSON.parse(JSON.stringify(myRoster)); Stringify broken. Fubar bigtime
    return myRoster;
  }

  this.getMarvel = function () {
    return marvelResults;
  }

  this.removeCharacter = function (id) {
    removeCharacterFromRoster(id);
  }

}