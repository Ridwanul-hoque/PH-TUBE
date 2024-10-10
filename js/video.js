console.log("added")


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))
}
const cardDemo = {

}
const displayVideos = (video) => {
    const videoContainer = document.getElementById("videos")

    video.forEach((item2) => {
        console.log(item2)


        const card = document.createElement('div')
        card.classList ="card card-compact"
        card.innerHTML = `<figure class="h-[200px]">
    <img
      src=${item2.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
          <img class="w-10 h-10 rounded-full object-cover" src="${item2.authors[0].profile_picture}"/>
        </div>
        <div>
        <h2 class="font-bold">${item2.title}</h2>
        <div class="flex item-center gap-2">
           <p class="text-gray-400">${item2.authors[0].profile_name}</P>
           <img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
        </div>
        
        </div>
    
  </div>`
  videoContainer.appendChild(card)
    })
}
const displayCategories = (category) => {
    const categoryContainer = document.getElementById("categories")
    category.forEach((item) => {
        console.log(item)


        const button = document.createElement("button")
        button.classList = 'btn'
        button.innerText = item.category


        categoryContainer.appendChild(button)

    })

}
loadCategories();
loadVideos();
