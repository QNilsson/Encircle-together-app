// publication model based on issuu api response values
class Publication {
    constructor(docId, publicationId, title, name, description, publishDate) {
        this.docId = docId;
        this.publicationId = publicationId;
        this.title = title;
        this.name = name;
        this.description = description;
        this.publishDate = publishDate;
    }
}

export default Publication;
