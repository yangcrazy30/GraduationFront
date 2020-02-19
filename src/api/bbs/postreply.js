import axios from "@/utils/axios";


export function getReply(config, postid) {
    return axios.get("/bbs/reply", {
        params: {
            config: config,
            postid: postid
        }
    });
}

export function getReplyCount(postid) {
    return axios.get("/bbs/rcount", {
        params: {
            postid: postid
        }
    })
}

export function replyPost(replyinfo) {
    return axios.post("/bbs/reply", {
        replyinfo: replyinfo
    })
}