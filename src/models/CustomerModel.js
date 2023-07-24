class CustomerModel extends UserModel {

    constructor() {
        super();
        this.photo = '';
        this.document = '';
    }
  
    setPhoto(photo) { this.photo = photo; }
    getPhoto(photo) { return this.photo; }

    setDocument(document) { this.document = document; }
    getDocument(document) { return this.document; }
}
  
export default CustomerModel;