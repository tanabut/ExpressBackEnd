var {Variable,Propagation} = require('../models');

var ForwardAndBackPropagation = function(parameters) {
    let results = [];
    let resultvariables = [];
    let propagations = initPropagation(parameters);
    let reversepropagations = [...propagations].reverse();
    const length = propagations.length - 1;

    reversepropagations.forEach((propagation, n) => {
        if(n === 0)
            return false;
        const nextpropagation = reversepropagations[n-1];
        if(isNaN(propagation.value) && !isNaN(nextpropagation.value)){
            const {resultpropagation, variable} = backward(n, reversepropagations);
            reversepropagations[n] = resultpropagation;
            propagations[length-n] = resultpropagation;
            resultvariables.push(variable);
        }
    });

    propagations.forEach((propagation, n) => {
        const prepropagation = propagations[n-1];
        if(isNaN(propagation.value) && !isNaN(prepropagation.value)){
            const {resultpropagation, variable} = forward(n, propagations);
            propagations[n] = resultpropagation;
            resultvariables.push(variable);
        }
    });
    propagations.forEach(propagation => {
        results.push(Number(propagation.value));
    });

    resultvariables.sort(function (a, b) {
        return a.value - b.value;
    });
    return {results, resultvariables};
};

var initPropagation = function(parameters) {
    const continuous = findContinuous(parameters);
    const dimensions1 = Dimension(continuous);
    const dimensions2 = Dimension(dimensions1);
    let countD1 = 0;
    let countD2 = 0;
    let propagations = [];
    for (const [index, value] of parameters.entries()) {
        let propagation = [];
        if(!isNaN(value)){
            const dimension1 = dimensions1[countD1++] || findDimension1(propagations[index-1]);
            const dimension2 = dimensions2[countD2++] || findDimension2(propagations[index-1]);
            propagation = new Propagation(value, dimension1, dimension2);
        }else{
            propagation = new Propagation(value, undefined, undefined);
        }
        
        propagations.push(propagation);
    }
    return propagations;
};

var findContinuous = function(parameters) {
    const continuous = parameters.filter(item => !isNaN(item));
    return continuous;
};

var Dimension = function(parameters) {
    let dimension = [];
    for (const [index, value] of parameters.entries()) {
        if(index != parameters.length-1)
            dimension.push(parameters[index+1] - value);
    }
    return dimension;
};

var findDimension1 = function(prepropagation) {
    const dimension1 = prepropagation.dimension1+prepropagation.dimension2;
    return dimension1;
};

var findDimension2 = function(prepropagation) {
    const dimension2 = prepropagation.dimension2;
    return dimension2;
};

var forward = function(n, propagations) {
    const prepropagation = propagations[n-1];
    const thispropagation = propagations[n];
    const resultpropagation = new Propagation(
                                            Number(prepropagation.value) + prepropagation.dimension1, 
                                            prepropagation.dimension1 + prepropagation.dimension2, 
                                            prepropagation.dimension2
                                        );
    const variable = new Variable(thispropagation.value, resultpropagation.value);
    return {resultpropagation, variable};
};

var backward = function(n, propagations) {
    const nextpropagation = propagations[n-1];
    const thispropagation = propagations[n];
    const resultpropagation = new Propagation(
                                            Number(nextpropagation.value) - (nextpropagation.dimension1 - nextpropagation.dimension2), 
                                            nextpropagation.dimension1 - nextpropagation.dimension2, 
                                            nextpropagation.dimension2
                                        );
    const variable = new Variable(thispropagation.value, resultpropagation.value);
    return {resultpropagation, variable};
};

module.exports = {
    ForwardAndBackPropagation
};