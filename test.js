/**
 * Created by Zaur_Ismailov on 4/20/2017.
 */

let gen = require("./gen");

let testPopulation = [
    [9,10,11,12],
    [13,14,15,16],
    [17,18,19,20],
    [21,22,23,24],
    [25,26,27,28],
    [29,30,31,32]
];

exports.testSampleGenerator = function(test) {
    //test.expect(1);
    let sample = gen.generateSample();
    let wrongData =  sample.find(v => v > 30 || v < 0);

    test.ok(sample.length === 4, "Length Ok");
    test.ok(!wrongData, "from 0 to 30");
    test.done();
};

exports.testRandom = (test) => {
    let number = gen.random(1,30);
    test.ok(number > 0 && number <= 30);
    test.done();
};

exports.testPopulationGenerator = function(test) {
    let amount = 5;
    let population = gen.generatePopulation(amount);

    test.ok(population.length === amount, "Amount of samples");
    test.ok(!population.find(v => v.length !== 4), "All samples are correct");

    test.done();
};

exports.testCheckingSampleSurvivalRate = function(test) {
    let sample = [1,2,3,4];
    let survivalRate = gen.checkSampleSurvivalRate(sample);

    test.ok(survivalRate === 0, "Etalon");

    test.done();
};

exports.testCheckingSurvivalPercents = function(test) {
    let amount = testPopulation.length;
    let survivalPercents = gen.checkSurvivalPercents(testPopulation);

    test.ok(survivalPercents.length === amount, "Correct amount");

    test.done();
};

exports.testTournament = function(test) {
    let arr = gen.tournament(testPopulation, 2);

    test.ok(arr.length === 3, "Correct amount of tournament winners");

    test.done();
};

exports.testGeneratingChildren = function(test) {
    let newPopulation = gen.generateChildren(testPopulation[0],testPopulation[1]);

    test.ok(newPopulation.length === 8, "Correct amount of new population");

    test.done();
};

exports.testGeneratePopulationByParents = function(test) {
    let newPopulation = gen.generatePopulationByParents(testPopulation);

    test.ok(newPopulation.length === 40, "Exist");

    test.done();
};

exports.testGettingGroupCntForTournament = function(test) {
    let groupCnt = gen.getGroupCntForTournament(testPopulation);

    test.ok(groupCnt === 2, "Correct amount of items in a group");

    test.done();
};

exports.testRun = function(test) {
    let result = gen.findSolution(2);

    test.ok(result.sample.length === 4, `Found result by ${result.counter} steps`);

    test.done();
};