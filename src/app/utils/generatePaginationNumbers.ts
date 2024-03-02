 
export const generatePagination = (currentPage:number,totalPage:number) =>{
    // si el numero total de paginas es 7 o menos
    //vamos a mostrar todas las paginas sin puntos suspensivos

    if(totalPage<=7){
        return Array.from({length:totalPage},(_,i)=> i + 1)
    }

    // si la pagina actual esta entre las primeras 3 paginas 
    // mostrar las primeras 3, puntos suspensivos, y las ultimas 2

    if(currentPage <=3){
        return [1,2,3,'...',totalPage-1,totalPage]; //
    }
    // si la pagina actual esta entre las ultimas 3 paginas
    // mostrar las primeras 2, puntos suspensivos, las ultimas 3 paginas
    if(currentPage >= totalPage -2){
        return [1,2,'...',totalPage-2,totalPage-1,totalPage];
    }

    // si la pagina actual esta en otro lugar 
    // mostrar la primera pagna, puntos suspensivos, la pagina actual y vecinos

    return[
        1,
        '...',
        currentPage-1,
        currentPage,
        currentPage+1,
        '...',
        totalPage
    ]
}