async function resolveRequest(id, method) {

    id = id.trim();

    try{
        const response = await fetch("/resolveRequest", {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
        if(response) {
            console.log("this should refresh")
            window.location.reload();
        } 
        console.log(response.ok)
        if(!response.ok) throw Error("SOMETHING WENT WRONG");

    }

    catch(e){
        console.log(e);
    }
}

// ADD ONCLICK FEATURE FOR ACCEPT BUTTONS
const accepted = document.getElementsByClassName("accept");
for(let i = 0; i< accepted.length; i++){
    accepted[i].onclick = function(){
        resolveRequest(accepted[i].previousElementSibling.innerHTML, "POST");
    }
}

// ADD ONCLICK FEATURE FOR REJECT BUTTONS
const rejected = document.getElementsByClassName("reject");
for(let i = 0; i< rejected.length; i++){
    rejected[i].onclick = function(){
        resolveRequest(rejected[i].previousElementSibling.previousElementSibling.innerHTML, "DELETE");
    }
}
