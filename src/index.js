// write your code here
document.addEventListener('DOMContentLoaded', () => {
    getRamenImages();
})


//Nodes
const menu = () => document.getElementById('ramen-menu')
const details = () => document.getElementById('ramen-detail')
const detailImage = () => details().querySelector('img')
const ramenName = () => details().querySelector('h2')
const restaurant = () => details().querySelector('h3')
const rating = () => document.getElementById('rating-display')
const comment = () => document.getElementById('comment-display')
const form = () => document.getElementById('new-ramen')

//Fetch
function getRamenImages () {
    fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(ramens => {
            console.log(ramens)
            ramens.forEach(ramen => {
                const img = document.createElement('img')
                img.src = ramen.image
                img.addEventListener('click', () => {
                    detailImage().src = ramen.image
                    ramenName().innerText = ramen.name
                    restaurant().innerText = ramen.restaurant
                    rating().innerText = ramen.rating
                    comment().innerText = ramen.comment
                })
                menu().appendChild(img)
            })
        })
}


//Form Submission
form().addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    detailImage().src = document.getElementById('new-image').value
    ramenName().innerText = document.getElementById('new-name').value
    restaurant().innerText = document.getElementById('new-restaurant').value
    rating().innerText = document.getElementById('new-rating').value
    comment().innerText = document.getElementById('new-comment').value

    form().reset()
})