let steps = [16000,12000,8000,4000,2000,1000,500,250,100,50,25,10,5,2,1];
let totalSteps = 0;
console.log(steps.length);


for (let i = 0; i < steps.length; i++) {
    totalSteps += steps[i];
}

console.log("Total Steps: " + totalSteps);