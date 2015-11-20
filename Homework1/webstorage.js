window.onload = init;

function init(){
    var addButton = document.getElementById('addButton');
    addButton.onclick = addItem;

    var removeButton = document.getElementById('removeButton');
    removeButton.onclick = removeItem;

    var clearButton = document.getElementById('clearButton');
    clearButton.onclick = clearItems;

    for(var key in localStorage){
    	addItemToList(key, localStorage[key]);
    }
}

function addItem(e){
	var key = document.getElementById('key').value;
	var value = document.getElementById('value').value;

    if(typeof(localStorage[key]) === "undefined"){
    	localStorage.setItem(key, value);
	    addItemToList(key,value);
    }
}

function addItemToList(key,value){
    var items = document.getElementById('items');
    var item = document.createElement('li');
    item.setAttribute("id",key);

    var span = document.createElement('span');
    span.setAttribute("class","note");
    span.innerHTML = key + ":" + value;

    item.appendChild(span);
    items.appendChild(item);
}

function removeItem(e){
	var key = document.getElementById('key').value;
    localStorage.removeItem(key);
	removeItemFromList(key);
}

function removeItemFromList(key){
	var item = document.getElementById(key);
	item.parentNode.removeChild(item);
}

function clearItems(){
	localStorage.clear();
	var ul = document.getElementById("items");
	var items = ul.childNodes;
	for(var i=items.length - 1;i >=0 ;i--){
		ul.removeChild(items[i]);
	}
}
