
$(function() {
    //event of videos inside course content (journal)
    const courseVideos = document.querySelectorAll('.courseVideo');
    if (courseVideos.length > 0)
    courseVideos.forEach(videoWrap => {
        const video = videoWrap.querySelector('video');

        videoWrap.onclick = () => {
            videoWrap.classList.add('active');
            video.controls = true;
        }

        video.onended = () => {
            videoWrap.classList.remove('active');
            video.controls = false;
        }
    })

    
})