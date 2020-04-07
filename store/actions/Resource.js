import Publication from '../../models/publication';
export const FETCH_RESOURCES = 'FETCH_RESOURCES';

export const fetchResources = () => {
  return async dispatch => {
    const url = `http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=bmcyheq8ih6qlsr0ktxgzsfppzkjruw2&format=json&pageSize=3&signature=e77d6d7be1cc2ababc1494319f9a0743`

    const response = await fetch(url);
    const resData = await response.json();
    const items = resData.rsp._content.result._content;
    const publicationData = [];

    for(const key in items) {
      publicationData.push(
        new Publication(
          items[key].document.documentId,
          items[key].document.publicationId,
          items[key].document.title,
          items[key].document.name,
          items[key].document.description,
          items[key].document.publishDate
        )
      );
    }

    // for (const i in publicationData) {
    //   console.log(publicationData[i])
    // }

    dispatch({ type: FETCH_RESOURCES, resources: publicationData });
  }
};