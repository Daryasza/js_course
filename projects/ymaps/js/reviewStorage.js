const CryptoJS = window.crypto;

export default class ReviewStorage {
  constructor() {
    this.itemName = 'reviewStore';
    try {
      // TODO: check that this.data is Object
      this.data = JSON.parse(window.localStorage.getItem(this.itemName));
    } catch (e) {
      this.data = {};
    }
    if (!this.data) this.data = {};
  }

  setData() {
    // TODO: check that this.data is Object
    window.localStorage.setItem(this.itemName, JSON.stringify(this.data));
  }

  addReview(coords, review) {
    const key = coords.toString();
    const hash = this.hashObject(review);
    if (!this.data[key]) this.data[key] = {};
    this.data[key][hash] = review;
    this.setData();
  }

  getReviews(coords) {
    const key = coords.toString();

    return this.data[key] ? Object.values(this.data[key]) : [];
  }

  getReviewMap() {
    const reviewMap = this.data;
    Object.keys(reviewMap).forEach((key) => {
      reviewMap[key] = Object.values(reviewMap[key]);
    });
    return reviewMap;
  }

  removeReview(coords, review) {
    const key = coords.toString();
    const hash = this.hashObject(review);

    if (this.data[key]) delete this.data[key][hash];

    this.setData();
  }

  hashObject(obj) {
    const sorted = JSON.stringify(obj, Object.keys(obj).sort());
    return CryptoJS.MD5(sorted).toString();
  }
}
