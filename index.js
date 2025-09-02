(function(){
    function id(id){
        return document.getElementById(id);
    }
    (function(){
        let link=document.createElement("link");
        link.rel="icon";
        link.href="Emblem_of_UFFF.svg";
        document.querySelector("head").appendChild(link);
    })();
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
    document.querySelector("h1")?document.querySelectorAll("h1").forEach(function(element){
        element.after(document.createElement("br"));
        element.before(document.createElement("br"));
    }):"";
    fetch("footer.txt").then(function(data){
        return data.text();
    }).then(function(footer){
        document.body.innerHTML+=footer;
    });
    window.onscroll=function(){
        let header=document.querySelector("header").offsetHeight;
        let banner=document.querySelector(".banner");
        if(scrollY>header){
            banner.style.visibility="visible";
            banner.style.opacity="1";
        }
        else{
            banner.style.opacity="0";
            setTimeout(function(){
                if(scrollY<=header){
                    banner.style.visibility="hidden";
                }
            },200);
        }
    };
})();
