(function (window) {
    function pageCtrl ($scope, $http, $document) {
        const URLS = {
            ADD_TYPE: '../add-type',
            REMOVE_TYPE: '../remove-type',
            UPDATE_TYPE: '../update-type'
        };
        
        var data = {
            found_weaknesses: [],
            selectize_inputs: {
                1: {selectize: {}, options: []},
                2: {selectize: {}, options: []},
                3: {selectize: {}, options: []},
                4: {selectize: {}, options: []},
                5: {selectize: {}, options: []},
                6: {selectize: {}, options: []}
            }, // where the initialized selectize options are stored
            strengths: [],
            type_choices: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: []
            },
            types_config: {
                create: true,
                valueField: 'id',
                labelField: 'type',
                searchField: 'type'
            },
            type_search: '',
            weakness_search: {TYPES: []}
        };

        let selectize_inputs = {
            1: {selectize: {}, options: []},
            2: {selectize: {}, options: []},
            3: {selectize: {}, options: []},
            4: {selectize: {}, options: []},
            5: {selectize: {}, options: []},
            6: {selectize: {}, options: []}
        };

        let pokemon_one = {
            config: {
                create: false,
                delimiter: '|',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[1].selectize = selectize;
                    selectize_inputs[1].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(1, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(1, $item);
                    console.dir(data.type_choices);
                }
            },
            types: [],
            type_search: [],
        };

        let pokemon_two = {
            config: {
                create: false,
                delimiter: '/',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[2].selectize = selectize;
                    selectize_inputs[2].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(2, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(2, $item);
                }
            },
            types: [],
            type_search: [],
        };

        let pokemon_three = {
            config: {
                create: false,
                delimiter: '/',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[3].selectize = selectize;
                    selectize_inputs[3].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(3, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(3, $item);
                }
            },
            types: [],
            type_search: [],
        };

        let pokemon_four = {
            config: {
                create: false,
                delimiter: '/',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[4].selectize = selectize;
                    selectize_inputs[4].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(4, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(4, $item);
                }
            },
            types: [],
            type_search: [],
        };

        let pokemon_five = {
            config: {
                create: false,
                delimiter: '/',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[5].selectize = selectize;
                    selectize_inputs[5].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(5, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(5, $item);
                }
            },
            types: [],
            type_search: [],
        };

        let pokemon_six = {
            config: {
                create: false,
                delimiter: '/',
                valueField: 'id',
                labelField: 'type',
                searchField: 'type',
                maxItems: 2,
                plugins: ['remove_button'],
                onInitialize: function (selectize){
                    // store all the selectize properties
                    selectize_inputs[6].selectize = selectize;
                    selectize_inputs[6].options = selectize.options;
                },
                onItemAdd: function(value, $item) {
                    styleSelectizeOptions($item);
                    populateTypeChoices(6, $item);
                },
                onItemRemove: function (value,$item) {
                    removeTypeChoices(6, $item);
                }
            },
            types: [],
            type_search: [],
        };
        
        const edit = {
            _test: function () {
                console.dir(this.new_type); // debug - remove
            },
            new_type: {
                add: function () {
                    let self = edit.new_type;
                    let formatted_type = {
                        name: self.name,
                        resistances: self.resistances.split(","),
                        strengths: self.strengths.split(","),
                        weaknesses: self.weaknesses.split(","),
                    }
                    $http.post(URLS.ADD_TYPE, formatted_type)
                        .then(function (resp){
                            console.dir(resp.data); // debug - remove
                        }, function (err){
                            console.error(err);  // debug - remove TODO: Add modal error handling
                        })
                },
                name: '',
                resistances: '',
                strengths: '',
                weaknesses: ''
            },
            remove_type: {
                name: '',
                remove: function () {
                    $http.post(URLS.REMOVE_TYPE, {name: edit.remove_type.name})
                        .then(function (resp){
                            console.dir(resp.data); // debug - remove
                        }, function (err){
                            console.error(err);  // debug - remove TODO: Add modal error handling
                        })
                }
            },
            update_type: {
                update: function () {
                    let self = edit.update_type;
                    let formatted_type = {
                        name: self.name,
                        resistances: self.resistances.split(","),
                        strengths: self.strengths.split(","),
                        weaknesses: self.weaknesses.split(","),
                    };
                    
                    $http.post(URLS.UPDATE_TYPE, formatted_type)
                        .then(function (resp){
                            console.dir(resp.data); // debug - remove
                        }, function (err){
                            console.error(err);  // debug - remove TODO: Add modal error handling
                        })
                },
                name: '',
                resistances: '',
                strengths: '',
                weaknesses: ''
            }
        }

        /*
            Takes an array to be checked for duplicates.
            Returns duplicate free array.
         */
        function checkDuplicates (array) {
            // loops through array, outer
            for (var i = 0; i < array.length; i++) {
                // inner array loop, compares to each element in the outer loop
                for (var j = 0; j < array.length; j++) {
                    // prevents self comparison
                    if (i !== j) {
                        // check elements values
                        if(array[i] === array[j]) {
                            // delete found duplicate
                            array.splice(j,1);
                            // stop inner loop if match is found
                            break
                        }
                    }
                }
            }
            // return duplicate free array
            return array
        }

        /*
            Calculates weaknesses for selected pokemon types.
         */
        async function calculateWeakness(option) {
            console.dir(selectize_inputs); // debug - remove
            let weakness_search = '';
            if (selectize_inputs[1].selectize.items.length < 2) {
                weakness_search = selectize_inputs[1].selectize.options[Number(selectize_inputs[1].selectize.items[0])].type;
            } else {
                weakness_search = selectize_inputs[1].selectize.options[Number(selectize_inputs[1].selectize.items[0])].type;
                weakness_search += '|' + selectize_inputs[1].selectize.options[Number(selectize_inputs[1].selectize.items[1])].type
            }
            console.dir(weakness_search); // debug - remove
            await getWeakness('fake')
        }

        /*
            Filters out all the strengths.
            Uses a helper function to remove duplicates
         */
        function filterWeaknesses () {
           return weaknessFilterHelper(data.found_weaknesses);
        }
        
        /*
            Filters out the overlapping strengths and weaknesses.
            Eg Grass|Fire would return water in the weakness list, even though Grass resists.
            so that would be trimmed off
         */
        function filterStrengths(types) {
            for (let t of types) {
                if (!t.data.TYPE.includes("|")) break; // if it's only 1 type, it's already clean
                // separate types into array
                let split_types = t.data.TYPE.split("|");
                
                for (let st of split_types) {
                    let type_strengths = data.strengths[st];
                    for (let s of type_strengths) {
                        _.remove(t.data.WEAKNESS, (w) => {
                            return w == s;
                        })
                    }
                }
                
                console.dir(types); // debug - remove
                
            }
        }

        /*
            Returns array for found weaknesses.
            Takes found weaknesses as an array.
            Returns new array.
         */
        function weaknessFilterHelper (array) {
            // used to store the array items before duplicate checking
            var found_weaknesses = [];
            array.forEach(function (x) {
                x.WEAKNESS.forEach(function (y) {
                    found_weaknesses.push(y);
                });
            });
            return checkDuplicates(found_weaknesses)
        }

        let getWeakness = async function (weakness_search) {
            //if (data.weakness_search.TYPES.length)
            weakness_search = {TYPES:['Grass|Fire','Water']};
            $http.post('../pokemon-weakness', weakness_search)
                .then(function (resp){
                    data.found_weaknesses = resp.data;
                    filterStrengths(data.found_weaknesses);
                    console.dir(resp.data); // debug - remove
                }, function (err){
                    console.error(err);  // debug - remove TODO: Add modal error handling
                })
        };

        function getStrengths () {
            $http.get('../pokemon-strengths')
                .then(function (resp){
                    data.raw_strengths = resp.data;
                    data.strengths = {};
                    for (let s of data.raw_strengths) {
                        data.strengths[s.TYPE] = s.EFFECTIVE;
                    }
                    console.dir(data.raw_strengths); // debug - remove
                }, function (err){
                    console.error(err);
                })
        }

        function getTypes () {
            $http.get('../pokemon-types')
                .then(function (resp) {
                    let counter = 1;
                    resp.data.forEach(function (x) {
                        x.id = counter++;
                        //pokemon_one.types.push(x);
                        addTypeEverywhere(x);
                    });
                }, function (err) {
                    console.dir(err)
                });
        }
        /*
            Adds types to all 6 selectize boxes
         */
        function addTypeEverywhere (type) {
            pokemon_one.types.push(type);
            pokemon_two.types.push(type);
            pokemon_three.types.push(type);
            pokemon_four.types.push(type);
            pokemon_five.types.push(type);
            pokemon_six.types.push(type);
        }

        /*
            Function populates the array associated with the number passed in.
            The array_num param will be a number 1 - 6 reflecting the number of choices.
            Option will be the type chosen.
         */
        function populateTypeChoices(array_num, option) {
            // leave function if not between correct number range
           if (array_num < 1 || array_num > 6) {
               console.error(`The number must be between 1 - 6, received ${array_num}`);
               return;
           }
            if (!data.type_choices[array_num].length) data.type_choices[array_num] = [option[0].firstChild.data];
            else data.type_choices[array_num].push(option[0].firstChild.data);

        }

        /*
        *   Remove the passed in option from the array corresponding to the array_num.
         */
        function removeTypeChoices(array_num, option) {
            // leave function if not between correct number range
            if (array_num < 1 || array_num > 6) {
                console.error(`The number must be between 1 - 6, received ${array_num}`);
                return;
            }
            _.remove(data.type_choices[array_num], (type) => {
                return type === option[0].firstChild.data;
            })
        }

        /*
            Test function, used only to test.
         */
        function reveal () {
            console.dir(pokemon_one.types);
        }
        
        /*
            Adds the custom class to selected selectize options based on Pokemon type.
         */
        function styleSelectizeOptions(option) {
            option[0].classList.add(option[0].firstChild.data.toLowerCase());
        }

        // runs on controller load
        function init() {
            getStrengths();
            getTypes();
        }
        init();

        return {
            calculateWeakness,
            edit,
            getStrengths,
            getWeakness,
            pokemon_one,
            pokemon_two,
            pokemon_three,
            pokemon_four,
            pokemon_five,
            pokemon_six,
            reveal
        }
    }
    var app = angular.module('pageApp', ['selectize']);
    app.controller("pageCtrl", [
        '$scope' ,
        '$http',
        '$document',
        pageCtrl]);
})(window)