
export namespace Tiendas {

    export  interface ITiendaCollection {
        value: ITienda[];
    }
    
    export interface ITienda {
        Title: string;
        Id: number;
        key: number;
        FechaApertura: Date;
        // ...Aquí las propiedades
    }

}