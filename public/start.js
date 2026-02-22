fetch('https://iconstarbusiness.store/u')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })