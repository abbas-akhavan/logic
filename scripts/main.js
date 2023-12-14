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

    //overlay for videos of pages
  if($(".overlay").length > 0){
    $(".overlay").click(function(){
        $(this).removeClass("overlay");
        $(this).find("video").attr("controls" , true);
        $(this).find("video")[0].play();
    });
    $(".overlay").find("video").on("ended",function(){
        $(this).attr("controls" , false);
        $(this).parents(".road-map-video").addClass("overlay");
    });
}
//End

//show course info codes when user click on course title
if($("[class*='station']")){
    $("[class*='station']").click(function(event){
        //disable bubble because nested .station classes
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else{
            event.cancelBubble = true;

        }

        //show course info and scroll to info section
        let description = $(this).parents(".ro  ad-map-overview").children(".road-map-description");
        if($(this).data("id")){
            let data = `{"id" : ${$(this).data("id")}}`;
            $.get("url" , data , function(ReceivedData , status){
                if(status == "success"){
                    // $(description).html(ReceivedData);
                    if($(window).width() < 698){
                        $("html , body").animate({scrollTop : description.offset().top} , 100);
                    }
                }
            });
        }
    });
}
if($(".prerequisite")){
    $(".prerequisite").click(function(event){
        
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else{
            event.cancelBubble = true;
        }

        //show course info and scroll to info section
        let description = $(this).parents(".road-map-overview").children(".road-map-description");
        if($(this).data("id")){
            let data = `{"id" : ${$(this).data("id")}}`;
            $.get("url" , data , function(ReceivedData , status){
                if(status == "success"){
                    // $(description).html(ReceivedData);
                    //scroll to info section on mobile device
                    if($(window).width() < 698){
                        $("html , body").animate({scrollTop : description.offset().top} , 100);
                    }
                    
                }
            });
        }
    });
}
//End

//calculate height of road-map-stations depending on number of stations in small devices
if($(window).width() < 698){
    if($(".road-map-stations")){
        $(".road-map-stations").each(function(){
          debugger;
            let stationsCounte = $(this).find("[class*='station']").length + 7;
            let height = stationsCounte * 19;//every station has 19vw height
            $(this).css("height" , height + "vw");
        });
    }
}
//End
  }, 500);

  
});
