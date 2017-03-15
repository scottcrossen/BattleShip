var Lab4 = function() {
  //Your base URL should be of the form: xxx.xxx:3004

  var self = this;
  //The elements from lab 2 needed for the weather search (which should still work)
  self.cityInput = $("#cityField");
  self.suggestionsList = $("#txtHint");
  self.allSuggestions = $$("#txtHint li");
  self.weatherButton = $("#weatherButton");
  self.cityTextArea = $("#displayCity");
  self.weatherText =$("#weather");

  //The elements needed on the frontend for the owlbot search
  self.owlSearchInput = $("#searchWord");
  self.owlSearchButton = $("#searchButton");
  self.owlSearchResults = $("#searchResults");

  //These are your route URLs (when appended to the base one)
  self.getcityRoute = "/getcity?q=";
  self.owlRoute = "/word?w=";
}

module.exports = new Lab4();
