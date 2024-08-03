const base_url="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9EvHStQe0OAfz8jjyuKnjVLweg3fNA84U5yWbLlP";
const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromcurr=document.querySelector(".selectfrom select");
const tocurr=document.querySelector(".selectto select");
const msg=document.querySelector(".msg");
const updateexchangerate=async ()=>{
    let amount=document.querySelector("form input");
    let amountvalue=parseFloat(amount.value);
    if(amountvalue<1 || amountvalue===""){
        amountvalue=1;
        amount.value=1;
    }
    let url=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9EvHStQe0OAfz8jjyuKnjVLweg3fNA84U5yWbLlP&base_currency=${fromcurr.value.toUpperCase()}`
    let response=await fetch(url);
    let data=await response.json();
    let currchange=data.data[tocurr.value.toUpperCase()];
    let finalamount=amountvalue*currchange;
    button.style.marginTop="0rem";
    msg.innerText=`${amountvalue}${fromcurr.value.toUpperCase()}=${finalamount}${tocurr.value.toUpperCase()}`;
}
for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener('change',(evnt)=>{
        changeflag(evnt.target);
    });
}
const changeflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
button.addEventListener("click", (evnt)=>{
    evnt.preventDefault();
    updateexchangerate();
});


