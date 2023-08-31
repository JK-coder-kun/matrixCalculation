const childrenOfA = document.querySelectorAll(".childOfA");
const childrenOfB = document.querySelectorAll(".childOfB");
const ansx = document.querySelector("#valuex");
const ansy = document.querySelector("#valuey");
const ansz = document.querySelector("#valuez");
const solveBtn = document.querySelector(".solve");
console.log(...childrenOfA);

function run(){
    let matrixA = [[0,0,0],[0,0,0],[0,0,0]];
    let matrixB = [];
    let Aarray = [];
    childrenOfA.forEach(childOfA=>{
        Aarray.push(childOfA.value==''?0:childOfA.value);
    });
    childrenOfB.forEach(childOfB=>{
        matrixB.push(childOfB.value==''?0:childOfB.value);
    });
    matrixA=addToMatrix3by3(matrixA,Aarray);
 

    let matrixAx=changeColumn(matrixA,matrixB,0);
    let matrixAy=changeColumn(matrixA,matrixB,1);
    let matrixAz=changeColumn(matrixA,matrixB,2);
    let detA = findDet(matrixA);
    let detAx=findDet(matrixAx);
    let detAy=findDet(matrixAy);
    let detAz=findDet(matrixAz);
    ansx.textContent=(detAx/detA);
    ansy.textContent=(detAy/detA);
    ansz.textContent=(detAz/detA);
    console.log(findDet(matrixA));
    console.log(findDet(matrixAx));
    console.log(findDet(matrixAy));
    console.log(findDet(matrixAz));
    console.table(matrixA);
}

function addToMatrix3by3(matrix,arr){
    matrix = [  [+arr[0],+arr[1],+arr[2]],
                [+arr[3],+arr[4],+arr[5]],
                [+arr[6],+arr[7],+arr[8]]];
    return matrix;
}
function findDet(matrix){
    return (matrix[0][0]*matrix[1][1]*matrix[2][2]+
            matrix[0][1]*matrix[1][2]*matrix[2][0]+
            matrix[0][2]*matrix[1][0]*matrix[2][1]-
            (matrix[0][2]*matrix[1][1]*matrix[2][0]+
            matrix[0][1]*matrix[1][0]*matrix[2][2]+
            matrix[0][0]*matrix[1][2]*matrix[2][1]));
}
function changeColumn(matrixHost,matrixPara,pos){
    let matrixAxx = matrixHost.map(row=>row.slice());
    for(let i=0;i<matrixPara.length;i++){
        matrixAxx[i][pos]=matrixPara[i];
    }
    return matrixAxx;
}
// function addToMatrix3by1(matrix,arr){
//     matrix = [arr[0],arr[1],arr[2]];
//     return matrix;
// }