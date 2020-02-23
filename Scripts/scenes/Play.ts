/**
 * @filename Play.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This scene handles the 2 dice version of the game.
 */

module scenes
{
    export class Play extends objects.Scene
    {
        private _diceManager: objects.DiceManager;
        private _rollButton: objects.Button;
        private _fourDSix: objects.Button;


        // PRIVATE INSTANCE MEMBERS
 

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            // link to the 4D6 mode
            this._fourDSix = new objects.Button(config.Game.ASSETS.getResult("4d6"), 320, 400, true);

            // create the dice manager with 2 dice
            this._diceManager = new objects.DiceManager(2);

            // allows me to use the "this" keyword in a different scope
            let parent = this;

            // add "Roll" button
            this._rollButton = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 320, 300, true, function(){
                // rolling of the dice starts when clicked
                parent._diceManager.Roll();
            });

            // add the "Update" ticker
            createjs.Ticker.on("tick", this.Update);

            this.Main();
        }        
        
        public Update(): void 
        {
            // update the dice manager
            this._diceManager.Update();
        }
        
        public Main(): void 
        {
            // background image
            this.addChild(new objects.Image(config.Game.ASSETS.getResult("background")))

            // add the click event to the 4d6 button
            this._fourDSix.on("click", ()=>{
                config.Game.SCENE = scenes.State.FOUR_D_SIX;
            });

            // add the buttons to the scene
            this._diceManager.init(this);
            this.addChild(this._rollButton);
            this.addChild(this._fourDSix);
        }        
    }
}