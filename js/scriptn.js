// const some = ['dfdg',5,7];
// console.log(some.every(item=> typeof(item ==='number')))
// const arr =[5,1,2,3,4,5];
// const res= arr.reduce((sum,current)=>sum+current);
// console.log(res)
// const arr =['apple','pear','plum'];
// const res= arr.reduce((sum,current)=>`${sum}, ${current}`);
// console.log(res)
const obj ={
   ivan:'person',
   ann:'person',
   dog:'animal',
   cat:'animal'
};
const newArr = Object.entries(obj)
.filter(item=>item[1]=== 'person')
.map(item => item[0]);
console.log(newArr);