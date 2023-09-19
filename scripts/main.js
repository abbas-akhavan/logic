$(function () {
  setTimeout(() => {
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
    if (collapsible) {
      collapsible.forEach((coll) => {
        let nextElement = coll.nextElementSibling;
        nextElement.style.setProperty(
          "--scrollHeight",
          nextElement.scrollHeight + "px"
        );
      });
    }

    const isScrolledOver = (element) => {
      return element.getBoundingClientRect().top - window.innerHeight < 0;
    };

    //scroll progress
    const scrollProgress = dc.id("scrollProgress");
    if (scrollProgress) {
      //activate scroll progress buttons
      let items = scrollProgress.queries("#scrollProgress a");
      items.forEach((item) => {
        let query = item.getAttribute("href").substr(1);
        let element = dc.id(query);
        let line = item.previousElementSibling;
        if (!element) return;

        window.addEventListener("scroll", () => {
          if (isScrolledOver(element)) {
            line && line.classList.add('active');
            item.classList.add("active");
          } else {
            line && line.classList.remove('active');
            item.classList.remove("active");
          }
        });
      });

      //
      window.addEventListener("scroll", () => {
        if (scrollProgress.getBoundingClientRect().top)
          scrollProgress.classList.remove("stick");
        else scrollProgress.classList.add("stick");
      });
    }
  }, 500);
});
