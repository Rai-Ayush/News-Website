const ApiKey="d35a250666b04544bff1136287988fee";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>getnews("India"));

const Reload=()=>{
    window.location.reload();
}

async function getnews(query){
    const res =await fetch(`${url}${query}&apiKey=${ApiKey}`);
    const data= await res.json();
    binddata(data.articles);
}

function binddata(articles){
    const cardsContainer=document.getElementById("cardsContainer");
    const newscardTemplate=document.getElementById("newscardTemplate");
    cardsContainer.innerHTML="";
    articles.forEach((article) => {
       if(!article.urlToImage) return;
       const cardClone=newscardTemplate.content.cloneNode(true);
       fillData(cardClone,article);
       cardsContainer.appendChild(cardClone); 
    });
}

function fillData(cardClone,article){
    const newsImage=cardClone.querySelector("#newsImage");
    const newsTitle=cardClone.querySelector("#newsTitle");
    const newsDate=cardClone.querySelector("#newsDate");
    const newsDesc=cardClone.querySelector("#newsDesc");

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date= new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta",});
    newsDate.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    }); 
}

function navitemselect(id){
    getnews(id);
}

function searchbtn(searchitem){
    let search=document.getElementById(searchitem);
    search=search.value;
    if(!search) return;
    getnews(search);
}
