document
  .querySelector("#Search-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.querySelector("#Search-input").value.trim();

    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query= ${query}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b78340e58dmsh5de8c26482ad7f4p1e8b23jsn08abb24726b3",
        "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(data);
      displayvideos(result.data);
    } catch (error) {
      console.error("erro for fetchin search result ", error);
    }
  });

function displayvideos(videos) {
  const videoList = document.querySelector(".video-list");
  videoList.innerHTML = "";
  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = `video-item`;
    videoItem.innerHTML = `
                                <div class="video-thumbinal"  style=" background-image: url('${video.thumbnail[0].url}') 
 "></div>
                                <div class="video-info">
                                      <div class="video-title">${video.title}</div>
                                        <div class="chanal-name">${video.channelTitle}</div>
                                 </div>



           `;

    videoList.appendChild(videoItem);
    videoItem.addEventListener("click", function () {
      openmodal(video.videoId);
    });
  });
}

function openmodal(videoId) {
  const modal = document.querySelector(".video-modal");
  const videoPlayer = document.querySelector(".video-player");
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  videoPlayer.src = videoUrl;
  modal.style.display = "block";

  document
    .querySelector(".Dowlound-mp3")
    .addEventListener("click", async function () {
      const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b78340e58dmsh5de8c26482ad7f4p1e8b23jsn08abb24726b3",
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.status === "ok") {
          window.location.href = result.link;
        } else {
          alert("error in dowlounding mp3" + result.msg);
        }
      } catch (error) {
        console.error(error);
      }
    });
}

document.querySelector(".close-modal").addEventListener("click", closemodal);
function closemodal() {
  const modal = document.querySelector(".video-modal");
  const videoPlayer = document.querySelector(".video-player");

  videoPlayer.src = "";
  modal.style.display = "none";
}

window.onclick = function (e) {
  const modal = document.querySelector(".video-modal");

  if (e.target === modal) {
    closemodal();
  }
};
