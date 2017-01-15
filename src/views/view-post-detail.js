(function (app) {
    let ViewBase = app.views.ViewBase;
    class ViewPostsDetail extends ViewBase {
        constructor() {
            super();
            this.tpl = document.querySelector("#view-post-detail-tpl");
            this.container = document.querySelector(".view-posts-container")
        }
        preRender(post) {
            this.render(post, this.tpl.innerHTML, this.container);
            this.btnAddComment = this.container.querySelector(".btn-add-comment");
            this.btnAddComment.addEventListener("click", () => {
               this.sendAddCommentEvent(post);
            });
        }
        
        sendAddCommentEvent(post) {
            document.dispatchEvent(new CustomEvent (
                "add-comment",
                {detail: post}
            
            ));
        }
    }
    app.views.ViewPostsDetail = ViewPostsDetail;
})(App);