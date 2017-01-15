(function (app) {
    let ViewAddPostForm = app.views.ViewAddPostForm;
    let viewPostsList = new app.views.ViewPostsList();
    let viewPostsDetail = new app.views.ViewPostsDetail();
    let Post = app.models.Post;
    let Comment = app.models.Comment;
    let postsService = new app.services.PostsService();
    let Helpers = app.Helpers;
    class PostController {
        constructor() {
            new ViewAddPostForm();
            this.fetchPosts();
            document.addEventListener("add-post", (data) => {
                let id = Helpers.getRandomId();
                let post = new Post(Object.assign(data.detail, {
                    id
                }));
                postsService.addPost(post, this.fetchPosts);
            });
            document.addEventListener("remove-post", (evt) => {
                postsService.removePost(evt.detail, this.fetchPosts);
            });
            document.addEventListener("add-comment", (evt) => {
                let post = evt.detail;
                post.addComment(new Comment({
                    msg: "hi"
                }));
                postsService.save(viewPostsDetail.preRender(post));
            });
            window.addEventListener("hashchange", (evt) => {
                let id = Helpers.getHash(evt.newURL);
                if (id) {
                    this.getPostById(id);
                }
            });
        }
        getPostById(id) {
            let post = new Post(postsService.getById(id));
            viewPostsDetail.preRender(post);
        }
        fetchPosts() {
            postsService.fetch(viewPostsList.preRender.bind(viewPostsList));
        }
    }
    app.controllers.PostController = PostController;
})(App);