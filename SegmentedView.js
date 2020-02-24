class SegmentedView{
    constructor(id, data, multiselect){
        var self = this;
        this.data = data;
        this.id = id;
        this.multiselect = multiselect;
        var innerHtml = "";
        var container = document.getElementById(id);
        if (container){
            this.hasImages = false;
            this.hasText = false;
            for (var i = 0; i < data.length; i++){
                var imageContent = "";
                if (data[i].image){
                    this.hasImages = true;
                    imageContent = "<img src='" + data[i].image + "'>"
                }
                var textContent = "";
                if (data[i].text){
                    this.hasText = true;
                    textContent = "<h1>" + data[i].text + "</h1>"
                }
                innerHtml += "<button>" + imageContent + textContent + "</button>";
            }
            if (this.hasImages && this.hasText){
                container.style.height = "40px";
            }else if (this.hasText){
                container.style.height = "20px";
            }else if (this.hasImages){
                container.style.height = "30px";
            }

            container.innerHTML = innerHtml;
            var text = container.getElementsByTagName("h1");
            for (var i = 0; i < text.length; i++){
                text[i].style.padding = "0px";
                text[i].style.margin = "0px";
                if (!this.hasImages){
                    text[i].style.marginTop = "4px";
                }
                text[i].style.height = "20px";
                text[i].style.fontWeight = "400";
                text[i].style.fontSize = "10px";
            }

            var image = container.getElementsByTagName("img");
            for (var i = 0; i < image.length; i++){
                image[i].style.padding = "0px";
                image[i].style.margin = "0px";
                image[i].style.marginTop = "4px";
                image[i].style.height = "20px";
            }
            var buttons = container.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++){
                buttons[i].style.width = 100 / buttons.length + "%";
                buttons[i].style.textAlign = "center";
                buttons[i].style.padding = "0px";
                buttons[i].style.border = "none";
                buttons[i].style.height = "100%";
                buttons[i].style.backgroundColor = "#F9F9F9";
                buttons[i].style.outline = "none";
                if (!i){
                    buttons[i].style.borderRight = "solid #E7E7E7 1px";
                    buttons[i].style.borderRadius = "5px 0px 0px 5px";
                }else if (i == buttons.length - 1){
                    buttons[i].style.borderLeft = "solid #E7E7E7 1px";
                    buttons[i].style.borderRadius = "0px 5px 5px 0px";
                }else{
                    buttons[i].style.borderRight = "solid #E7E7E7 1px";
                    buttons[i].style.borderLeft = "solid #E7E7E7 1px";
                }
                buttons[i].setAttribute("index", i);
                buttons[i].addEventListener("click", function (){
                    var index = parseInt(this.getAttribute("index"));
                    self.selectItem(index)
                    console.log("asd");
                })
            }

            this.multiselect = multiselect;
            if (this.multiselect){
                this.selection = [];
            }else{
                this.selection = -1;
                this.selectItem(0);
            }
        }else {
            console.error("Invalid id");
        }
    }
    selectItem(index){
        if (this.multiselect){
            if (this.selection.includes(index)){
                var ind = this.selection.indexOf(index);
                if (ind != -1){
                    this.selection.splice(ind, 1);
                }
                var container = document.getElementById(this.id);
                var element = container.querySelectorAll("button")[index];
                element.style.backgroundColor = "#f9f9f9";
                if (this.data[index].opposite){
                    element.querySelectorAll("img")[0].src = this.data[index].image;
                }
                if (this.data[index].text){
                    element.querySelectorAll("h1")[0].style.color = "black";
                }
            }else{
                var container = document.getElementById(this.id);
                var element = container.querySelectorAll("button")[index];
                element.style.backgroundColor = "#007aff";
                if (this.data[index].opposite){
                    element.querySelectorAll("img")[0].src = this.data[index].opposite;
                }
                if (this.data[index].text){
                    element.querySelectorAll("h1")[0].style.color = "#E7E7E7";
                }
                this.selection.push(index);
            }
        }else{
            if (this.selection == index){
                this.selection = -1;
                var container = document.getElementById(this.id);
                var element = container.querySelectorAll("button")[index];
                element.style.backgroundColor = "#f9f9f9";
                if (this.data[index].opposite){
                    element.querySelectorAll("img")[0].src = this.data[index].image;
                }
                if (this.data[index].text){
                    element.querySelectorAll("h1")[0].style.color = "black";
                }
            }else{
                var container = document.getElementById(this.id);
                if (this.selection != -1){
                    var element = container.querySelectorAll("button")[this.selection];
                    element.style.backgroundColor = "#f9f9f9";
                    if (this.data[this.selection].opposite){
                        element.querySelectorAll("img")[0].src = this.data[this.selection].image;
                    }
                    if (this.data[this.selection].text){
                        element.querySelectorAll("h1")[0].style.color = "black";
                    }
                }
                this.selection = index;
                var element = container.querySelectorAll("button")[index];
                element.style.backgroundColor = "#007aff";
                if (this.data[index].opposite){
                    element.querySelectorAll("img")[0].src = this.data[index].opposite;
                }
                if (this.data[index].text){
                    element.querySelectorAll("h1")[0].style.color = "#E7E7E7";
                }
            }
        }

    }
}
