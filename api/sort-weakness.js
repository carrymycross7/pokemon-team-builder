const _ = require('lodash');
const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const resistances = JSON.parse(fs.readFileSync(path.join(appDir+'/pokemon/resistances.json')));
/*
    Takes types as an array
    Delimiter implies dual typing.
    Splits at delimiter, gets weakness for both types.
 */
function dualTypeHelper (types) {
    // the final dual type that will be returned
    let fixed_dual_type = {};
    let weaknesses = [];
    types.forEach((x) => {
        weaknesses = weaknesses.concat(x.WEAKNESS);
    });
    fixed_dual_type.TYPE = types[0].TYPE + '|' + types[1].TYPE;
    fixed_dual_type.WEAKNESS = _.sortedUniq(weaknesses);

    return fixed_dual_type;
}

/*
    Builds dual type weakness array.
    Takes weakness_list and type string.
 */
function dualTypeBuilder (weakness_list, type) {
    let dual_type = type.split('|');
    let matches = [];
    for (let i = 0; i < weakness_list.length; i++) {
        for (let j = 0; j < dual_type.length; j++) {
            if (weakness_list[i].TYPE === dual_type[j]) matches.push(weakness_list[i]);
        }
    }
    return dualTypeHelper(matches);
}
/*
    Capitalizes type(s).
    If dual typing, separates and returns string
 */
function capitalizeTypes (type) {
    // checks for delimiter
    if (type.includes('|')) {
        // array for new dual type
        let dual_type = [];
        // separates types
        let split_types = type.split('|');
        // capitalizes both types
        split_types.forEach((x) => {
            x = x.charAt(0).toUpperCase() + x.slice(1);
            dual_type.push(x);
        });
        return dual_type[0] + '|' + dual_type[1];
        // if no delimiter, capitalize first letter and return single type
    } else return type.charAt(0).toUpperCase() + type.slice(1);
}


/*
    Remove any resistances found the selected types list of weaknesses.
 */
async function filterResistances (types, weaknesses) {
    for (let w of weaknesses) {
  
    }
}
/*
    Takes weakness_list as the json,takes type as string.
    Returns array.
 */
function weaknessBuilder (weakness_list, type) {
    let match;
    // checks if double type
    if (!type.includes('|')) {
        weakness_list.forEach((x) => {
            if (x.TYPE === type) match = x;
        });
    } else {
        match = dualTypeBuilder(weakness_list, type);
    }
    return match;
}
/*
    Main export module for functions used when getting weakness states
 */
module.exports = {
    /*
        Takes the list of weaknesses as json, and types as an array.
        Loops through to find weaknesses where the types match.
     */
    find: async function (weakness_list, type) {
        try {
            // where the found weaknesses will be stored
            let weakness_match = [];
            // check if value is string
            if ((!type.length)) {
                throw new Error("TYPES must be an array");
            }
            // loop through array
            type.forEach((x) => {
                // capitalizes first letter in type
                x = capitalizeTypes(x);
                if (weaknessBuilder(weakness_list, x)) {
                    weakness_match.push({
                        data: weaknessBuilder(weakness_list, x)
                    })
                }
            });
            console.dir(weakness_match); // debug - remove
            
            weakness_match = await filterResistances(type, weakness_match);
            
            return weakness_match;
        } catch (err) {
            console.dir(err); // TODO: add better error messaging
        }
    }
}