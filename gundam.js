/**
 * This is the object constructor for the gundams that 'fight' each other in the game process
 * @param {object} params This is an object that contains the parameters of the gundam; like the name, nation, and 'parts' added to the gundam.
 */
function Gundam(params){
    this.name = params.name;
    this.nation = params.nation;
    this.GD_ID = params.GD_ID;
    //parts are anything that adds stats to the gundam; also each part has its own health/durability; weapons are here as well
    //param.parts is an object that has already had parts seperated by type
    this.parts = params.parts;

    //----------------------------------------------------------------------------
    //Match Variables:
    //These are for each specific fight and are not at all static through a gundams life

    //an array of alliance ids that reference to a list of other gundams who are a part of the aliances.
    this.aliances = [];

    //this is the turns intiative roll; much in the similar vein of D&D highest goes first, lowest goes last.
    this.intiative = 0;

};
