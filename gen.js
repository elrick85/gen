/**
 * Created by Zaur_Ismailov on 4/20/2017.
 */


// a, b, c, d
// a+2b+3c+4d=30
module.exports = {

    propertiesCnt: 4,

    propertyValueRange: [1, 30],

    findSolution: function(startAmount) {
        let counter = 0;

        let run = (population) => {
            let groupCnt = this.getGroupCntForTournament(population);
            //let groupCnt = 2;
            let tournamentRate = this.tournament(population, groupCnt);
            let result = tournamentRate.find(v => v.rate === 0);

            counter++;

            if (!result) {
                let parents = tournamentRate.map(v => v.sample);
                let _population = this.generatePopulationByParents(parents, []);
                let amountOfMutants = Math.ceil(_population.length / groupCnt);

                while(amountOfMutants--) {
                    _population.push(this.generateSample());
                }

                return run(_population);
            } else {
                return result;
            }
        };

        let r = run(this.generatePopulation(startAmount));

        return {
            sample: r.sample,
            counter: counter
        }
    },

    generatePopulation: function(amount) {
        let arr = [];

        while(amount--) {
            arr.push(this.generateSample());
        }

        return arr;
    },

    generatePopulationByParents: function generate(samples, newArr) {
        if (samples.length <= 1) {
            return newArr;
        }

        newArr = newArr || [];

        let _samples = samples.slice();
        let item = _samples.splice(0, 1);

        _samples.forEach((v, i) => {
            newArr = [].concat(newArr, this.generateChildren(item[0], v));
        });

        generate.call(this, _samples, newArr);

        return newArr;
    },

    generateChildren: function(sample1, sample2) {
        let arr = [];

        sample1.forEach((v, i) => {
            let _arr = sample2.slice();
            _arr.splice(i, 1, v);
            arr.push(_arr);
        });

        sample2.forEach((v, i) => {
            let _arr = sample1.slice();
            _arr.splice(i, 1, v);
            arr.push(_arr);
        });

        return arr;
    },

    checkSurvivalPercents: function(population) {
        let rates = population.map(v => {
            let rate = this.checkSampleSurvivalRate(v);

            if (rate === 0) {
                return 0;
            }

            return 1 / rate
        });

        let invertRate = rates.reduce((res, v) => {
            return res + v;
        }, 0);

        return rates.map(v => (v / invertRate) * 100);
    },

    getGroupCntForTournament: function(population) {
        return parseInt((population.length / 3).toFixed());
    },

    tournament: function(population, size) {
        let arr = [];
        let _population = population.slice();
        let normalSize = parseInt((_population.length / size).toFixed());

        while(_population.length) {
            let tournamentRate = _population
                .splice(0, size)
                .map(v => this.createRatedSample(v))
                .reduce((res, v) => {
                    let newVar = (res.rate === undefined || res.rate >= v.rate) ? v : res;
                    return newVar;
                }, {});

            arr.push(tournamentRate);
        }

        return arr;
    },

    generateSample: function() {
        let i = this.propertiesCnt;
        let arr = [];

        while(i--) {
            let number = this.random.apply(this, this.propertyValueRange);
            arr.push(number)
        }

        return arr;
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    checkSampleSurvivalRate: function(sample) {
        return Math.abs(this.calcByFormula(sample) - 30);
    },

    calcByFormula: function(sample) {
        return sample[0] + 2 * sample[1] + 3 * sample[2] + 4 * sample[3];
    },

    createRatedSample: function(sample) {
        let rate = this.checkSampleSurvivalRate(sample);

        return {
            sample: sample,
            rate: rate
        }
    }
};