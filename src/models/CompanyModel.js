import UserModel from './UserModel';

class CompanyModel extends UserModel {

    constructor() {
        super();
        this.rut = '';
        this.businessName = '';
        this.area = '';
        this.logo = '';
        this.description = '';
        this.address = '';
        this.location = [];
    }

    setRut(rut) { this.rut = rut; }
    getRut() { return this.rut; }

    // razon social
    setBusinessName(businessName) { 
        this.businessName = businessName;
    }
    getBusinessName() { return this.businessName; }

    // rubro
    setArea(area) { this.area = area; }
    getArea() { return this.area; }

    setLogo(logo) { this.logo = logo; }
    getLogo() { return this.logo; }

    setDescription(description) { 
        this.description = description; 
    }
    getDescription() { return this.description; }

    setAddress(address) { this.address = address; }
    getAddress() { return this.address; }

    setLocation(location) { this.location = location; }
    getLocation() { return this.location; }  
}

export default CompanyModel;