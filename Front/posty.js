const getAllPosts = async () => {
  const response = await fetch('http://localhost:3000/getAllPosts');
  const data = await response.json();

  return data;
};

const renderPosts = async () => {
  const grid = document.querySelector('.grid');
  const posts = await getAllPosts();

  posts.reverse().forEach((postData) => {
    if (Object.values(postData).length < 5) return;
    const post = `
        <article class="kartaOgloszenie">
            ${postData.image.includes("http") ? `<img src=${postData.img} >` : `<img src="placeholder.png">`}
            <h3 class="oglTytul">${postData.title}</h3>
            <h4 class="oglCena">${postData.price} zł</h4>
        </article>`;
    grid.insertAdjacentHTML('afterbegin', post);
  });
};

renderPosts();

const openModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = "flex";
}

const handleAdd = async (event) => {
  event.preventDefault()
  const addForm = document.querySelector('.modalForm');

  const title = addForm.elements['title'].value;
  const price = addForm.elements['price'].value;
  const img = addForm.elements['img'].value;
  const description = addForm.elements['description'].value;
  const category = addForm.elements['category'].value;

  const response = await fetch('http://localhost:3000/addPost', {
    method: 'POST',
    body: {
      title: title,
      price: price,
      img: img,
      description: description,
      category: category}
  })

  if (response.ok) document.querySelector(".modal").style.display = "none"
}

const closeModal = () => {
  document.querySelector('.modal').style.display = "none";
}