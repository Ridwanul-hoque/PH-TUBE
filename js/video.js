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
        card.innerHTML = `<figure>
    <img
      src=${item2.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
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
