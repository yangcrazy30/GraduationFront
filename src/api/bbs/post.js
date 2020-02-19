import axios from "@/utils/axios";

export function getPost(config, postid) {
    return axios.get("/bbs/posts", {
        params: {
            config: config,
            postid: postid
        }
    });
}

export function newPost(post) {
    return axios.post("/bbs/post", {
        title: post.title,
        content: post.content,
    })
}

export function getPostCount() {
    return axios.get("/bbs/count");
}

export function getPostById(id) {
    return axios.get("/bbs/post", {
        params: {
            id: id
        }
    })
}