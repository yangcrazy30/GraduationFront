import axios from "@/utils/axios"

export function addNewHomeWork(homework) {
    return axios.post("/homework/newhomework", {
        name: homework.name,
        courseId: homework.courseId,
        startTime: homework.startTime,
        endTime: homework.endTime,
        questions: homework.questions
    })
}

export function getHomework(courseId) {
    return axios.get("/homework/homework", {
        params: {
            courseId: courseId
        }
    })
}

export function getHomeworkById(homeworkId) {
    return axios.get("/homework/getbyid", {
        params: {
            homeworkId: homeworkId
        }
    })
}

export function submitHomework(homework) {
    return axios.post("/homework/submit", {
        homeworkId: homework.homeworkId,
        grade: homework.grade,
    })
}

export function getHomeWorkSatus(homeworkId) {
    return axios.get("homework/status", {
        params: {
            homeworkId: homeworkId,
        }
    })
}