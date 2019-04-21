export class FeedModel {
    url: string = '';
    title: string = '';
    link: string = '';
    author: string = '';
    description: string = '';
    image: string = '';
}

export class FeedItemModel {
    title: string = '';
    pubDate: string = '';
    link: string = '';
    guid: string = '';
    author: string = '';
    thumbnail: string = '';
    content: string = '';
    enclosure: {
        thumbnail: ''
    }
    description: string = '';
    image: string = '';
    categories: [];
}