// listen for form submmit.
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

   if(!validateForm(siteName, siteUrl)){
       return false;
   };
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // test if bookmarks is null
    if(localStorage.getItem("bookmarks")=== null){
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }else{
       //get bookmarks from localStorage
       var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
       //add to array
       bookmarks.push(bookmark);
       //Set to local storage
       localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); 
    }

    // Clear form
    document.getElementById("myForm").reset();
    //fetch and add dynamically
    fetchBookmarks();

    //prevent form from submiting
    e.preventDefault();
}

// Delete Bookmarks

function deleteBookmark(url){
    //Get bookmarks form localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //Loop trough bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); 

    // Re-fetch bookmarks
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
     //get bookmarks from localStorage
     var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
     //Get output id
     var bookmarksResults = document.getElementById("bookmarksResults");
     //Build output
    bookmarksResults.innerHTML = "";
    if(JSON.parse(localStorage.getItem("bookmarks"))){
    for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        //append html
        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name +
                                        ' <a class="btn btn-default" target="_blank" href=" '+ url +' ">Visit</a>' +
                                        ' <a onclick="deleteBookmark(\''+ url + '\')" class="btn btn-danger"  href="#">Delete</a>' +
                                        '</h3>' +
                                        '</div>';
    }
}  
}

//validate form
function validateForm(mySiteName, mySiteUrl){
    if(!mySiteName || !mySiteUrl){
        alert("please fill in the form");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!mySiteUrl.match(regex)){
        alert("please use a valid URL");
        return false;
    }

    return true;
}
