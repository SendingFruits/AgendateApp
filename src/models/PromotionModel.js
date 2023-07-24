class PromotionModel {

    constructor() {
        this.title = '';
        this.description = '';
        this.inicio = new Date();
        this.fin = new Date();
        this.interval = 1;
    }
    
    setTitle(title) { this.title = title; }
    getTitle(photo) { return this.title; }

    setDescription(description) { 
        this.description = description; 
    }
    getDescription(description) { return this.description; }
    
    setInicio(fechaInicio) {
        if (fechaInicio instanceof Date) {
            this.inicio = fechaInicio;
        } else {
            throw new Error('Fecha Invalida');
        }
    }
    getInicio() { return this.inicio; }

    setFin(fechaFin) {
        if (fechaFin instanceof Date) {
            this.fin = fechaFin;
        } else {
            throw new Error('Fecha Invalida');
        }
    }
    getFin() { return this.fin; }

    setInterval(interval) { this.interval = interval; }
    getInterval(interval) { return this.interval; }
}
  
export default PromotionModel;