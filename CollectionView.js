class CollectionView{
    constructor(id, width){
        this.id = id;
        this.count = 0;
        this.width = width? width: 3;
        if (document.getElementById(id)){
            document.getElementById(id).innerHTML = "<table><tbody></tbody></table>";
        }else{
            console.error("cannot find collectionview with id: " + id);
        }
    }
    setItemsCount(count, callback){
        this.count = count;
        var table = document.getElementById(this.id).childNodes[0];
        table.innerHTML = "<tbody></tbody>";
        table.style.width = "100%";
        for (var i = 0; i < Math.ceil(this.count / this.width); i++){
            var row = table.insertRow(i);
            row.style.width = "100%";
            for (var j = 0; j < Math.min(this.width, this.count - (this.width * i)); j++){
                var cell = row.insertCell(j);
                cell.style = "width: auto; height: auto;";
            }
        }
        for (var i = 0; i < count; i++){
            callback(this.getItem(i), i);
        }
    }
    addItem(index){
        if (index <= this.count + 1 && index >= 0){
            var table = document.getElementById(this.id).childNodes[0];
            if (this.count % this.width == 0){
                var row = table.insertRow(Math.ceil(this.count / this.width));
                row.style.width = "100%";
            }
            var row = table.childNodes[0].childNodes[Math.ceil(this.count / this.width) - 1];
            var cell = row.insertCell(this.count % this.width);
            cell.style = "width: auto; height: auto;";

            this.count++;
            // shift all items to the right
            for (var i = parseInt(this.count / this.width); i >= parseInt((index - 1 )/ this.width); i--){
                var row = table.childNodes[0].childNodes[i];
                var min = parseInt((index - 1 ) / this.width) == i ? this.width - ((i + 1) * this.width - index): 0;
                for (var j = Math.min(this.width, this.count - (this.width * i)) - 1; j >= min; j--){
                    if ((j == min || j == 0) && i == parseInt((index - 1 )/ this.width)){
                        break
                    }else{
                        if (!j){
                            var prev = table.childNodes[0].childNodes[i - 1];
                            row.childNodes[j].innerHTML = prev.childNodes[prev.childNodes.length - 1].innerHTML;
                        }else{
                            row.childNodes[j].innerHTML = row.childNodes[j - 1].innerHTML;
                        }
                    }
                }
            }
        } else {
            console.error("Invalid index");
        }
    }
    removeItem(index){
        if (index <= this.count - 1 && index >= 0){
            var table = document.getElementById(this.id).childNodes[0];
            this.count--;
            // shift all items to the left
            for (var i = parseInt((index)/ this.width); i < parseInt(this.count / this.width) + 1; i++){
                var row = table.childNodes[0].childNodes[i];
                var min = parseInt((index) / this.width) == i ? this.width - ((i + 1) *  this.width - index): 0;
                for (var j = min; j < Math.min(this.width, this.count - (this.width * i)); j++){

                    if (j == this.width - 1){
                        var next = table.childNodes[0].childNodes[i + 1];
                        if (next){
                            row.childNodes[j].innerHTML = next.childNodes[0].innerHTML;
                        }
                    }else{
                        row.childNodes[j].innerHTML = row.childNodes[j + 1].innerHTML;
                    }
                }
            }
            if (Math.ceil((this.count + 1) / this.width) != Math.ceil((this.count) / this.width)){
                table.deleteRow(Math.ceil((this.count + 1) / this.width) - 1);
            }else{
                var row = table.childNodes[0].childNodes[Math.ceil((this.count) / this.width) - 1];
                row.deleteCell(row.childNodes.length - 1);
            }
        } else {
            console.error("Invalid index");
        }
    }
    setWidth(width){
        if (width > 0 && width <= this.count){
            var table = document.getElementById(this.id).childNodes[0];
            var old = this.width;
            this.width = width;
            if (old > width){
                for (var i = 0; i < Math.ceil(this.count / width) - 1; i++){
                    var row = table.childNodes[0].childNodes[i];
                    for (var j = row.childNodes.length - 1; j >= 0; j--){
                        var next = table.childNodes[0].childNodes[i + 1];
                        if (!next){
                            next = table.insertRow(i + 1);
                        }
                        if (j >= width){
                            next.insertBefore(row.childNodes[j], next.firstChild);
                        }
                    }
                }
            }else{
                for (var i = 0; i <= Math.ceil(this.count / width) - 1; i++){
                    var row = table.childNodes[0].childNodes[i];
                    var currentSize = row.childNodes.length;
                    for (var j = width - 1; j >= 0; j--){
                        var iterator = i + 1;
                        var next = table.childNodes[0].childNodes[iterator];
                        if (!next) break;
                        while (!next.childNodes.length){
                            iterator++;
                            next = table.childNodes[0].childNodes[iterator];
                            if (!next) break;
                        }
                        if (!next) break;
                        if (j >= currentSize){
                            row.appendChild(next.childNodes[0], row.firstChild);
                        }
                    }
                }
                for (var i = 0; i < Math.ceil(this.count / width) - 1; i++){
                    var row = table.childNodes[0].childNodes[i];
                    if (!row.childNodes.length){

                    }
                }
            }
        }else{
            console.error("Invalid width");
        }
    }
    getItem(index){
        if (index <= this.count - 1 && index >= 0){
            var tbody = document.getElementById(this.id).childNodes[0].childNodes[0];
            var row = parseInt(index / this.width);
            var cell = index - (this.width * row);
            return tbody.childNodes[row].childNodes[cell];
        } else {
            console.error("Invalid index");
        }
    }
    reset(){
        var table = document.getElementById(this.id).childNodes[0];
        table.innerHTML = "<tbody></tbody>";
        this.count = 0;
    }
}
