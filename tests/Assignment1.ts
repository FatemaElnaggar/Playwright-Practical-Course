const Mybrowswers = ["chromium", "firefox", "webkit"];
for ( browser of Mybrowswers) {
    console.log ( browser === Mybrowswers [Mybrowswers.length-1] ? `last browser is ${browser}` : "" );

}

for (let indeX=0; indeX < Mybrowswers.length; indeX++) {
    console.log (indeX === Mybrowswers.length-1 ? `last browser is ${Mybrowswers[indeX]}` : "" );
}

//priniting last browser in array using for of and for loop