console.log("added")

function getTime(time){
    const hour = parseInt(time / 3600)
    let reaminingSeconds = time % 3600
    const minute = parseInt(reaminingSeconds / 60)
    reaminingSeconds = reaminingSeconds % 60
    return `${time}second ${minute} minute ${reaminingSeconds} second ago`
}
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}
const removeActiveClass = ()=>{
    const buttons = document.getElementsByClassName("category-btn")
    for(let btn of buttons){
        btn.classList.remove("active")
    }

}
const loadCategoriesVideos= (id)=>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data =>{
            removeActiveClass()
            
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active")
            displayVideos(data.category)

        })
        .catch((error) => console.log(error))
}
const loadDetails = async (videoId) => {
    console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.video)
}
const displayDetails = (video) => {
    console.log(video)
    const deatilsContainer = document.getElementById("modal-content")
    deatilsContainer.innerHTML=`
    <img src= ${video.thumbnail}/>
    <p> ${video.description}/>`

    // document.getElementById("showModalData").click()
    document.getElementById("customModal").showModal()
}
const loadVideos = (searchText="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const displayVideos = (video) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML=""
    if(video.length === 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `<div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png"/></div>
        <h2 class="text-center text-xl font-bold">NO CONTENT HERE</h2>`
        return
    }
    else{
        videoContainer.classList.add("grid")
    }

    video.forEach((item2) => {
        console.log(item2)


        const card = document.createElement('div')
        card.classList ="card card-compact"
        card.innerHTML = `<figure class="h-[200px] relative">
    <img
      src=${item2.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${item2.others.posted_date?.length ===0 ?"":`<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTime(item2.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
          <img class="w-10 h-10 rounded-full object-cover" src="${item2.authors[0].profile_picture}"/>
        </div>
        <div>
        <h2 class="font-bold">${item2.title}</h2>
        <div class="flex item-center gap-2">
           <p class="text-gray-400">${item2.authors[0].profile_name}</P>

           ${item2.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
        </div>
        <p> <button onclick="loadDetails('${item2.video_id}')" class="btn btn-sm btn-error">Details</button></p>
        
        </div>
    
  </div>`
  videoContainer.appendChild(card)
    })
}
const displayCategories = (category) => {
    const categoryContainer = document.getElementById("categories")
    category.forEach((item) => {
        console.log(item)


        // const button = document.createElement("button")
        // button.classList = 'btn'
        // button.innerText = item.category
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class='btn category-btn'>${item.category}</button>
        `

        categoryContainer.appendChild(buttonContainer)

    })

}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value)
})
loadCategories();
loadVideos();
