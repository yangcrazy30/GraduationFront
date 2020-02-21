import axios from "@/utils/axios"

export function getResourceTree(courseId) {
    return axios.get("/resource/resource", {
        params: {
            courseId: courseId
        }
    });
}

export function addNewFolder(folderInfo) {
    return axios.post("/resource/folder", {
        path: folderInfo.path,
        courseId: folderInfo.courseId,
        folderName: folderInfo.folderName
    })
}

export function preUpload(fileInfo) {
    return axios.post("/resource/preUpload", {
        path: fileInfo.path,
        courseId: fileInfo.courseId,
        fileName: fileInfo.fileName,
        fileType: fileInfo.type
    })
}

export function preRemove(fileInfo) {
    return axios.post("/resource/preRemove", {
        path: fileInfo.path,
        courseId: fileInfo.courseId,
        fileName: fileInfo.fileName,
    })
}