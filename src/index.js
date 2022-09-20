// write your code here
document.addEventListener('DOMContentLoaded', () => {
    getRamenImages();
    loadFirstRamen();
})


//Nodes
const menu =  document.getElementById('ramen-menu')
const details =  document.getElementById('ramen-detail')
const detailImage =  details.querySelector('img')
const ramenName =  details.querySelector('h2')
const restaurant =  details.querySelector('h3')
const rating =  document.getElementById('rating-display')
const comment =  document.getElementById('comment-display')
const form =  document.getElementById('new-ramen')
const editForm =  document.getElementById('edit-ramen')
const deleteBtn =  document.getElementById('delete-btn')

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
                    detailImage.src = ramen.image
                    ramenName.innerText = ramen.name
                    restaurant.innerText = ramen.restaurant
                    rating.innerText = ramen.rating
                    comment.innerText = ramen.comment
                })
                // deleteBtn.addEventListener('click', deleteRamen)
                menu.appendChild(img)
            })
        })
}

function postNewRamen (ramenObj) {
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
        .then(res => res.json())
        .then(newRamen => {
            detailImage.src = newRamen.image
            ramenName.innerText = newRamen.ramenName
            restaurant.innerText = newRamen.restaurant
            rating.innerText = newRamen.rating
            comment.innerText = newRamen.comment

            const img = document.createElement('img')
            img.src = newRamen.image
            menu.appendChild(img)
        })
}

function patchRamen () {
    fetch(`http://localhost:3000/ramens`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify()
    })
        .then(res => res.json())
        .then(res => console.log(res))
}


function loadFirstRamen () {
    fetch('http://localhost:3000/ramens/1')
        .then(res => res.json())
        .then(ramen => {
            detailImage.src = ramen.image
            ramenName.innerText = ramen.name
            restaurant.innerText = ramen.restaurant
            rating.innerText = ramen.rating
            comment.innerText = ramen.comment
        })
}


//Form Submissions
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    let ramenObj = {
        image : document.getElementById('new-image').value,
        ramenName : document.getElementById('new-name').value,
        restaurant : document.getElementById('new-restaurant').value,
        rating : document.getElementById('new-rating').value,
        comment : document.getElementById('new-comment').value
    }

    postNewRamen(ramenObj)
    form.reset()
})

editForm.addEventListener('submit', e => {
    e.preventDefault()

    rating.innerText = document.getElementById('new-rating2').value
    comment.innerText = document.getElementById('new-comment2').value

    console.log(details.value)

    patchRamen()
    editForm.reset()
})

// // Delete Button
// function deleteRamen() {
//     // menu.lastChild.remove()
//     while (menu.lastChild) {
//        menu.lastChild.remove();
//     }
//     menu.map((ramen) => {
//         addRamenToMenu(ramen);
//     });
// }