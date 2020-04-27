// event model based on google api response values
class Event {
    constructor(id, creator_email, description, end__dateTime, start__dateTime, summary, location) {
        this.id = id;
        this.creator_email = creator_email;
        this.description = description;
        this.end__dateTime = end__dateTime;
        this.start__dateTime = start__dateTime;
        this.summary = summary;
        this.location = location;
    }
}

export default Event;
