const childrenOfA = document.querySelectorAll(".childOfA");
const childrenOfB = document.querySelectorAll(".childOfB");
const ansx = document.querySelector("#valuex");
const ansy = document.querySelector("#valuey");
const ansz = document.querySelector("#valuez");
const solveBtn = document.querySelector(".solve");
const v1=document.getElementById("v1");
const v2=document.getElementById("v2");
const r1=document.getElementById("r1");
const r2=document.getElementById("r2");
const r3=document.getElementById("r3");
const r4=document.getElementById("r4");
const r5=document.getElementById("r5");

// const diav1=document.querySelectorAll(".v1");
// const diav2=document.querySelectorAll(".v2");
// const diar1=document.querySelectorAll(".r1");
// const diar2=document.querySelectorAll(".r2");
// const diar3=document.querySelectorAll(".r3");
// const diar4=document.querySelectorAll(".r4");
// const diar5=document.querySelectorAll(".r5");

function inputConsist(node){
    let value = node.value;
    let pair = document.querySelectorAll("."+node.classList[0]);
    pair[0].value=value;
    pair[1].value=value;
    console.log(pair[0]);
}

const eqDisplayBox=document.getElementById("current-equation");
let V1,V2,R1,R2,R3,R4,R5;

let matrixA = [[0,0,0],[0,0,0],[0,0,0]];
let matrixB = [];
let Aarray = [];

console.log(...childrenOfA);

console.log(v1);

function format(n,current,isFirst) {
    if(n==0) return "";
    if(n==1||n==-1) return (n>0?'+ ':' - ') +"\t\t"+"I<sub>"+current+"</sub>"+"\t\t";
    if(n>0 && isFirst)return Math.abs(n) + "I<sub>"+current+"</sub>";
    return (n>0?'+ ':' - ') +"\t\t"+ Math.abs(n) + "I<sub>"+current+"</sub>"+"\t\t";
}

function generateEquation(){
    V1=+v1.value;
    V2=+v2.value;
    R1=+r1.value;
    R2=+r2.value;
    R3=+r3.value;
    R4=+r4.value;
    R5=+r5.value;
    A11=R1+R2;
    A12=-R1;
    A13=-R2;
    A21=-R1;
    A22=R1+R2+R3;
    A23=-R3;
    A31=-R2;
    A32=-R3;
    A33=R2+R3+R5;
    B11=V1-V2;
    B21=0;
    B31=V2;
    let displayEquation = "Eq(1)==>\t\t"+format(A11,1,true)+format(A12,2,false)+format(A13,3,false)+"\t=\t"+B11;
    displayEquation = displayEquation +"<br>"+"Eq(2)==>\t"+format(A21,1,true)+format(A22,2,false)+format(A23,3,false)+"\t=\t"+B21;
    displayEquation = displayEquation + "<br>"+"Eq(3)==>\t"+format(A31,1,true)+format(A32,2,false)+format(A33,3,false)+"\t=\t"+B31;
    // let displayEquation = A11+"I<sub>1</sub> "+ addSign(A12) + "I<sub>2</sub>"+addSign(A13)+"I<sub>3</sub>";
    console.log(displayEquation);
    eqDisplayBox.innerHTML=displayEquation;
    //place on Matrix
    Aarray=[A11,A12,A13,A21,A22,A23,A31,A32,A33];
    // matrixA[[A11,A12,A13],[A21,A22,A23],[A32,A32,A33]]
    matrixB=[B11,B21,B31];

    childrenOfA.forEach(childOfA=>{
        childOfA.value = Aarray.shift();
    });
    childrenOfB.forEach(childOfB=>{
        childOfB.value = matrixB.shift();
    })
}

function run(){
    Aarray = [];
    matrixB=[];
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
    let detA =findDet(matrixA);
    let detAx=findDet(matrixAx);
    let detAy=findDet(matrixAy);
    let detAz=findDet(matrixAz);
    ansx.textContent=(detA==0?"Invalid Input":(detAx/detA));
    ansy.textContent=(detA==0?"Invalid Input":(detAy/detA));
    ansz.textContent=(detA==0?"Invalid Input":(detAz/detA));
    console.log(findDet(matrixA));
    console.log(findDet(matrixAx));
    console.log(findDet(matrixAy));
    console.log(findDet(matrixAz));
    console.table(matrixA);
}

function addToMatrix3by3(matrix,arr){
    matrix = [  [arr[0],arr[1],arr[2]],
                [arr[3],arr[4],arr[5]],
                [arr[6],arr[7],arr[8]]];
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