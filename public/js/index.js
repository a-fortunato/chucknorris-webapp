function sendCategory(cat) {
  fetch('/clicked', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({category: cat})
  })
    .then(res => {
      if(res.ok){
	res.json().then( data => {
	  const div = document.getElementById("jokes")
	  const joke = data.joke
	  
	  const p = document.createElement('p')
	  p.innerHTML = `<strong>${cat} joke:</strong> ${joke}`
	  div.prepend(p)
	})
      }
    })
    .catch(err => {
      console.log('Error found: ', err)
    })
}

function showOptions(data){
  const jokeButton = document.getElementById("category-"+data)
  
  if (jokeButton.style.display === "block") {
    jokeButton.style.display = "none"
  } else {
    jokeButton.style.display = "block"
  }
}
