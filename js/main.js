const myComics = [
  { id: 1, title: "Amazing Fantasy #15", published: "1962"
  }, { id: 2, title: "Detective Comics #27", published: "1939"
  }, { id: 3, title: "Action Comics #1", published:  "1938"
  }, { id: 4, title: "The Incredible Hulk #180", published:  "1974"
  }
];

if (window.indexedDB) {
  var request = indexedDB.open("comicsDB", 1);

  request.onerror = function(e){
    console.log(e);
  }

  request.onupgradeneeded = function(e){
    var db = e.target.result;
    var objectStore = db.createObjectStore("comics", {keyPath: "id"});
    objectStore.createIndex("title", "title", {unique: false});
    objectStore.transaction.oncomplete = function(e) {
      var store = db.transaction(["comics"], "readwrite").objectStore("comics");
      for ( var i = 0 ; i < myComics.length; i++) {
        store.add(myComics[i]);
      }
    }
  }

  request.onsuccess = function(e){
    console.log("success");
  }

}
