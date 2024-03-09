//variables globales
const arrayLinks = document.querySelectorAll(".nav-link");
const Button = document.querySelector("#like-button");
const pageLikes = document.querySelector("#likes");
const textButton = document.querySelector("#text-button");
const urlApi = "https://apiportfolio-ubm-dev-production.up.railway.app/";
//funciones
window.addEventListener("load", async (e) => {
  const likes = await handleGetRequestLikes();
  handleSetLikes(likes);
  handleActivateButton();
});

window.addEventListener("hashchange", (e) => {
  const newUrl = e.newURL;
  arrayLinks.forEach((elemnt) => {
    elemnt.classList[1] === "activa" && elemnt.classList.remove("activa");
  });
  arrayLinks.forEach((elemnt) => {
    elemnt.href === newUrl && elemnt.classList.add("activa");
  });
});

Button.addEventListener("click", async (e) => {
  const likes = await handlePostLikes();
  handleSetTanksText();
  handleSetLikes(likes);
  Button.disabled = Boolean(localStorage.getItem("isLiked"));
});

const handleSetLikes = (likes) => {
  pageLikes.innerText = likes;
};

const handleSetTanksText = () => {
  window.location.pathname === "/index-en.html"
    ? (textButton.innerText = "Thank you for give me a like. 😄")
    : (textButton.innerText = "Gracias por tu me gusta.😄");
};

const handleGetRequestLikes = async () => {
  try {
    let request = await fetch(urlApi);
    const { likes } = await request.json();
    return likes;
  } catch (error) {
    return 101;
  }
};

const handlePostLikes = async () => {
  try {
    let request = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: 1 }),
    });
    const { likes } = await request.json();
    localStorage.setItem("isLiked", true);
    return likes;
  } catch (error) {
    return 100;
  }
};

const handleActivateButton = () => {
  const status = Boolean(localStorage.getItem("isLiked"));
  if (status) {
    handleSetTanksText();
  }
  Button.disabled = status;
};
