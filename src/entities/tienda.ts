
export namespace Tiendas {

    export  interface ITiendaCollection {
        value: ITienda[];
    }
    
    export interface ITienda {
        Title: string;
        key: number;
        FechaApertura: Date;
        // ...Aquí las propiedades
    }

}