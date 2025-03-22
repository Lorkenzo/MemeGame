import dayjs from "dayjs"

class match {
    constructor(id, user_id) {
        this.id=id;
        this.date = date;
        this.user_id = user_id;
    }
}

class roundRecording {
    constructor(cap, img, score, color) {
        this.cap = cap;
        this.img=img;
        this.score=score;
        this.color=color;
    }
}

export {match,roundRecording}