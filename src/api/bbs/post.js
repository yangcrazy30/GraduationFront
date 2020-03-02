import axios from "@/utils/axios";

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

export function getSearchPost(config, title) {
    return axios.get("/bbs/search", {
        params: {
            config: config,
            title: title
        }
    })
}