import dayjs from "dayjs"

class match {
    constructor(id,date, user_id) {
        this.id=id
        this.date = date;
        this.user_id = user_id;
    }
}

class roundRecording {
    constructor(cap, img, score) {
        this.cap = cap;
        this.img=img;
        this.score=score;
    }
}

export {match,roundRecording}