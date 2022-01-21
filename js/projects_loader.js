
jQuery(document).ready(function(){
    render_projects(projects_obj);

    // $(document).on('click', '.tag', function(){
    //     var filtered_data = [];
    //     for(i in data){
    //         var contains = false;
    //         for(j in data[i].tags){
    //             if(data[i].tags[j] == $(this).text()){
    //                 contains = true;
    //             }
    //         }
    //         if(contains)filtered_data.push(data[i]);
    //     }
    //     clear_projects();
    //     render_projects(filtered_data);
    //     $('html, body').animate({
    //         scrollTop: $("#"+filtered_data[0].id+"_page").offset().top
    //     }, 1000);
    // });
});

function clear_projects(){
    $("#projects").empty();
    $("#spacer").remove();
}

function render_projects(data){
    for(var i=0;i<data.length;i++){

        $(".projects").append(`<div class="project flex">
                                <div class="fl1">
                                <img src="${data[i].image}" alt="" class="project_img">
                                </div>
                                <div class="fl1">
                                <div class="content m-center fadein">
                                    <h1>${data[i].title}</h1>
                                    <p>${data[i].summary}  <a href="${data[i].link}" class="project_link">Read more...</a></p>
                                
                                    <br style="clear:both" />
                                    <div id="tags_${data[i].id}" class="tags fadein">
                                    </div>
                                    <br style="clear:both" />
                                </div> 
                                </div>
                            </div>`);
    for(var j=0;j<data[i].tags.length;j++){
        $("#tags_"+data[i].id).append(`<div class="tag"><p class="technology_tag">${data[i].tags[j]}</p></div>`);
    }
    }

}
