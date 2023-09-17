$(function () {
  //event of videos inside course content (journal)
  const courseVideos = document.querySelectorAll(".courseVideo");
  if (courseVideos.length > 0)
    courseVideos.forEach((videoWrap) => {
      const video = videoWrap.querySelector("video");

      videoWrap.onclick = () => {
        videoWrap.classList.add("active");
        video.controls = true;
        video.play();
      };

      video.onended = () => {
        videoWrap.classList.remove("active");
        video.controls = false;
      };
    });

  //getUp
  const getUp = dc.id("getUp");
  if (getUp) {
    const checkScroll = () => {
      if (window.scrollY > window.innerHeight) getUp.classList.add("active");
      else getUp.classList.remove("active");
    };
    getUp.onclick = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("scroll", checkScroll);
  }

  //collapsible
  const collapsible = dc.queries(".collapsible");
  if (collapsible)
    collapsible.forEach(coll => {
      let nextElement = coll.nextElementSibling;
      nextElement.style.setProperty('--scrollHeight', nextElement.scrollHeight + 'px')
    });
});
