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
    let url={};
    location.search.replace("?","").split("&").forEach(function(value){url[value.split("=")[0]]=value.split("=")[1]});
    let hash={};
    location.hash.replace("#","").split("&").forEach(function(value){hash[value.split("=")[0]]=value.split("=")[1]});
    let mediaElements="#content img:not(.noviewer),#content video:not(.noviewer)";
    fetch("header.txt").then(function(data){
        return data.text();
    }).then(function(header){
        document.body.insertAdjacentHTML("afterbegin",header);
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
            id("sidemenu").innerHTML=`<div id="sidemenu-items">${sidemenu}</div>`;
        });
        document.querySelector(mediaElements)?document.querySelectorAll(mediaElements).forEach(function(element){
            if(!element.classList.contains("noviewer")){
                element.onclick=openMedia;
            }
        }):"";
        if(hash.media&&hash.media<document.querySelectorAll(mediaElements).length){
            openMedia(document.querySelectorAll(mediaElements)[hash.media]);
        }
        if(id("redirect")){
            location.href=id("redirect").getAttribute("target");
        }
    }
    function openMedia(element){
        element=element.target||element;
        let mediascreen=document.createElement("div");
        let media=document.createElement(element.tagName||"img");
        let allMedia=[...document.querySelectorAll(mediaElements)];
        mediascreen.innerHTML=`<div id="media-closebtn">×</div>`;
        media.src=element.src;
        media.style.cssText=`max-width:100%;max-height:${window.innerHeight/5*4}px;`;
        media.controls=true;
        mediascreen.id="media";
        mediascreen.appendChild(media);
        document.body.appendChild(mediascreen);
        media.style.top="0px";
        function closeMedia(){
            let scpx=window.scrollY;
            mediascreen.remove();
            location.hash="";
            window.scroll(0,scpx);
        };
        mediascreen.onclick=function(e){
            if(e.target!=media){
                closeMedia();
            }
            else if(e.target.tagName=="IMG"){
                location.href=element.src;
            }
        };
        location.hash="media="+allMedia.findIndex(function(data){
            return data==element;
        })+"&filepath="+element.src;
    };
    document.querySelector(".article")?document.querySelectorAll(".article").forEach(function(element){
        let a=document.createElement("a");
        let img=document.createElement("img");
        img.src=element.getAttribute("img")||"Flag_of_UFFF.svg";
        img.classList.add("article-img");
        a.href=element.getAttribute("link");
        let title=element.innerHTML;
        element.innerHTML="";
        a.appendChild(img);
        a.innerHTML+=`<div class="article-items"><span class="article-title">${title}</span><br><span class="article-date">${element.getAttribute("date")}</span></div>`;
        element.appendChild(a);
    }):"";
    document.querySelector("h1")?document.querySelectorAll("h1").forEach(function(element){
        element.after(document.createElement("br"));
        element.before(document.createElement("br"));
    }):"";
    fetch("footer.txt").then(function(data){
        return data.text();
    }).then(function(footer){
        document.body.insertAdjacentHTML("beforeend",footer);
        document.body.style.opacity="1";
    });
    window.onscroll=function(){
        if(document.querySelector("header")){
            let header=document.querySelector("header").offsetHeight+10;
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
        }
    };
})();
