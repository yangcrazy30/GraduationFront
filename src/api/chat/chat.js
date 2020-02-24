import axios from "@/utils/axios";

export function sendMessage(fromId, toId, message) {
    return axios.post("/chat/send", {
        fromId: fromId,
        toId: toId,
        message: message
    })
}

export function getMessage(fromId, toId) {
    return axios.get("/chat/receive", {
        params: {
            fromId: fromId,
            toId: toId
        }
    })
}

export function getSender(toId) {
    return axios.get("/chat/sender", {
        params: {
            toId: toId
        }
    })
}