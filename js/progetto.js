var duration =1500;
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1100 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



function init(data) {
    var x=0;                      //coordinate di partenza per ogni albero
    var y=65;                     // l'altezza sarà la stessa per tutti gli alberi

    for (let i = 0; i < data.length; i++) {
        draw(data[i], i, x, y);    //disegna gli alberi
        x+=100;                    // ogni albero è distanziato di 100
    }


    //SELEZIONE E ORDINAMENTO DEL TRONCO

    d3.selectAll('.tronco').on("click", function () {
        var tronchi = d3.selectAll(".tronco").selectAll("__data__")._parents;

        var altezze_tronchi = []
        var dataSet = []
        for (let i = 0; i < tronchi.length; i++) {
            dataSet.push(tronchi[i].__data__)
            altezze_tronchi.push(tronchi[i].__data__.altezzaTronco)
        }
        altezze_tronchi.sort(d3.ascending);

        var position =[];
        for (let i = 0; i < altezze_tronchi.length; i++) {
            for (let j = 0; j < dataSet.length; j++) {
                if(dataSet[i].altezzaTronco === altezze_tronchi[j]){
                    position[i]=j;
                }
            }
        }

        for(let i=0; i <position.length;i++){
            d3.selectAll("#albero"+i).selectAll(".albero").transition().duration(duration)
                .attr("transform" , "translate(" + (-(i*100) + (position[i]*100)) + ",0)");
        }
    })


    //SELEZIONE E ORDINAMENTO DELLA CHIOMA

    d3.selectAll('.chioma').on("click", function () {
        var chiome = d3.selectAll(".chioma").selectAll("__data__")._parents;

        var grandezze_chiome = []
        var dataSet = []
        for (let i = 0; i < chiome.length; i++) {
            dataSet.push(chiome[i].__data__)
            grandezze_chiome.push(chiome[i].__data__.grandezzaChioma)
        }
        grandezze_chiome.sort(d3.ascending);

        var position =[];
        for (let i = 0; i < grandezze_chiome.length; i++) {
            for (let j = 0; j < dataSet.length; j++) {
                if(dataSet[i].grandezzaChioma === grandezze_chiome[j]){
                    position[i]=j;
                }
            }
        }

        for(let i=0; i <position.length;i++){
            d3.selectAll("#albero"+i).selectAll(".albero").transition().duration(duration)
                .attr("transform" , "translate(" + (-(i*100) + (position[i]*100)) + ",0)");
        }
    })



    //SELEZIONE E ORDINAMENTO DEI FRUTTI, SIA PER FRUTTO1 CHE PER FRUTTO2

    d3.selectAll('.frutto').on("click", function () {
        var frutti1 = d3.selectAll(".frutto1").selectAll("__data__")._parents;

        var grandezze_frutti1 = []
        var dataSet = []
        for (let i = 0; i < frutti1.length; i++) {
            dataSet.push(frutti1[i].__data__)
            grandezze_frutti1.push(frutti1[i].__data__.dimensioneFrutti)
        }
        grandezze_frutti1.sort(d3.ascending);


        var position = [];
        for (let i = 0; i < grandezze_frutti1.length; i++) {
            for (let j = 0; j < dataSet.length; j++) {
                if (dataSet[i].dimensioneFrutti === grandezze_frutti1[j]) {
                    position[i] = j;
                }
            }
        }

        for (let i = 0; i < position.length; i++) {
            d3.selectAll("#albero" + i).selectAll(".albero").transition().duration(duration)
                .attr("transform", "translate(" + (-(i * 100) + (position[i] * 100)) + ",0)");
        }
    })



    //SELEZIONE E ORDINAMENTO DELLE RADICI, SIA PER RADICE SINISTRA CHE DESTRA

    d3.selectAll('.radice').on("click", function () {
        var radiciSx = d3.selectAll(".radiceSx").selectAll("__data__")._parents;

        var grandezze_radiciSx = []
        var dataSet = []
        for (let i = 0; i < radiciSx.length; i++) {

            dataSet.push(radiciSx[i].__data__)
            grandezze_radiciSx.push(radiciSx[i].__data__.grandezzaRadici)
        }
        grandezze_radiciSx.sort(d3.ascending);

        var position =[];
        for (let i = 0; i < grandezze_radiciSx.length; i++) {
            for (let j = 0; j < dataSet.length; j++) {
                if(dataSet[i].grandezzaRadici === grandezze_radiciSx[j]){
                    position[i]=j;
                }
            }
        }

        for(let i=0; i <position.length;i++){
            d3.selectAll("#albero"+i).selectAll(".albero").transition().duration(duration)
                .attr("transform" , "translate(" + (-(i*100) + (position[i]*100)) + ",0)");
        }

    })



}

//DISEGNO ALBERO
function draw(data, i, x, y) {
    albero = svg.append("g");

    albero.selectAll("albero.chioma") //disegno chioma
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "albero chioma")
        .attr("cx", function (d) {
            return (x + d.altezzaTronco / 12)
        })
        .attr("cy", function() {return y})
        .attr("r", function (d) {
            return d.grandezzaChioma
        })
        .attr("fill", "#7cb342")


    albero.selectAll("albero.tronco")  //disegno tronco
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "albero tronco")
        .attr("x", function() {return x})
        .attr("y", function() {return y})
        .attr("width", function (d) {
            return (d.altezzaTronco / 6)
        })
        .attr("height", function (d) {
            return d.altezzaTronco
        })
        .attr("fill", "#795548")


    albero.selectAll("albero.frutto1") //disegno frutto1
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "albero frutto frutto1")
        .attr("cx", function (d) {
            return (x + d.altezzaTronco / 3)
        })
        .attr("cy", function () {
            return (y * 0.9)
        })
        .attr("r", function (d) {
            return d.dimensioneFrutti
        })
        .attr("fill", "#d50000")


    albero.selectAll("albero.frutto2") //disegno frutto2
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "albero frutto frutto2")
        .attr("cx", function (d) {
            return (x + d.altezzaTronco / 12)
        })
        .attr("cy", function () {
            return y
        })
        .attr("r", function (d) {
            return d.dimensioneFrutti
        })
        .attr("fill", "#d50000")


    albero.selectAll("albero.radiceSx") //disegno radice sinistra
        .data(data)
        .enter()
        .append("line")
        .attr("class", "albero radice radiceSx")
        .style("stroke-width", 2)
        .style("stroke", "#795548")
        .attr("x1", function () {
            return (x)
        })
        .attr("y1", function (d) {
            return (y + d.altezzaTronco)
        })
        .attr("x2", function (d) {
            return (x - d.altezzaTronco / 6)
        })
        .attr("y2", function (d) {
            return (y + d.altezzaTronco + d.grandezzaRadici * 1.2)
        })


    albero.selectAll("albero.radiceDx") //disegno radice destra
        .data(data)
        .enter()
        .append("line")
        .attr("class", "albero radice radiceDx")
        .style("stroke-width", 2)
        .style("stroke", "#795548")
        .attr("x1", function (d) {
            return (x + d.altezzaTronco / 6)
        })
        .attr("y1", function (d) {
            return (y + d.altezzaTronco)
        })
        .attr("x2", function (d) {
            return (x + d.altezzaTronco / 3)
        })
        .attr("y2", function (d) {
            return (y + d.altezzaTronco + d.grandezzaRadici * 1.2)
        })

    albero.attr("id", "albero" + i);

}

d3.json("data/dataSet.json")
    .then((data) => {
        init(data)
    })



