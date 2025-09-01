(function(){
    function id(id){
        return document.getElementById(id);
    }
    fetch("header.txt").then(function(data){
        return data.text();
    }).then(function(header){
        document.body.innerHTML=header+document.body.innerHTML;
    });
    if(id("source")){
        let main=document.createElement("div");
        main.classList.add("main-parent");
        main.innerHTML=`<div id="content"></div><div id="sidemenu"></div>`;
        let source=id("source").innerHTML;
        id("source").after(main);
        id("content").innerHTML=source;
        id("source").remove();
        fetch("sidemenu.txt").then(function(data){
            return data.text();
        }).then(function(sidemenu){
            id("sidemenu").innerHTML=sidemenu;
        });
    }
    document.querySelector(".article")?document.querySelectorAll(".article").forEach(function(element){
        let a=document.createElement("a");
        let img=document.createElement("img");
        img.src=element.getAttribute("img");
        img.classList.add("article-img");
        a.href=element.getAttribute("link");
        let title=element.innerHTML;
        element.innerHTML="";
        a.appendChild(img);
        a.innerHTML+=`<span class="article-title">${title}</span>`;
        element.appendChild(a);
    }):"";
    fetch("footer.txt").then(function(data){
        return data.text();
    }).then(function(footer){
        document.body.innerHTML+=footer;
    });
})();
