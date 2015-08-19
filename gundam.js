/**
 * This is the object constructor for the gundams that 'fight' each other in the game process
 * @param {object} params This is an object that contains the parameters of the gundam; like the name, nation, and 'parts' added to the gundam.
 */
function Gundam(params){
    this.name = params.name;
    this.nation = params.nation;
    this.GD_ID = params.GD_ID;
    //parts are anything that adds stats to the gundam; also each part has its own health/durability; weapons are here as well
    //param.parts is an object that has already had parts seperated by type; an object, where each key is an array of parts.
    this.parts = params.parts;

    //----------------------------------------------------------------------------
    //Match Variables:
    //These are for each specific fight and are not at all static through a gundams life

    //an array of alliance ids that reference to a list of other gundams who are a part of the aliances.
    this.aliances = [];

    //this is the turns intiative roll; much in the similar vein of D&D highest goes first, lowest goes last.
    this.intiative = 0;

};

/**
 * This is the logic to determine which part the gundam should aim for on the other gundam
 * @param  {object} oppoParts an object of the parts that the opponent has
 * @param  {array} selfWeps  An array of the total weapons that the gundam has to attack with
 * @return {array}           An array of objects that have the part that the gundam targets along with the weapon used and modifiers
 */
Gundam.prototype.targetPart = function(oppoParts, self){
    //This is a hiarchy of values that is determined by the part being targeted.
    var priorities = oppoParts.map(function(part){
        var returnee = {
            name: part.name,
            type: part.type,
        };
        if(part.type == 'Legs'){
            returnee.value = part.agility;
            return returnee;
        } else if(part.type == 'Arm'){
            returnee.value = part.power + (self.parts.Legs.agility - part.weight);
            return returnee;
        } else if(part.type == 'Head'){
            var totalIntegrity = Object.keys(self.parts).filter(function(parts){ return ['Legs', 'Arms', 'Head'].indexOf(parts) === -1 }).map(function(parts){ return self.parts[parts] });
            totalIntegrity = totalIntegrity.reduce(function(agg, new){
                return agg + new.integrity.now;
            }, 0) / totalIntegrity.reduce(function(agg, new){ return agg + new.integrity.full}, 0);
            returnee.value = part.integrity.now/totalIntegrity;
            return returnee;
        }
    }).sort(function(a,b){ return b.value - a.value; });
};
