module objects
{
    export class Button extends GameObject
    {        
        // constructor
        constructor(imagePath:Object = config.Game.ASSETS.getResult("button"), x:number = 0, y:number= 0, isCentered:boolean = false, action:() => void = null)
        {
            super(imagePath, x, y, isCentered);

            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);

            if (action != null) this.on("click", action);

            this.Start();
        }
        
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        // PUBLIC METHODS
        MouseOver():void
        {
            this.alpha = 0.7;
        }

        MouseOut():void
        {
            this.alpha = 1.0;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.name = "Button";
        }

        public Update(): void {
            
        }

        public Reset(): void {
            
        }
    }
}